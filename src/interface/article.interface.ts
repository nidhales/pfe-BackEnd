import { Document } from 'mongoose';
export interface IArticle extends Document{
    readonly ArticleName: string;
    readonly ArticleContent: string;
}