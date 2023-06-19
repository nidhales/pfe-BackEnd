import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';
export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  readonly subjectName: string;
}
