import { Document } from 'mongoose';
export interface IError extends Document{
    readonly ErrorName: string;
    readonly ErrorDescription: string;
}