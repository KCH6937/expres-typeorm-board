import { Reply } from '@entities/reply.entity';

export default interface CommentList {
  id: number;
  content: string;
  created_at: Date;
  replies?: Reply[];
}
