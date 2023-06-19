import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Solution extends Document {
  @Prop()
  score: number;

  @Prop()
  code: string;

  @Prop()
  guide: string;
  error: { type: mongoose.Schema.Types.ObjectId; ref: 'Error' };
}

export const SolutionSchema = SchemaFactory.createForClass(Solution);
