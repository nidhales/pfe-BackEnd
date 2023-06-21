import { Document, Types } from 'mongoose';
import { ISolution } from './solution.interface';
import { ITag } from './tag.interface';
import { ICategory } from './category.interface';
import { User } from 'src/schema/user.schema';
export interface IError extends Document {
  ErrorName: string;
  ErrorDescription: string;
  likes: number;
  dislikes: number;
  solutions: ISolution[];
  tags: ITag[];
  categories: ICategory[];
  user: User;
}
