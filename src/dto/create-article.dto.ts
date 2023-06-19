import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  readonly ArticleName: string;

  @IsString()
  @IsNotEmpty()
  readonly ArticleContent: string;
}
