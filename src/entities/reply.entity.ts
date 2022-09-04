import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@entities/user.entity';
import { Comment } from '@entities/comment.entity';

@Entity('REPLY')
export class Reply extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 대댓글 내용
  @Column({ length: 255, type: 'varchar' })
  content: string;

  @Column({ name: 'comment_id' })
  commentId: number;

  // 생성일자
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // N:1 => REPLY:COMMENT
  @ManyToOne(() => Comment, (comment) => comment.replies, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'comment_id' })
  comment: Comment;

  // N:1 => REPLY:USER
  @ManyToOne(() => User, (user) => user.replies, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
