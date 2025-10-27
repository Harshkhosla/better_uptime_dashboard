import { Router } from "express";
import { UserRouter } from "./users";
import { WebsiteRouter } from "./website";
import { LlmRouter } from "./llm_response";

const router: Router = Router();

router.use("/users", UserRouter);
router.use("/website", WebsiteRouter);
router.use("/llm", LlmRouter);

export default router;
