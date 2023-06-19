import { Document } from 'mongoose';
export interface ISubject extends Document{
    readonly subjectName: string;

}