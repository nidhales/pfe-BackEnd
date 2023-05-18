import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class Error {
   @Prop()
   ErrorName: string;
   @Prop()
   ErrorDescription: string;
}
export const ErrorSchema = SchemaFactory.createForClass(Error);