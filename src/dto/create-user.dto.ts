import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { UserRole } from '../schema/user.schema';
import { CreateBadgeDto } from './create-badge.dto';
import { CreateErrorDto } from './create-error.dto';
import { CreateArticleDto } from './create-article.dto';
import { CreateCodeDto } from './create-code.dto';

export class CreateUserDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly FirstName: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly LastName: string;

  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  readonly PhoneNumber: string;
  role: UserRole;
  badges: CreateBadgeDto[];
  errors: CreateErrorDto[];
  articles: CreateArticleDto[];
  codes: CreateCodeDto[];
}
