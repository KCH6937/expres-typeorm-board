import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@entities/user.entity';
import { Comment } from '@entities/comment.entity';

@Entity('BOARD')
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 게시글 제목
  @Column({ length: 100, type: 'varchar' })
  title: string;

  // 게시글 내용
  @Column({ type: 'text' })
  content: string;

  // 게시글 수정여부
  @Column({ type: 'boolean' })
  is_updated: boolean;

  // 생성일자
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // 수정일자
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  // 1:N => BOARD:COMMENT, CASCADE=true
  @OneToMany(() => Comment, (comment) => comment.board)
  comments: Comment[];

  // N:1 => BOARD:USER
  @ManyToOne(() => User, (user) => user.boards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
