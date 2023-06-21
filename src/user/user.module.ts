import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BadgeSchema } from 'src/schema/badge.schema';
import { ErrorSchema } from 'src/schema/error.schema';
import { ArticleSchema } from 'src/schema/article.schema';
import { CodeSchema } from 'src/schema/code.schema';
import { SolutionSchema } from 'src/schema/solution.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Badge', schema: BadgeSchema },
      { name: 'Error', schema: ErrorSchema },
      { name: 'Article', schema: ArticleSchema },
      { name: 'Code', schema: CodeSchema },
      { name: 'Solution', schema: SolutionSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
