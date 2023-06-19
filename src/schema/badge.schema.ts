import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()

export class Badge extends Document {

  @Prop()
  name: string;

  user: { type: mongoose.Schema.Types.ObjectId; ref: 'User' };

}

export const BadgeSchema = SchemaFactory.createForClass(Badge);
