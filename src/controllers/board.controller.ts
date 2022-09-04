import { Request, Response } from 'express';
import boardService from '@services/board.service';

const createBoard = async (req: Request, res: Response) => {
  const name = req.headers['name'];
  const { title, content } = req.body;

  const result = await boardService.createBoard(title, content, name as string);

  if (result.status === 201) {
    return res
      .status(result.status)
      .send({ status: result.status, message: result.message });
  } else {
    console.error(result);
    return res
      .status(result.status)
      .send({ status: result.status, message: result.message });
  }
};

const getBoard = async (req: Request, res: Response) => {
  const { search } = req.query;
  const { board_id } = req.params;

  let result: Success | Fail;
  if (search) {
    result = await boardService.searchBoard(search as string); // 검색
  } else if (board_id) {
    result = await boardService.getBoardDetail(+board_id); // 상세 페이지
  } else {
    result = await boardService.getBoardList(); // 목록
  }

  if (result.status === 200) {
    return res.status(result.status).send(result);
  } else {
    console.error(result);
    return res
      .status(result.status)
      .send({ status: result.status, message: result.message });
  }
};

const updateBoard = async (req: Request, res: Response) => {
  const { board_id } = req.params;
  const name = req.headers['name'];
  const { title, content } = req.body;

  const result: Success | Fail = await boardService.updateBoard(
    +board_id,
    title,
    content,
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

const deleteBoard = async (req: Request, res: Response) => {
  const { board_id } = req.params;
  const name = req.headers['name'];

  const result = await boardService.deleteBoard(board_id, name as string);

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
  createBoard,
  getBoard,
  updateBoard,
  deleteBoard,
};
