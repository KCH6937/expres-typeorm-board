import status from '@modules/status.module';
import message from '@modules/message.module';
import { success, fail } from '@modules/response.module';
import AppDataSource from '@configs/data-source.config';
import { User } from '@entities/user.entity';
import { Comment } from '@entities/comment.entity';
import userService from '@services/user.service';
import { Reply } from '@entities/reply.entity';

const createReply = async (
  commentId: number,
  content: string,
  userName: string
) => {
  try {
    const user: User | null = await userService.getUserByName(userName);

    if (!user) {
      return fail(status.BAD_REQUEST, message.INVALID_USER_INFO);
    }

    const comment: Comment | null = await Comment.createQueryBuilder()
      .select()
      .where({ id: commentId })
      .getOne();

    if (!comment) {
      return fail(status.BAD_REQUEST, message.INVALID_COMMENT_INFO);
    }

    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Reply)
      .values([{ content, user, comment }])
      .execute();

    return success(status.CREATED, message.CREATED);
  } catch (error: any) {
    return fail(
      status.INTERAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR,
      error
    );
  }
};

const deleteReply = async (replyId: number, userName: string) => {
  try {
    const user: User | null = await userService.getUserByName(userName);

    if (!user) {
      return fail(status.BAD_REQUEST, message.INVALID_USER_INFO);
    }

    const comment = await Reply.createQueryBuilder()
      .select()
      .where('id = :replyId', { replyId })
      .getOne();

    if (!comment) {
      return fail(status.BAD_REQUEST, message.INVALID_REPLY_INFO);
    }

    await AppDataSource.createQueryBuilder()
      .delete()
      .from(Reply)
      .where('id = :replyId', { replyId })
      .execute();

    return success(status.OK, message.SUCCESS);
  } catch (error: any) {
    return fail(
      status.INTERAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR,
      error
    );
  }
};

export default {
  createReply,
  deleteReply,
};
