import { Request, Response } from 'express';
import commentService from '@services/comment.service';

const createComment = async (req: Request, res: Response) => {
  const { board_id } = req.params;
  const name = req.headers['name'];
  const { content } = req.body;

  const result = await commentService.createComment(
    +board_id,
    content,
    name as string
  );

  if (result.status === 201) {
    return res.status(result.status).send(result);
  } else {
    console.error(result);
    return res
      .status(result.status)
      .send({ status: result.status, message: result.message });
  }
};

const deleteComment = async (req: Request, res: Response) => {
  const { comment_id } = req.params;
  const name = req.headers['name'];

  const result = await commentService.deleteComment(
    +comment_id,
    name as string
  );

  if (result.status === 200) {
    return res.status(result.status).send(result);
  } else {
    console.error(result);
    return res
      .status(result.status)
      .send({ status: result.status, message: result.message });
  }
};

export default {
  createComment,
  deleteComment,
};
