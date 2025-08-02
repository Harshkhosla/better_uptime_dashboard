import { Router } from "express";
import { UserRouter } from './users'
import { WebsiteRouter } from "./website";

const router: Router = Router();

router.use('/users',UserRouter)
router.use('/website',WebsiteRouter)


export default router;