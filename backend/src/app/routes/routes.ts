import { Router } from "express";
import { AuthRouter } from "./auth/authRoutes";

const router: Router = Router();

router.use("/auth", AuthRouter);

export const MainRouter: Router = router;
