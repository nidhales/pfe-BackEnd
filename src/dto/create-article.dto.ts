import { IsNotEmpty, IsString, MaxLength } from "class-validator";
export class CreateArticleDto {

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly ArticleName: string;

    @IsString()
    @IsNotEmpty()
    readonly ArticleContent: string;
}