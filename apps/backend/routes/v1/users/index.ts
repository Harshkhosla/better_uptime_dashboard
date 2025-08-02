import { Router } from "express";
import { CreatUserSchema } from "common/zod";
import { Prismaclient } from "prisma/client";
const router: Router = Router();

router.post("/user/create", async (req, res) => {
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
});

router.post("/user/login", async (req, res) => {
  CreatUserSchema;
});

export const UserRouter = router;
