import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
@Schema()
export class Article extends Document {
  @Prop()
  ArticleName: string;
  @Prop()
  ArticleContent: string;
}
export const ArticleSchema = SchemaFactory.createForClass(Article);
