import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@entities/user.entity';
import { Board } from '@entities/board.entity';
import { Reply } from '@entities/reply.entity';

@Entity('COMMENT')
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 댓글 내용
  @Column({ length: 255, type: 'varchar' })
  content: string;

  // 생성일자
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // 1:N => COMMENT:REPLY, CASCADE=true
  @OneToMany(() => Reply, (reply) => reply.comment)
  replies: Reply[];

  // N:1 => COMMENT:USER
  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // N:1 => COMMENT:BOARD
  @ManyToOne(() => Board, (board) => board.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'board_id' })
  board: Board;
}
