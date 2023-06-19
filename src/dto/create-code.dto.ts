import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateCodeDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  @IsString()
  @IsNotEmpty()
  readonly content: string;
  readonly classeDeLogs: string;
  @IsString()
  @IsNotEmpty()
  readonly config: string;
  @IsString()
  @IsNotEmpty()
  readonly recommendation: string;
}
