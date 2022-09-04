import CommentList from './commentDetail.interface';

export default interface BoardDetail {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at?: Date;
  comment_list?: CommentList[];
}
