import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubjectDto } from 'src/dto/create-subject.dto';
import { UpdateSubjectDto } from 'src/dto/update-subject.dto';
import { ISubject } from 'src/interface/Subject.interface';

@Injectable()
export class SubjectService {
  constructor(@InjectModel('Subject') private subjectModel: Model<ISubject>) {}

  async createSubject(createSubjectDto: CreateSubjectDto): Promise<ISubject> {
    const newSubject = await new this.subjectModel(createSubjectDto);
    return newSubject.save();
  }

  async updateSubject(
    subjectId: string,
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<ISubject> {
    const existingSubject = await this.subjectModel.findByIdAndUpdate(
      subjectId,
      updateSubjectDto,
      { new: true },
    );
    if (!existingSubject) {
      throw new NotFoundException('Subject #${subjectId} not found !');
    }
    return existingSubject;
  }

  async getAllSubjects(): Promise<ISubject[]> {
    const subjectData = await this.subjectModel.find();

    if (!subjectData || subjectData.length == 0) {
      throw new NotFoundException('Subject #${subjectId} not found !');
    }
    return subjectData;
  }

  async getSubject(subjectId: string): Promise<ISubject> {
    const existingSubject = await this.subjectModel.findById(subjectId).exec();

    if (!existingSubject) {
      throw new NotFoundException('Subject #${subjectId} not found');
    }
    return existingSubject;
  }

  async deleteSubject(subjectId: string): Promise<ISubject> {
    const deletedSubject = await this.subjectModel.findByIdAndDelete(subjectId);

    if (!deletedSubject) {
      throw new NotFoundException('Subject #${subjectId} not found');
    }
    return deletedSubject;
  }
}
