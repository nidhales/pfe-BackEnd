import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class Subject {
   @Prop()
   subjectName: string;
}
export const SubjectSchema = SchemaFactory.createForClass(Subject);