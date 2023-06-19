import { Document } from 'mongoose';
export interface ISolution extends Document{
    readonly score: number;
    readonly code: string;
    readonly guide: string;
}