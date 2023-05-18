import { IsNotEmpty, IsString, MaxLength } from "class-validator";
export class CreateSubjectDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly subjectName: string;
}