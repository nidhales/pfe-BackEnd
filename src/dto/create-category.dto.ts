import { IsNotEmpty, IsString, MaxLength } from "class-validator";
export class CreateCategoryDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;
}