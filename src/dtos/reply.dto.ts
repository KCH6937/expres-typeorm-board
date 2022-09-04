import { IsString, MaxLength } from 'class-validator';

export class CreateReplyDto {
  @IsString()
  @MaxLength(255)
  content: string;
}
