import { Prismaclient } from "prisma/client";
import { Router } from "express";
import { authMiddleware } from "../../../middleware/middleware";

const router: Router = Router();

router.post("/website", authMiddleware, async (req, res) => {
  if (!req.body.url) {
    res.status(403).json({
      message: "yOU HAVE NOT PROVIDED US WITH THE URL",
    });
    return;
  }
  const website = await Prismaclient.website.create({
    data: {
      url: req.body.url,
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
    id:website?.id,
    url:website?.url
  })
  return;
});
export const WebsiteRouter = router;
