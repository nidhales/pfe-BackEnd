import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { CategorySchema } from './schema/categorie.schema';
import { CategoryService } from './category/category.service';
import { CategoryController } from './category/category.controller';
import { SubjectSchema } from './schema/subject.schema';
import { SubjectService } from './subject/subject.service';
import { SubjectController } from './subject/subject.controller';
import { BadgeService } from './badge/badge.service';
import { BadgeController } from './badge/badge.controller';
import { BadgeSchema } from './schema/badge.schema';
import { SolutionService } from './solution/solution.service';
import { SolutionController } from './solution/solution.controller';
import { SolutionSchema } from './schema/solution.schema';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ArticleService } from './article/article.service';
import { ArticleController } from './article/article.controller';
import { ArticleSchema } from './schema/article.schema';
import { ErrorService } from './error/error.service';
import { ErrorController } from './error/error.controller';
import { ErrorSchema } from './schema/error.schema';
import { CodeService } from './code/code.service';
import { CodeController } from './code/code.controller';
import { CodeSchema } from './schema/code.schema';
import { TagModule } from './tag/tag.module';
import { SubjectModule } from './subject/subject.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/userdb'),
    MongooseModule.forFeature([
      { name: 'Category', schema: CategorySchema },
      { name: 'Badge', schema: BadgeSchema },
      { name: 'Solution', schema: SolutionSchema },
      { name: 'Article', schema: ArticleSchema },
      { name: 'Error', schema: ErrorSchema },
      { name: 'Code', schema: CodeSchema },
    ]),
    UserModule,
    AuthModule,
    TagModule,
    SubjectModule,
    MulterModule.register({
      dest: './uploads', // Specify the destination folder for uploaded files
    }),
  ],

  controllers: [
    AppController,
    UserController,
    CategoryController,
    BadgeController,
    SolutionController,
    ArticleController,
    ErrorController,
    CodeController,
  ],
  providers: [
    AppService,
    CategoryService,
    BadgeService,
    SolutionService,
    ArticleService,
    ErrorService,
    CodeService,
  ],
})
export class AppModule {}
