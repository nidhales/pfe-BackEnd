import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
export class CreateSolutionDto {

    @IsNumber()
    @IsNotEmpty()
    readonly score: number;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly code: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly guide: string;
}