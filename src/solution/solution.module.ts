import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SolutionSchema } from 'src/schema/solution.schema';
import { SolutionController } from './solution.controller';
import { SolutionService } from './solution.service';
import { ErrorSchema } from 'src/schema/error.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Solution', schema: SolutionSchema },
      { name: 'Error', schema: ErrorSchema },
    ]),
  ],
  controllers: [SolutionController],
  providers: [SolutionService],
  exports: [SolutionService],
})
export class SolutionModule {}
