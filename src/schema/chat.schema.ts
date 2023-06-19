import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Chat extends Document {
  @Prop({ required: true })
  message: string;

  @Prop({ default: Date.now })
  timestamp: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  senderId: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  receiverId: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
