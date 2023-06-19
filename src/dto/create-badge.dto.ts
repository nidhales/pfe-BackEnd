import { IsNotEmpty, IsString, MaxLength } from "class-validator";
export class CreateBadgeDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;
}