import { Router } from "express";
import { CreatUserSchema, LoginUserSchema } from "common/zod";
import { Prismaclient } from "prisma/client";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { authenticateJWT } from "../../../middleware/middleware";

const router: Router = Router();
const JWT_SECRET = "HAesh123";

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "Harshkhosla9945@gmail.com",
    pass: "iqby twxq smrt jxtp",
  },
});

router.post("/create", async (req, res) => {
  try {
    const userdata = req.body;
    const safeparsedData = CreatUserSchema.safeParse(userdata);

    if (!safeparsedData.success) {
      res.status(411).json({
        message: safeparsedData.error,
      });
      return;
    }
    const ExistsUser = await Prismaclient.user.findFirst({
      where: {
        email: userdata.email,
      },
    });
    if (ExistsUser) {
      res.status(403).json({
        message: "User already Exista",
      });
    }

    const Salt = 10;
    const hashPassoword = await bcrypt.hash(safeparsedData.data.password, Salt);

    const UserCreatedata = await Prismaclient.user.create({
      data: {
        email: safeparsedData.data.email,
        password: hashPassoword,
        createdAt: new Date(Date.now()),
      },
    });

    const token = jwt.sign({ id: UserCreatedata.id }, JWT_SECRET);

    res.send({
      message: "User Created for you specally happy to have you!",
      user: { id: UserCreatedata.id, email: UserCreatedata.email, token },
    });
  } catch (e) {
    res.status(500).json({
      message: "Someting uneven occured sorry for that",
    });
  }
});

router.post("/login", async (req, res) => {
  const userlogindata = req.body;
  const parsedloginUserData = LoginUserSchema.safeParse(userlogindata);
  if (!parsedloginUserData.success) {
    res.status(411).json({
      message: parsedloginUserData.error,
    });
    return;
  }
  const UserExist = await Prismaclient.user.findFirst({
    where: {
      email: parsedloginUserData.data.email,
    },
  });
  if (!UserExist) {
    res.status(400).json({
      message: "User Dose not Exists",
    });
    return;
  }
  const correctpassword = await bcrypt.compare(
    parsedloginUserData.data.password,
    UserExist.password,
  );
  if (!correctpassword) {
    res.status(411).json({
      message: "Password In-correct",
    });
    return;
  }

  const token = jwt.sign({ id: UserExist.id }, JWT_SECRET);

  res.status(200).json({
    message: "You have sucessuflly login In",
    token,
  });
  return;
});

// Get all users endpoint
router.get("/all", async (req, res) => {
  try {
    const users = await Prismaclient.user.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      users,
      count: users.length,
    });
  } catch (e) {
    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
});

// Get current user details
router.get("/me", authenticateJWT, async (req: any, res) => {
  try {
    const user = await Prismaclient.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        name: true,
        webhookUrl: true,
        createdAt: true,
        updatedAt: true,
        userDetailsFilled: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ user });
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch user details" });
  }
});

// Update user details endpoint
router.put("/update", authenticateJWT, async (req: any, res) => {
  try {
    const { name, email, webhookUrl } = req.body;
    const userId = req.userId;

    // Check if email is being changed and if it's already taken
    if (email) {
      const existingUser = await Prismaclient.user.findFirst({
        where: {
          email: email,
          id: { not: userId },
        },
      });

      if (existingUser) {
        res.status(400).json({ message: "Email already in use" });
        return;
      }
    }

    const updatedUser = await Prismaclient.user.update({
      where: { id: userId },
      data: {
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email }),
        ...(webhookUrl !== undefined && { webhookUrl }),
        updatedAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        name: true,
        webhookUrl: true,
      },
    });

    res.status(200).json({
      message: "User details updated successfully",
      user: updatedUser,
    });
  } catch (e) {
    console.error("Update user error:", e);
    res.status(500).json({ message: "Failed to update user details" });
  }
});

// Change password endpoint
router.put("/change-password", authenticateJWT, async (req: any, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.userId;

    if (!currentPassword || !newPassword) {
      res.status(400).json({ message: "Both current and new passwords are required" });
      return;
    }

    const user = await Prismaclient.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      res.status(400).json({ message: "Current password is incorrect" });
      return;
    }

    // Hash new password
    const Salt = 10;
    const hashedPassword = await bcrypt.hash(newPassword, Salt);

    // Update password
    await Prismaclient.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (e) {
    console.error("Change password error:", e);
    res.status(500).json({ message: "Failed to change password" });
  }
});

// Forgot password endpoint - sends reset link
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    const user = await Prismaclient.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if user exists or not for security
      res.status(200).json({ message: "If the email exists, a reset link has been sent" });
      return;
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date();
    resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1); // Token expires in 1 hour

    // Save token to database
    await Prismaclient.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    // Send email with reset link
    const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: '"Better Uptime Dashboard" <Harshkhosla9945@gmail.com>',
      to: email,
      subject: "Password Reset Request",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #000; color: white; padding: 20px; border-radius: 5px; }
              .content { background-color: #f9fafb; padding: 20px; margin-top: 20px; border-radius: 5px; }
              .button { 
                display: inline-block; 
                padding: 12px 24px; 
                background-color: #000; 
                color: white; 
                text-decoration: none; 
                border-radius: 5px; 
                margin: 20px 0;
              }
              .footer { margin-top: 20px; font-size: 12px; color: #6b7280; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Password Reset Request</h2>
              </div>
              <div class="content">
                <p>Hello${user.name ? ` ${user.name}` : ""},</p>
                <p>You have requested to reset your password. Click the button below to reset it:</p>
                <a href="${resetUrl}" class="button">Reset Password</a>
                <p>Or copy and paste this link in your browser:</p>
                <p style="word-break: break-all; color: #2563eb;">${resetUrl}</p>
                <p><strong>This link will expire in 1 hour.</strong></p>
                <p>If you didn't request this, please ignore this email.</p>
              </div>
              <div class="footer">
                <p>This is an automated message from Better Uptime Dashboard.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Password reset email sent to ${email}`);

    res.status(200).json({ message: "If the email exists, a reset link has been sent" });
  } catch (e) {
    console.error("Forgot password error:", e);
    res.status(500).json({ message: "Failed to process password reset request" });
  }
});

// Reset password endpoint - updates password with token
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      res.status(400).json({ message: "Token and new password are required" });
      return;
    }

    // Find user with valid token
    const user = await Prismaclient.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(), // Token should not be expired
        },
      },
    });

    if (!user) {
      res.status(400).json({ message: "Invalid or expired reset token" });
      return;
    }

    // Hash new password
    const Salt = 10;
    const hashedPassword = await bcrypt.hash(newPassword, Salt);

    // Update password and clear reset token
    await Prismaclient.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    res.status(200).json({ message: "Password reset successfully" });
  } catch (e) {
    console.error("Reset password error:", e);
    res.status(500).json({ message: "Failed to reset password" });
  }
});

export const UserRouter = router;
