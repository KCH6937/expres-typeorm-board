import { Router } from 'express';
import userController from '@controllers/user.controller';
import { validatorMiddleware } from '@middlewares/validation.middleware';
import { CreateUserDto } from 'src/dtos/user.dto';

const router: Router = Router();

router.post(
  '/signup',
  validatorMiddleware(CreateUserDto),
  userController.signup
); // 회원가입

export default router;
