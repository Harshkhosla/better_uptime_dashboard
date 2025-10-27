import { Prismaclient } from "prisma/client";
import { Router } from "express";
import { authMiddleware } from "../../../middleware/middleware";

const router: Router = Router();

router.post("/getllm", authMiddleware, async (req, res) => {
  if (!req.body) {
    res.status(403).json({
      message: "YOU HAVE NOT PROVIDED US WITH THE DATA",
    });
    return;
  }

  res.status(200).json({});
  return;
});

export const LlmRouter = router;
