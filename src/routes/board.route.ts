import { Router } from 'express';
import boardController from '@controllers/board.controller';
import commentController from '@controllers/comment.controller';
import replyController from '@controllers/reply.controller';

const router: Router = Router();

// 게시글 API
router.post('/', boardController.createBoard); // 게시글 생성
router.get('/', boardController.getBoard); // 게시글 목록 조회 및 검색
router.get('/:board_id', boardController.getBoard); // 게시글 상세 페이지
router.patch('/:board_id', boardController.updateBoard); // 게시글 수정
router.delete('/:board_id', boardController.deleteBoard); // 게시글 삭제

// 댓글 API
router.post('/comment/:board_id', commentController.createComment); // 댓글 등록
router.delete('/comment/:comment_id', commentController.deleteComment); // 댓글 삭제

// 대댓글 API
router.post('/comment/reply/:comment_id', replyController.createReply); // 대댓글 등록
router.delete('/comment/reply/:reply_id', replyController.deleteReply); // 대댓글 삭제

export default router;
