import nodemailer from "nodemailer";

async function testEmail() {
  console.log("🧪 Testing email configuration...\n");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "Harshkhosla9945@gmail.com",
      pass: "iqby twxq smrt jxtp",
    },
  });

  const mailOptions = {
    from: `"Uptime Monitor Test" <Harshkhosla9945@gmail.com>`,
    to: "Harshkhosla9945@gmail.com", // Send to yourself for testing
    subject: "🧪 Test Email from Better Uptime Dashboard",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .success { background-color: #10b981; color: white; padding: 20px; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="success">
            <h2>✅ Email Configuration Working!</h2>
            <p>Your Better Uptime Dashboard can successfully send emails.</p>
            <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
    console.log("📧 Message ID:", info.messageId);
    console.log("📬 Response:", info.response);
    console.log("\n✨ Check your email inbox (and spam folder)!");
  } catch (error) {
    console.error("❌ Failed to send email:");
    console.error(error);
  }
}

testEmail();
