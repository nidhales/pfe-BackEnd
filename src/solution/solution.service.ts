import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSolutionDto } from 'src/dto/create-solution.dto';
import { UpdateSolutionDto } from 'src/dto/update-solution.dto';
import { IError } from 'src/interface/error.interface';
import { ISolution } from 'src/interface/solution.interface';
import { Solution } from 'src/schema/solution.schema';

@Injectable()
export class SolutionService {
  constructor(
    @InjectModel('Solution') private solutionModel: Model<Solution>,
    @InjectModel('Error') private errorModel: Model<IError>,
  ) {}

  // async createSolution(createSolutionDto: CreateSolutionDto):Promise <ISolution> {
  //     const newSolution = await new this.solutionModel(createSolutionDto);
  //     return newSolution.save();
  // }

  async updateSolution(
    solutionId: string,
    updateSolutionDto: UpdateSolutionDto,
  ): Promise<ISolution> {
    const existingSolution = await this.solutionModel.findByIdAndUpdate(
      solutionId,
      updateSolutionDto,
      { new: true },
    );
    if (!existingSolution) {
      throw new NotFoundException('Solution #${solutionId} not found !');
    }
    return existingSolution;
  }

  async getAllSolutions(): Promise<ISolution[]> {
    const solutionData = await this.solutionModel.find();

    if (!solutionData || solutionData.length == 0) {
      throw new NotFoundException('Solution #${solutionId} not found !');
    }
    return solutionData;
  }

  async getSolution(solutionId: string): Promise<ISolution> {
    const existingSolution = await this.solutionModel
      .findById(solutionId)
      .exec();

    if (!existingSolution) {
      throw new NotFoundException('Solution #${solutionId} not found');
    }
    return existingSolution;
  }

  async deleteSolution(solutionId: string): Promise<ISolution> {
    const deletedSolution = await this.solutionModel.findByIdAndDelete(
      solutionId,
    );

    if (!deletedSolution) {
      throw new NotFoundException('Solution #${solutionId} not found');
    }
    return deletedSolution;
  }
  async createSolution(solutionDto: CreateSolutionDto): Promise<ISolution> {
    const createdSolution = new this.solutionModel(solutionDto);
    return createdSolution.save();
  }

  async addSolutionToError(
    errorId: string,
    solutionData: any,
  ): Promise<Solution> {
    const error = await this.errorModel.findById(errorId);
    if (!error) {
      throw new Error('Error not found');
    }

    const solution = new this.solutionModel({
      error: error._id,
      score: solutionData.score,
      code: solutionData.code,
      guide: solutionData.guide,
      // Set other solution properties
    });

    error.solutions.push(solution._id);
    await error.save();
    await solution.save();

    return solution;
  }
}
