import { IsNotEmpty, IsString, MaxLength } from "class-validator";
export class CreateErrorDto {

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly ErrorName: string;

    @IsString()
    @IsNotEmpty()
    readonly ErrorDescription: string;
}