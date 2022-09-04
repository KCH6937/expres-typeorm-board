import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from '@entities/board.entity';
import { Comment } from '@entities/comment.entity';
import { Reply } from '@entities/reply.entity';

@Entity('USER')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 사용자명
  @Column({ length: 20, type: 'varchar' })
  name: string;

  // 1:N => USER:BOARD, CASCADE=true
  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];

  // 1:N => USER:COMMENT, CASCADE=true
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  // 1:N => USER:REPLY, CASCADE=true
  @OneToMany(() => Reply, (reply) => reply.user)
  replies: Reply[];
}
