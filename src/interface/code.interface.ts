import { Document } from 'mongoose';
export interface ICode extends Document {
  readonly title: string;
  readonly content: string;
  readonly classeDeLogs: string;
  readonly config: string;
  readonly recommendation: string;
}
