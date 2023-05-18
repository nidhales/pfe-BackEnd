import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { User } from './user.schema';
@Schema()
export class Code {
  @Prop()
  title: string;
  @Prop()
  content: string;
  @Prop()
  classeDeLogs: string;
  @Prop()
  config: string;
  @Prop()
  recommendation: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User })
  @Type(() => User)
  author: User;
}
export const CodeSchema = SchemaFactory.createForClass(Code);
