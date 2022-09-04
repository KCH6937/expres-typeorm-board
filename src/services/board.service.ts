import status from '@modules/status.module';
import message from '@modules/message.module';
import { success, fail } from '@modules/response.module';
import AppDataSource from '@configs/data-source.config';
import { Board } from '@entities/board.entity';
import { User } from '@entities/user.entity';
import userService from '@services/user.service';
import { Comment } from '@entities/comment.entity';
import { Reply } from '@entities/reply.entity';
import CommentList from '@interfaces/commentDetail.interface';
import BoardDetail from '@interfaces/boardDetail.inteface';

const createBoard = async (
  title: string,
  content: string,
  userName: string
) => {
  try {
    const user: User | null = await userService.getUserByName(userName);

    if (!user) {
      return fail(status.BAD_REQUEST, message.INVALID_USER_INFO);
    }

    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Board)
      .values([{ title, content, user, is_updated: false }])
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

const getBoardList = async () => {
  try {
    const boards: Board[] | [] = await Board.createQueryBuilder()
      .select(['Board.id', 'Board.title', 'Board.content', 'Board.created_at'])
      .orderBy('created_at', 'ASC')
      .getMany();

    return success(status.OK, message.SUCCESS, boards);
  } catch (error: any) {
    return fail(
      status.INTERAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR,
      error
    );
  }
};

const searchBoard = async (keyword: string) => {
  try {
    keyword = '%' + keyword + '%';
    console.log(keyword);
    const boards: Board[] | [] = await Board.createQueryBuilder()
      .select(['Board.id', 'Board.title', 'Board.content', 'Board.created_at'])
      .where('title like :keyword OR content like :keyword', { keyword })
      .orderBy('created_at', 'ASC')
      .getMany();

    return success(status.OK, message.SUCCESS, boards);
  } catch (error: any) {
    return fail(
      status.INTERAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR,
      error
    );
  }
};

const getBoardDetail = async (boardId: number) => {
  try {
    const boardDetail: BoardDetail | null = await Board.createQueryBuilder()
      .select()
      .where('id = :boardId', { boardId })
      .getOne();

    if (!boardDetail) {
      return fail(status.BAD_REQUEST, message.INVALID_BOARD_INFO);
    }

    const comments: CommentList[] | [] = await Comment.createQueryBuilder()
      .select(['Comment.id', 'Comment.content', 'Comment.created_at'])
      .where('board_id = :boardId', { boardId })
      .orderBy('created_at', 'ASC')
      .getMany();

    const commentIds = comments.map((item) => item.id);
    console.log('adasdasdasdasdsad', commentIds);
    if (commentIds.length > 0) {
      const replies: Reply[] | [] = await Reply.createQueryBuilder()
        .select()
        .where('comment_id IN (:...commentIds)', { commentIds })
        .orderBy('created_at', 'ASC')
        .getMany();

      if (replies) {
        for (let i = 0; i < comments.length; i++) {
          comments[i].replies = replies.filter(
            (item) => item.commentId === comments[i].id
          );
        }
      }
    }

    boardDetail.comment_list = comments;

    return success(status.OK, message.SUCCESS, boardDetail);
  } catch (error: any) {
    return fail(
      status.INTERAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR,
      error
    );
  }
};

const updateBoard = async (
  boardId: number,
  title: string,
  content: string,
  userName: string
) => {
  try {
    const user: User | null = await userService.getUserByName(userName);

    if (!user) {
      return fail(status.BAD_REQUEST, message.INVALID_USER_INFO);
    }

    const board: Board | null = await Board.createQueryBuilder()
      .select()
      .where('id = :boardId AND user_id = :userId', {
        boardId,
        userId: user.id,
      })
      .getOne();

    if (!board) {
      return fail(status.BAD_REQUEST, message.INVALID_USER_OR_BOARD_INFO);
    }

    await AppDataSource.createQueryBuilder()
      .update(Board)
      .set({ title, content, is_updated: true })
      .where('id = :boardId', { boardId })
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

const deleteBoard = async (boardId: string, userName: string) => {
  try {
    const user: User | null = await userService.getUserByName(userName);

    if (!user) {
      return fail(status.BAD_REQUEST, message.INVALID_USER_INFO);
    }

    const board: Board | null = await Board.createQueryBuilder()
      .select()
      .where('id = :boardId AND user_id = :userId', {
        boardId,
        userId: user.id,
      })
      .getOne();

    if (!board) {
      return fail(status.BAD_REQUEST, message.INVALID_USER_OR_BOARD_INFO);
    }

    await AppDataSource.createQueryBuilder()
      .delete()
      .from(Board)
      .where('id = :boardId', { boardId })
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
  createBoard,
  getBoardList,
  searchBoard,
  getBoardDetail,
  updateBoard,
  deleteBoard,
};
