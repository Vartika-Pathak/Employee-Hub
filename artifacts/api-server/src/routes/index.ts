import { Router, type IRouter } from "express";
import healthRouter from "./health";
import peopleOpsRouter from "./people-ops";

const router: IRouter = Router();

router.use(healthRouter);
router.use(peopleOpsRouter);

export default router;
