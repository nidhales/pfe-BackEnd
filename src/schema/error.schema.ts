import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ICategory } from 'src/interface/category.interface';
import { ISolution } from 'src/interface/solution.interface';
import { ITag } from 'src/interface/tag.interface';
import { User } from './user.schema';
import { Subject } from './subject.schema';

@Schema()
export class Errors extends Document {
  @Prop()
  ErrorName: string;

  @Prop()
  ErrorDescription: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Solution' }] })
  solutions: ISolution[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }] })
  tags: ITag[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
  categories: ICategory[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' })
  subject: Subject;
}
export const ErrorSchema = SchemaFactory.createForClass(Errors);
