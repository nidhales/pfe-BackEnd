import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Subject } from './subject.schema';
@Schema()
export class Tag {
  @Prop()
  TagName: string;
  @Prop({ type: Types.ObjectId, ref: 'Subject' })
  subjectId: Subject;
}
export const TagSchema = SchemaFactory.createForClass(Tag);
