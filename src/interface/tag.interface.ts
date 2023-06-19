import { Document } from 'mongoose';
export interface ITag extends Document {
  readonly TagName: string;
}
