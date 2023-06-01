import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Solution extends Document {
  @Prop()
  score: number;

  @Prop()
  code: string;

  @Prop()
  guide: string;
}

export const SolutionSchema = SchemaFactory.createForClass(Solution);
