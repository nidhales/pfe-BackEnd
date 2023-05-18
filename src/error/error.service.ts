import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateErrorDto } from 'src/dto/create-error.dto';
import { UpdateErrorDto } from 'src/dto/update-error.dto';
import { IError } from 'src/interface/error.interface';

@Injectable()
export class ErrorService {
    constructor(@InjectModel('Error') private errorModel:Model <IError>){}

    async createError(createErrorDto: CreateErrorDto):Promise <IError> {
        const newError = await new this.errorModel(createErrorDto);
        return newError.save();
    }

    async updateError(errorId: string, updateErrorDto: UpdateErrorDto):Promise <IError> {
        const existingError = await this.errorModel.findByIdAndUpdate(errorId, updateErrorDto,{new: true});
    if (!existingError){
        throw new NotFoundException('Error #${errorId} not found !');
    }
    return existingError;
    }

    async getAllErrors(): Promise <IError[]> {
        const errorData = await this.errorModel.find();

        if (!errorData || errorData.length ==0) {
            throw new NotFoundException('Error #${errorId} not found !');
        }
        return errorData;
    }

    async getError(errorId: string): Promise<IError> {
        const existingError = await this.errorModel.findById(errorId).exec();

        if(!existingError) {
            throw new NotFoundException('Error #${errorId} not found');
        }
        return existingError;
    }

    async deleteError(errorId: string): Promise<IError> {
        const deletedError = await this.errorModel.findByIdAndDelete(errorId);

        if(!deletedError) {
            throw new NotFoundException('Error #${errorId} not found');
        }
        return deletedError;
    }
}
