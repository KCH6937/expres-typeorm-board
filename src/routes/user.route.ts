import { Router } from 'express';
import userController from '@controllers/user.controller';

const router: Router = Router();

router.post('/signup', userController.signup); // 회원가입

export default router;
