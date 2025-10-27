import { Router } from "express";
import { UserRouter } from "./users";
import { WebsiteRouter } from "./website";
import { LlmRouter } from "./llm_response";
import { WeightRouter } from "./weight";

const router: Router = Router();

router.use("/users", UserRouter);
router.use("/website", WebsiteRouter);
router.use("/llm", LlmRouter);
router.use("/weight", WeightRouter);

export default router;
