import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class Badge {
   @Prop()
   name: string;
}
export const BadgeSchema = SchemaFactory.createForClass(Badge);