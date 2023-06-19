import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
export class CreateSolutionDto {
  @IsNumber()
  @IsNotEmpty()
  readonly score: number;

  @IsString()
  @IsNotEmpty()
  readonly code: string;

  @IsString()
  @IsNotEmpty()
  readonly guide: string;
}
