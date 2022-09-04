import { Request, Response } from 'express';
import userService from '@services/user.service';

const signup = async (req: Request, res: Response) => {
  const { name } = req.body;

  const result = await userService.signup(name);

  if (result.status === 201) {
    return res.status(result.status).send(result);
  } else {
    console.error(result);
    return res
      .status(result.status)
      .send({ status: result.status, message: result.message });
  }
};

export default {
  signup,
};
