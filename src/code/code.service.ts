import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCodeDto } from 'src/dto/create-code.dto';
import { UpdateCodeDto } from 'src/dto/update-code.dto';
import { ICode } from 'src/interface/code.interface';

@Injectable()
export class CodeService {
  constructor(@InjectModel('Code') private codeModel: Model<ICode>) {}

  async createCode(createCodeDto: CreateCodeDto): Promise<ICode> {
    const newCode = await new this.codeModel(createCodeDto);
    return newCode.save();
  }

  async updateCode(
    codeId: string,
    updateCodeDto: UpdateCodeDto,
  ): Promise<ICode> {
    const existingCode = await this.codeModel.findByIdAndUpdate(
      codeId,
      updateCodeDto,
      { new: true },
    );
    if (!existingCode) {
      throw new NotFoundException('Code #${codeId} not found !');
    }
    return existingCode;
  }

  async getAllCodes(): Promise<ICode[]> {
    const codeData = await this.codeModel.find();

    if (!codeData || codeData.length == 0) {
      throw new NotFoundException('Codes not found !');
    }
    return codeData;
  }

  async getCode(codeId: string): Promise<ICode> {
    const existingCode = await this.codeModel.findById(codeId).exec();

    if (!existingCode) {
      throw new NotFoundException('Code #${codeId} not found');
    }
    return existingCode;
  }

  async deleteCode(codeId: string): Promise<ICode> {
    const deletedCode = await this.codeModel.findByIdAndDelete(codeId);

    if (!deletedCode) {
      throw new NotFoundException('Code #${codeId} not found');
    }
    return deletedCode;
  }
}
