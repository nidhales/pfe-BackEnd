import { Document } from 'mongoose';
export interface IBadge extends Document{
    readonly name: string;

}