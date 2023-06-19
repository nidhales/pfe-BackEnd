import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
@Schema()
export class Tag extends Document {
  @Prop()
  TagName: string;
  error: { type: mongoose.Schema.Types.ObjectId; ref: 'Error' };
}
export const TagSchema = SchemaFactory.createForClass(Tag);
