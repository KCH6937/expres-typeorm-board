import { Router } from 'express';
import userRouter from '@routes/user.route';
import boardRouter from '@routes/board.route';

const router: Router = Router();

router.use('/user', userRouter);
router.use('/board', boardRouter);

export default router;
