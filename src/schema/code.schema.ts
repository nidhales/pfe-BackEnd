import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
