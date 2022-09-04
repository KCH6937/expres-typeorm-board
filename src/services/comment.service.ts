import status from '@modules/status.module';
import message from '@modules/message.module';
import { success, fail } from '@modules/response.module';
import AppDataSource from '@configs/dataSource';
import { User } from '@entities/user.entity';
import { Board } from '@entities/board.entity';
import { Comment } from '@entities/comment.entity';
import boardService from './board.service';
import userService from '@services/user.service';

const createComment = async (
  boardId: number,
  content: string,
  userName: string
) => {
  try {
    const user: User | null = await userService.getUserByName(userName);

    if (!user) {
      return fail(status.BAD_REQUEST, message.INVALID_USER_INFO);
    }

    const result: Success | Fail = await boardService.getBoardDetail(boardId);

    let board: Board;
    if (result.status !== 200) {
      return result;
    } else {
      board = result.data;
    }

    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Comment)
      .values([{ content, user, board }])
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

const deleteComment = async (commentId: number, userName: string) => {
  try {
    const user: User | null = await userService.getUserByName(userName);

    if (!user) {
      return fail(status.BAD_REQUEST, message.INVALID_USER_INFO);
    }

    await AppDataSource.createQueryBuilder()
      .delete()
      .from(Comment)
      .where('id = :commentId AND user_id = :userId', {
        commentId,
        userId: user.id,
      })
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
  createComment,
  deleteComment,
};
