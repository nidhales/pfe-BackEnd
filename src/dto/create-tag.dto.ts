import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateTagDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly TagName: string;
  subject: string;
}
