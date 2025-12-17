import { IsNotEmpty, IsString } from 'class-validator';

export class EditNoteDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
