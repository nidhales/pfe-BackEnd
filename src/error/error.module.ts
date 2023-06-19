import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from 'src/schema/categorie.schema';
import { ErrorSchema } from 'src/schema/error.schema';
import { ErrorController } from './error.controller';
import { ErrorService } from './error.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Category', schema: CategorySchema },
      { name: 'Error', schema: ErrorSchema },
    ]),
  ],
  controllers: [ErrorController],
  providers: [ErrorService],
  exports: [ErrorService],
})
export class ErrorModule {}
