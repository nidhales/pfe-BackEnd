import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateErrorDto } from 'src/dto/create-error.dto';
import { UpdateErrorDto } from 'src/dto/update-error.dto';
import { ICategory } from 'src/interface/category.interface';
import { IError } from 'src/interface/error.interface';
import { Category } from 'src/schema/categorie.schema';
import { Errors } from 'src/schema/error.schema';
import { User } from 'src/schema/user.schema';

@Injectable()
export class ErrorService {
  constructor(
    @InjectModel('Error') private errorModel: Model<IError>,
    @InjectModel('Category') private categoryModel: Model<Category>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async updateError(
    errorId: string,
    updateErrorDto: UpdateErrorDto,
  ): Promise<IError> {
    const existingError = await this.errorModel.findByIdAndUpdate(
      errorId,
      updateErrorDto,
      { new: true },
    );
    if (!existingError) {
      throw new NotFoundException('Error #${errorId} not found !');
    }
    return existingError;
  }

  async getAllErrors(): Promise<Errors[]> {
    const errorData = await this.errorModel
      .find()
      .populate({
        path: 'solutions',
        populate: {
          path: 'user',
          model: 'User',
        },
      })
      .populate('tags')
      .populate('categories')
      .populate('user')

      .exec();
    return errorData;
  }

  async deleteError(errorId: string): Promise<IError> {
    const deletedError = await this.errorModel.findByIdAndDelete(errorId);

    if (!deletedError) {
      throw new NotFoundException('Error #${errorId} not found');
    }
    return deletedError;
  }
  async createError(errorDto: CreateErrorDto): Promise<IError> {
    const createdError = new this.errorModel(errorDto);
    return createdError.save();
  }

  async getErrorById(id: string): Promise<IError> {
    const existingError = await this.errorModel
      .findById(id)
      .populate('solutions')
      .populate('tags')
      .exec();
    return existingError;
  }

  async addCategoryToError(
    errorId: string,
    categoryData: any,
  ): Promise<ICategory> {
    const error = await this.errorModel.findById(errorId);
    if (!error) {
      throw new Error('User not found');
    }

    const category = new this.categoryModel({
      error: error.id,
      name: categoryData.name,
    });

    error.categories.push(category.id);
    await category.save();
    await error.save();
    return category;
  }

  async findByName(name: string): Promise<Errors[]> {
    const errors = await this.errorModel
      .find({ ErrorName: { $regex: name, $options: 'i' } })
      .populate('solutions')
      .populate('tags')
      .exec();
    return errors;
  }
}
