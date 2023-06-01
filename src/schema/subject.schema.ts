import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
export type SubjectDocument = Subject & Document;
@Schema()
export class Subject {
  @Prop()
  subjectName: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' })
  tag: String;
}
export const SubjectSchema = SchemaFactory.createForClass(Subject);
