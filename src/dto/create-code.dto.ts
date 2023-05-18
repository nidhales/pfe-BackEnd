import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateCodeDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly title: string;
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly content: string;
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly classeDeLogs: string;
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly config: string;
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly recommendation: string;
}
