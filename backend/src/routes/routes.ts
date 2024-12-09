import { Router } from 'express';
import { AuthRouter } from './authRoutes';

const router: Router = Router();

router.use('/auth', AuthRouter);

export const MainRouter: Router = router;
