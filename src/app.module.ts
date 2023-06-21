import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { BadgeService } from './badge/badge.service';
import { BadgeController } from './badge/badge.controller';
import { BadgeSchema } from './schema/badge.schema';
import { SolutionService } from './solution/solution.service';
import { SolutionController } from './solution/solution.controller';
import { SolutionSchema } from './schema/solution.schema';
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
import { TagSchema } from './schema/tag.schema';
import { TagService } from './tag/tag.service';
import { TagController } from './tag/tag.controller';
import { UserSchema } from './schema/user.schema';
import { UserService } from './user/user.service';
import { CategorySchema } from './schema/categorie.schema';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { SubjectSchema } from './schema/subject.schema';
import { SubjectController } from './subject/subject.controller';
import { SubjectService } from './subject/subject.service';
import { PusherController } from './pusher/pusher.controller';
import { PusherService } from './pusher/pusher.service';
import { ChatService } from './chat/chat.service';
import { ChatController } from './chat/chat.controller';
import { ChatSchema } from './schema/chat.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/userdb'),
    MongooseModule.forFeature([
      { name: 'Badge', schema: BadgeSchema },
      { name: 'Solution', schema: SolutionSchema },
      { name: 'Article', schema: ArticleSchema },
      { name: 'Code', schema: CodeSchema },
      { name: 'Tag', schema: TagSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Category', schema: CategorySchema },
      { name: 'Error', schema: ErrorSchema },
      { name: 'Subject', schema: SubjectSchema },
      { name: 'Chat', schema: ChatSchema },

      // { name: 'Notification', schema: NotificationSchema },
    ]),


    AuthModule,
  ],

  controllers: [
    AppController,
    UserController,
    BadgeController,
    SolutionController,
    ArticleController,
    ErrorController,
    CodeController,
    TagController,
    CategoryController,
    SubjectController,
    PusherController,
    ChatController,
  ],
  providers: [
    AppService,
    BadgeService,
    SolutionService,
    ArticleService,
    ErrorService,
    CodeService,
    TagService,
    UserService,
    CategoryService,
    SubjectService,
    PusherService,
    ChatService,
  ],
})
export class AppModule {}
