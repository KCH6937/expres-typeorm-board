import { Router } from 'express';
import boardController from '@controllers/board.controller';
import commentController from '@controllers/comment.controller';
import replyController from '@controllers/reply.controller';
import { validatorMiddleware } from '@middlewares/validation.middleware';
import { CreateBoardDto, UpdateBoardDto } from 'src/dtos/board.dto';
import { CreateCommentDto } from 'src/dtos/comment.dto';
import { CreateReplyDto } from 'src/dtos/reply.dto';

const router: Router = Router();

/* 게시글 API */
// 게시글 생성
router.post(
  '/',
  validatorMiddleware(CreateBoardDto),
  boardController.createBoard
);

// 게시글 목록 조회 및 검색
router.get('/', boardController.getBoard);

// 게시글 상세 페이지
router.get('/:board_id', boardController.getBoard);

// 게시글 수정
router.patch(
  '/:board_id',
  validatorMiddleware(UpdateBoardDto),
  boardController.updateBoard
);

// 게시글 삭제
router.delete('/:board_id', boardController.deleteBoard);

/* 댓글 API */

// 댓글 등록
router.post(
  '/comment/:board_id',
  validatorMiddleware(CreateCommentDto),
  commentController.createComment
);

// 댓글 삭제
router.delete('/comment/:comment_id', commentController.deleteComment);

/* 대댓글 API */
router.post(
  '/comment/reply/:comment_id',
  validatorMiddleware(CreateReplyDto),
  replyController.createReply
); // 대댓글 등록
router.delete('/comment/reply/:reply_id', replyController.deleteReply); // 대댓글 삭제

export default router;
