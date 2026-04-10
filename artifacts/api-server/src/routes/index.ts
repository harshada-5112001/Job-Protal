import { Router, type IRouter } from "express";
import healthRouter from "./health";
import jobsRouter from "./jobs";
import applicationsRouter from "./applications";
import contactRouter from "./contact";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(jobsRouter);
router.use(applicationsRouter);
router.use(contactRouter);
router.use(adminRouter);

export default router;
