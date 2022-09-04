import { IsString, MaxLength, IsOptional } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @MaxLength(100)
  title: string;

  @IsString()
  @MaxLength(1000)
  content: string;
}

export class UpdateBoardDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  content: string;
}
