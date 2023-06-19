import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CreateSolutionDto } from './create-solution.dto';
import { CreateCodeDto } from './create-code.dto';
export class CreateErrorDto {
  @IsString()
  @IsNotEmpty()
  readonly ErrorName: string;

  @IsString()
  @IsNotEmpty()
  readonly ErrorDescription: string;
  solutions: CreateSolutionDto[];
  tags: CreateCodeDto[];
}
