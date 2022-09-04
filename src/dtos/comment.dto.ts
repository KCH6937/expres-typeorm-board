import { IsString, MaxLength, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @MaxLength(255)
  content: string;
}
