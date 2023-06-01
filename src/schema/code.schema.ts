import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';
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
}
export const CodeSchema = SchemaFactory.createForClass(Code);
