import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Solution extends Document {
  @Prop()
  score: number;

  @Prop()
  code: string;

  @Prop()
  guide: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  error: { type: mongoose.Schema.Types.ObjectId; ref: 'Error' };
}

export const SolutionSchema = SchemaFactory.createForClass(Solution);
