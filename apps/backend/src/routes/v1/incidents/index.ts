import { Router, Request, Response } from "express";
import { Prismaclient } from "prisma/client";
import { authenticateJWT } from "../../../middleware/middleware";

const router: Router = Router();

// Get incidents for a user or specific website
router.get("/", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const { websiteId } = req.query;
    //@ts-ignore
    const userId = req.user.id;

    // Build the query
    let whereClause: any = {};
    
    if (websiteId) {
      // Get incidents for a specific website (verify ownership)
      const website = await Prismaclient.website.findFirst({
        where: {
          id: websiteId as string,
          ownerId: userId,
        },
      });

      if (!website) {
        return res.status(404).json({ message: "Website not found" });
      }

      whereClause = { websiteId: websiteId as string };
    } else {
      // Get all incidents for user's websites
      const userWebsites = await Prismaclient.website.findMany({
        where: { ownerId: userId },
        select: { id: true },
      });

      const websiteIds = userWebsites.map(w => w.id);
      whereClause = { websiteId: { in: websiteIds } };
    }

    // Fetch incidents with analysis and timeline
    const incidents = await Prismaclient.incident.findMany({
      where: whereClause,
      include: {
        website: {
          select: {
            id: true,
            url: true,
          },
        },
        analysis: true,
        timeline: {
          orderBy: {
            timestamp: 'asc',
          },
        },
      },
      orderBy: {
        startedAt: 'desc',
      },
      take: 50, // Limit to last 50 incidents
    });

    res.json({ incidents });
  } catch (error) {
    console.error("Error fetching incidents:", error);
    res.status(500).json({ message: "Failed to fetch incidents" });
  }
});

// Get specific incident details
router.get("/:incidentId", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const { incidentId } = req.params;
    //@ts-ignore
    const userId = req.user.id;

    const incident = await Prismaclient.incident.findFirst({
      where: {
        id: incidentId,
        website: {
          ownerId: userId,
        },
      },
      include: {
        website: {
          select: {
            id: true,
            url: true,
          },
        },
        analysis: true,
        timeline: {
          orderBy: {
            timestamp: 'asc',
          },
        },
      },
    });

    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    res.json({ incident });
  } catch (error) {
    console.error("Error fetching incident:", error);
    res.status(500).json({ message: "Failed to fetch incident" });
  }
});

// Get incident statistics
router.get("/stats/:websiteId", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const { websiteId } = req.params;
    //@ts-ignore
    const userId = req.user.id;

    // Verify ownership
    const website = await Prismaclient.website.findFirst({
      where: {
        id: websiteId,
        ownerId: userId,
      },
    });

    if (!website) {
      return res.status(404).json({ message: "Website not found" });
    }

    // Get incident statistics
    const totalIncidents = await Prismaclient.incident.count({
      where: { websiteId },
    });

    const activeIncidents = await Prismaclient.incident.count({
      where: {
        websiteId,
        status: "ACTIVE",
      },
    });

    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const recentIncidents = await Prismaclient.incident.count({
      where: {
        websiteId,
        startedAt: {
          gte: last30Days,
        },
      },
    });

    // Calculate average resolution time
    const resolvedIncidents = await Prismaclient.incident.findMany({
      where: {
        websiteId,
        status: "RESOLVED",
        duration: { not: null },
      },
      select: {
        duration: true,
      },
    });

    const avgResolutionTime = resolvedIncidents.length > 0
      ? resolvedIncidents.reduce((sum, inc) => sum + (inc.duration || 0), 0) / resolvedIncidents.length
      : 0;

    // Get severity breakdown
    const severityBreakdown = await Prismaclient.incident.groupBy({
      by: ['severity'],
      where: { websiteId },
      _count: true,
    });

    res.json({
      stats: {
        totalIncidents,
        activeIncidents,
        recentIncidents,
        avgResolutionTime: Math.round(avgResolutionTime),
        severityBreakdown: severityBreakdown.reduce((acc, item) => {
          acc[item.severity] = item._count;
          return acc;
        }, {} as Record<string, number>),
      },
    });
  } catch (error) {
    console.error("Error fetching incident stats:", error);
    res.status(500).json({ message: "Failed to fetch incident statistics" });
  }
});

// Add manual note to incident timeline
router.post("/:incidentId/note", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const { incidentId } = req.params;
    const { note } = req.body;
    //@ts-ignore
    const userId = req.user.id;

    if (!note) {
      return res.status(400).json({ message: "Note is required" });
    }

    // Verify ownership
    const incident = await Prismaclient.incident.findFirst({
      where: {
        id: incidentId,
        website: {
          ownerId: userId,
        },
      },
    });

    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    // Add note to timeline
    const timelineEntry = await Prismaclient.incidentTimeline.create({
      data: {
        incidentId,
        eventType: "USER_NOTE",
        description: note,
        metadata: { userId },
      },
    });

    res.json({ message: "Note added", timelineEntry });
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({ message: "Failed to add note" });
  }
});

// Update incident status
router.put("/:incidentId/status", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const { incidentId } = req.params;
    const { status } = req.body;
    //@ts-ignore
    const userId = req.user.id;

    const validStatuses = ["ACTIVE", "RESOLVED", "MONITORING", "CLOSED"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Verify ownership
    const incident = await Prismaclient.incident.findFirst({
      where: {
        id: incidentId,
        website: {
          ownerId: userId,
        },
      },
    });

    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    // Update incident
    const updatedIncident = await Prismaclient.incident.update({
      where: { id: incidentId },
      data: {
        status,
        resolvedAt: status === "RESOLVED" && !incident.resolvedAt ? new Date() : incident.resolvedAt,
        duration: status === "RESOLVED" && !incident.duration 
          ? Math.floor((Date.now() - incident.startedAt.getTime()) / 1000)
          : incident.duration,
      },
    });

    // Add timeline entry
    await Prismaclient.incidentTimeline.create({
      data: {
        incidentId,
        eventType: status === "RESOLVED" ? "RESOLVED" : "USER_NOTE",
        description: `Status changed to ${status}`,
        metadata: { userId, previousStatus: incident.status },
      },
    });

    res.json({ message: "Status updated", incident: updatedIncident });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
});

export default router;