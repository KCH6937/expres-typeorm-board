import { Request, Response } from 'express';
import replyService from '@services/reply.service';

const createReply = async (req: Request, res: Response) => {
  const { comment_id } = req.params;
  const name = req.headers['name'];
  const { content } = req.body;

  const result = await replyService.createReply(
    +comment_id,
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

const deleteReply = async (req: Request, res: Response) => {
  const { reply_id } = req.params;
  const name = req.headers['name'];

  const result = await replyService.deleteReply(+reply_id, name as string);

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
  createReply,
  deleteReply,
};
