import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTagDto } from 'src/dto/create-tag.dto';
import { UpdateTagDto } from 'src/dto/update-tag.dto';
import { ITag } from 'src/interface/tag.interface';

@Injectable()
export class TagService {
  constructor(@InjectModel('Tag') private tagModel: Model<ITag>) {}

  async createTag(createTagDto: CreateTagDto): Promise<ITag> {
    const newTag = await new this.tagModel(createTagDto);
    return newTag.save();
  }

  async updateTag(tagId: string, updateTagDto: UpdateTagDto): Promise<ITag> {
    const existingTag = await this.tagModel.findByIdAndUpdate(
      tagId,
      updateTagDto,
      { new: true },
    );
    if (!existingTag) {
      throw new NotFoundException('Tag #${tagId} not found !');
    }
    return existingTag;
  }

  async getAllTags(): Promise<ITag[]> {
    const tagData = await this.tagModel.find().populate('subjectId');

    if (!tagData || tagData.length == 0) {
      throw new NotFoundException('Tag #${tagId} not found !');
    }
    return tagData;
  }

  async getTag(tagId: string): Promise<ITag> {
    const existingTag = await this.tagModel.findById(tagId).exec();

    if (!existingTag) {
      throw new NotFoundException('Tag #${tagId} not found');
    }
    return existingTag;
  }

  async deleteTag(tagId: string): Promise<ITag> {
    const deletedTag = await this.tagModel.findByIdAndDelete(tagId);

    if (!deletedTag) {
      throw new NotFoundException('Tag #${tagId} not found');
    }
    return deletedTag;
  }
}
