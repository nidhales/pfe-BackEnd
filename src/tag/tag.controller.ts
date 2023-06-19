import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from 'src/dto/create-tag.dto';
import { UpdateTagDto } from 'src/dto/update-tag.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async createTag(@Res() response, @Body() CreateTagDto: CreateTagDto) {
    try {
      const newTag = await this.tagService.createTag(CreateTagDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Tag has been created successfully',
        newTag,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Tag not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateTag(
    @Res() response,
    @Param('id') tagId: string,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    try {
      const existingTag = await this.tagService.updateTag(tagId, updateTagDto);
      return response.status(HttpStatus.OK).json({
        message: 'Tag has been successfully updated',
        existingTag,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getTags(@Res() response) {
    try {
      const tagData = await this.tagService.getAllTags();
      return response.status(HttpStatus.OK).json({
        message: 'All tags data found successfully',
        tagData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getTag(@Res() response, @Param('id') tagId: string) {
    try {
      const existingTag = await this.tagService.getTag(tagId);
      return response.status(HttpStatus.OK).json({
        message: 'tag found successfully',
        existingTag,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteTag(@Res() response, @Param('id') tagId: string) {
    try {
      const deletedTag = await this.tagService.deleteTag(tagId);
      return response.status(HttpStatus.OK).json({
        message: 'Tag deleted successfully',
        deletedTag,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post(':errorId/tags')
  async addTagToError(@Param('errorId') errorId: string, @Body() tagData: any) {
    try {
      const tag = await this.tagService.addTagToError(errorId, tagData);
      return { message: 'Tag added successfully', tag };
    } catch (error) {
      return { message: 'Error adding solution', error };
    }
  }
}
