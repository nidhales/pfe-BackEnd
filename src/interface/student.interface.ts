import { UserRole } from 'src/schema/user.schema';
import { IBadge } from './badge.interface';
import mongoose from 'mongoose';
import { IArticle } from './article.interface';
import { Code } from 'src/schema/code.schema';

export interface UserDetails {
  id: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  email: string;
  password: string;
  role: UserRole;
  badges: IBadge[];
  errors: {
    ErrorName: string;
    ErrorDescription: string;
    solutions: mongoose.Types.ObjectId[];
  }[];
  articles: IArticle[];
  codes: Code[];
}
