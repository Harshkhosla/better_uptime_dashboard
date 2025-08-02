import { Router } from "express";
import { CreatUserSchema, LoginUserSchema } from "common/zod";
import { Prismaclient } from "prisma/client";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

const router: Router = Router();
const JWT_SECRET = "HAesh123";

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
        name: safeparsedData.data.username,
      },
    });
    res.send({
      message: "User Created for you specally happy to have you!",
      user: { id: UserCreatedata.id, email: UserCreatedata.email },
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

export const UserRouter = router;
