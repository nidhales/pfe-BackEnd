import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class Article {
   @Prop()
   ArticleName: string;
   @Prop()
   ArticleContent: string;
}
export const ArticleSchema = SchemaFactory.createForClass(Article);