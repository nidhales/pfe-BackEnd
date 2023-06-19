import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTagDto } from 'src/dto/create-tag.dto';
import { UpdateTagDto } from 'src/dto/update-tag.dto';
import { IError } from 'src/interface/error.interface';
import { ITag } from 'src/interface/tag.interface';
import { Tag } from 'src/schema/tag.schema';

@Injectable()
export class TagService {
  constructor(
    @InjectModel('Tag') private tagModel: Model<Tag>,
    @InjectModel('Error') private errorModel: Model<IError>,
  ) {}

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
    const tagData = await this.tagModel.find();

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

  async createTag(tagDto: CreateTagDto): Promise<ITag> {
    const createdTag = new this.tagModel(tagDto);
    return createdTag.save();
  }
  async addTagToError(errorId: string, tagData: any): Promise<ITag> {
    const error = await this.errorModel.findById(errorId);
    if (!error) {
      throw new Error('Error not found');
    }

    const tag = new this.tagModel({
      error: error._id,
      TagName: tagData.TagName,
      // Set other solution properties
    });

    error.tags.push(tag._id);
    await error.save();
    await tag.save();

    return tag;
  }
}
