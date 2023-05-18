import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class Solution {
   @Prop()
   score: number;
   @Prop()
   code: string;
   @Prop()
   guide: string;
}
export const SolutionSchema = SchemaFactory.createForClass(Solution);