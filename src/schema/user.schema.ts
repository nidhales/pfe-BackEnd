import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { IBadge } from 'src/interface/badge.interface';
import { IError } from 'src/interface/error.interface';
import { Errors } from './error.schema';
import { Article } from './article.schema';
import { IArticle } from 'src/interface/article.interface';
import { Code } from './code.schema';
export enum UserRole {
  ADMIN = 'admin',
  DEV = 'dev',
}
export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  FirstName: string;
  @Prop({ required: true })
  LastName: string;
  @Prop({})
  PhoneNumber: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ type: String, enum: UserRole, default: UserRole.DEV })
  role: UserRole;
  @Prop({ type: String })
  image: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }] })
  badges: IBadge[];
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Error' }] })
  errors: Errors[];
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }] })
  articles: Article[];
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Code' }] })
  codes: Code[];
}
export const UserSchema = SchemaFactory.createForClass(User);
