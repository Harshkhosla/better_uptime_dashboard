import { Router } from "express";
import { UserRouter } from "./users";
import { WebsiteRouter } from "./website";
import { LlmRouter } from "./llm_response";
import { WeightRouter } from "./weight";
import { NotificationsRouter } from "./notifications";
import incidentsRouter from "./incidents";

const router: Router = Router();

router.use("/users", UserRouter);
router.use("/website", WebsiteRouter);
router.use("/llm", LlmRouter);
router.use("/weight", WeightRouter);
router.use("/notifications", NotificationsRouter);
router.use("/incidents", incidentsRouter);

export default router;
