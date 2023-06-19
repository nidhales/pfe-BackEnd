import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type SubjectDocument = Subject & Document;
@Schema()
export class Subject {
  @Prop()
  subjectName: string;
}
export const SubjectSchema = SchemaFactory.createForClass(Subject);

