import { Prismaclient } from "prisma/client";
import { Router } from "express";
import { authMiddleware } from "../../../middleware/middleware";

const router: Router = Router();

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

router.get("/status/:websiteId", authMiddleware, async (req, res) => {
  if (!req.params.websiteId) {
    res.status(403).json({
      message: "yOU HAVE NOT PROVIDED US WITH THE URL",
    });
    return;
  }
  const website = await Prismaclient.website.findFirst({
    where: {
      // @ts-ignore
      ownerId: req.UserID,
      id: req.params.websiteId,
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

  res.status(200).json({
    id: website?.id,
    url: website?.url,
  });
  return;
});
export const WebsiteRouter = router;
