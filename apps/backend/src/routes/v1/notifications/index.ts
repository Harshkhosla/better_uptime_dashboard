import { Prismaclient } from "prisma/client";
import { Router } from "express";
import { authMiddleware } from "../../../middleware/middleware";

const router: Router = Router();

// Get all notifications for a user
router.get("/", authMiddleware, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req?.UserID;

    // Get all websites for the user with their recent status changes
    const websites = await Prismaclient.website.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        websiteStatus: {
          where: {
            statusCheck: "DOWN",
          },
          orderBy: {
            timestamp: "desc",
          },
          take: 10,
        },
      },
    });

    // Create notifications from down statuses
    const notifications = websites.flatMap((website) =>
      website.websiteStatus.map((status) => ({
        id: status.id,
        websiteId: website.id,
        websiteUrl: website.url,
        type: "DOWN",
        message: `${website.url} is down`,
        timestamp: status.timestamp,
        read: false,
      }))
    );

    // Sort by most recent
    notifications.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    res.status(200).json({
      notifications,
      unreadCount: notifications.length,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({
      message: "Failed to fetch notifications",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Get notification count
router.get("/count", authMiddleware, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req?.UserID;

    const downCount = await Prismaclient.websiteStatus.count({
      where: {
        statusCheck: "DOWN",
        website: {
          ownerId: userId,
        },
        timestamp: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
        },
      },
    });

    res.status(200).json({
      count: downCount,
    });
  } catch (error) {
    console.error("Error fetching notification count:", error);
    res.status(500).json({
      message: "Failed to fetch notification count",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export const NotificationsRouter = router;
