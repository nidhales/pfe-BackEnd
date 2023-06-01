import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateErrorDto } from 'src/dto/create-error.dto';
import { UpdateErrorDto } from 'src/dto/update-error.dto';
import { IError } from 'src/interface/error.interface';
import { Error } from 'src/schema/error.schema';

@Injectable()
export class ErrorService {
  constructor(@InjectModel('Error') private errorModel: Model<Error>) {}

  // async createError(createErrorDto: CreateErrorDto): Promise<IError> {
  //   const newError = await new this.errorModel(createErrorDto);
  //   return newError.save();
  // }

  // async updateError(
  //   errorId: string,
  //   updateErrorDto: UpdateErrorDto,
  // ): Promise<IError> {
  //   const existingError = await this.errorModel.findByIdAndUpdate(
  //     errorId,
  //     updateErrorDto,
  //     { new: true },
  //   );
  //   if (!existingError) {
  //     throw new NotFoundException('Error #${errorId} not found !');
  //   }
  //   return existingError;
  // }

  // async getAllErrors(): Promise<IError[]> {
  //   const errorData = await this.errorModel.find().populate('solutionId');
  //   if (!errorData || errorData.length == 0) {
  //     throw new NotFoundException('Error #${errorId} not found !');
  //   }
  //   return errorData;
  // }

  // async getError(errorId: string): Promise<IError> {
  //   const existingError = await this.errorModel.findById(errorId).exec();

  //   if (!existingError) {
  //     throw new NotFoundException('Error #${errorId} not found');
  //   }
  //   return existingError;
  // }

  // async deleteError(errorId: string): Promise<IError> {
  //   const deletedError = await this.errorModel.findByIdAndDelete(errorId);

  //   if (!deletedError) {
  //     throw new NotFoundException('Error #${errorId} not found');
  //   }
  //   return deletedError;
  // }
  async createError(errorDto: CreateErrorDto): Promise<Error> {
    const createdError = new this.errorModel(errorDto);
    return createdError.save();
  }

  async getErrorById(id: string): Promise<Error> {
    return this.errorModel.findById(id).populate('solutions').exec();
  }
}
