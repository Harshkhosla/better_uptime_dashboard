import { Prismaclient } from "prisma/client";
import { Router } from "express";
import { authMiddleware } from "../../../middleware/middleware";

const router: Router = Router();
router.post("/updateUserDetails", authMiddleware, async (req, res) => {
  if (!req.body) {
    res.status(403).json({
      message: "YOU HAVE NOT PROVIDED US WITH THE DATA",
    });
    return;
  }

  const { weight, bmi, height, preferences, age } = req.body;

  try {
    // @ts-ignore
    const userId = req?.UserID;

    const userDetailsUpdating = await Prismaclient.userDetails.upsert({
      where: {
        ownerId: userId,
      },
      update: {
        weight: weight,
        bmi: bmi,
        height: height,
        preferences: preferences,
        age: age,
      },
      create: {
        weight: weight,
        bmi: bmi,
        height: height,
        preferences: preferences,
        age: age,
        ownerId: userId,
      },
    });

    // Update user's userDetailsFilled flag
    await Prismaclient.user.update({
      where: {
        id: userId,
      },
      data: {
        userDetailsFilled: true,
      },
    });

    res.status(200).json({
      message: userDetailsUpdating,
    });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({
      message: "Failed to update user details",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});
router.get("/userDetails", authMiddleware, async (req, res) => {
  const userDetails = await Prismaclient.user.findFirst({
    where: {
      // @ts-ignore
      id: req?.UserID,
    },
    include: {
      userDetails: true,
    },
  });
  res.status(200).json({
    message: userDetails,
  });
});
router.post("/website", authMiddleware, async (req, res) => {
  if (!req.body) {
    res.status(403).json({
      message: "yOU HAVE NOT PROVIDED US WITH THE URL",
    });
    return;
  }
  const { url, alertType, escalationPolicy, notify } = req.body.formData;
  const notificationPref = await Prismaclient.notificationPreference.create({
    data: {
      notifyCall: notify.call,
      notifySMS: notify.sms,
      notifyEmail: notify.email,
      notifyPush: notify.push,
    },
  });
  const website = await Prismaclient.website.create({
    data: {
      url: url,
      alert: alertType,
      escalationPolicy: escalationPolicy,
      notificationPrefId: notificationPref.id,
      // @ts-ignore
      ownerId: req?.UserID,
      timeAdded: new Date(),
    },
  });

  res.status(200).json({
    id: website.id,
  });
  return;
});

router.get("/website/all", authMiddleware, async (req, res) => {
  const websites = await Prismaclient.user.findMany({
    where: {
      // @ts-ignore
      id: req?.UserID,
    },
    include: {
      websites: true,
    },
  });
  res.status(200).json({
    websites: websites,
  });
  return;
});

router.get("/status", authMiddleware, async (req, res) => {
  const websiteIdParam = req.query.websiteId;

  // Check if it's a string
  if (!websiteIdParam || typeof websiteIdParam !== "string") {
    return res.status(400).json({
      message: "You have not provided a valid websiteId.",
    });
  }
  const website = await Prismaclient.website.findFirst({
    where: {
      // @ts-ignore
      ownerId: req.UserID,
      id: websiteIdParam,
    },
    include: {
      websiteStatus: true,
      notificationPref: true,
    },
    orderBy: {
      timeAdded: "desc",
    },
  });
  if (!website) {
    res.status(404).json({
      message: "Not Found",
    });
  }

  res.status(200).json(website);
  return;
});
export const WebsiteRouter = router;
