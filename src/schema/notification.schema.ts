import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Notification extends Document {
  @Prop()
  message: string;

  @Prop()
  recipient: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
