import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { CreateErrorDto } from 'src/dto/create-error.dto';
import { UpdateErrorDto } from 'src/dto/update-error.dto';
import { ErrorService } from './error.service';
@Controller('error')
export class ErrorController {
  constructor(private readonly errorService: ErrorService) {}

  @Put('/:id')
  async updateError(
    @Res() response,
    @Param('id') errorId: string,
    @Body() updateErrorDto: UpdateErrorDto,
  ) {
    try {
      const existingError = await this.errorService.updateError(
        errorId,
        updateErrorDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Error has been successfully updated',
        existingError,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getErrors(@Res() response) {
    try {
      const errorData = await this.errorService.getAllErrors();
      return response.status(HttpStatus.OK).json({
        message: 'All Errors data found successfully',
        errorData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteError(@Res() response, @Param('id') errorId: string) {
    try {
      const deletedError = await this.errorService.deleteError(errorId);
      return response.status(HttpStatus.OK).json({
        message: 'Error deleted successfully',
        deletedError,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Post()
  async createError(@Body() errorDto: CreateErrorDto) {
    return this.errorService.createError(errorDto);
  }

  @Get(':id')
  async getError(@Param('id') id: string) {
    return this.errorService.getErrorById(id);
  }

  @Post(':errorId/category')
  async addCategoryToError(
    @Param('errorId') errorId: string,
    @Body() errorData: any,
  ) {
    try {
      const categories = await this.errorService.addCategoryToError(
        errorId,
        errorData,
      );
      return { message: 'Category added to User successfully', categories };
    } catch (error) {
      return { message: 'Error adding solution', error };
    }
  }

  @Post('search')
  async searchErrorsByName(@Body('name') name: string) {
    const errors = await this.errorService.findByName(name);
    return errors;
  }

}
