import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Solution } from './solution.schema';

@Schema()
export class Error extends Document {
  @Prop()
  errorName: string;

  @Prop()
  errorDescription: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Solution' }] })
  solutions: Solution[];
}

export const ErrorSchema = SchemaFactory.createForClass(Error);
