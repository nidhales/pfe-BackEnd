import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateErrorDto } from 'src/dto/create-error.dto';
import { UpdateErrorDto } from 'src/dto/update-error.dto';
import { ErrorService } from './error.service';
@Controller('error')
export class ErrorController {
    constructor(private readonly errorService: ErrorService) {}
@Post()
    async createError(@Res() response, @Body() CreateErrorDto: CreateErrorDto ){
        try {
            const newError = await this.errorService.createError(CreateErrorDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Error has been created successfully',
                newError,});
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message:'Error: Error not created!',
                error: 'Bad Request'});
        }
    }

@Put('/:id')
    async updateError(@Res() response,@Param('id') errorId: string, @Body() updateErrorDto: UpdateErrorDto){
        try {
            const existingError = await this.errorService.updateError(errorId, updateErrorDto);
            return response.status(HttpStatus.OK).json({
                message: 'Error has been successfully updated',
                existingError,});
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

@Get()
    async getErrors(@Res() response ) {
        try {
            const errorData = await this.errorService.getAllErrors();
            return response.status(HttpStatus.OK).json({
                message: 'All Errors data found successfully',
                errorData,});
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:id')
    async getError(@Res() response, @Param('id') errorId: string) {
     try {
        const existingError = await
    this.errorService.getError(errorId);
        return response.status(HttpStatus.OK).json({
        message: 'error found successfully',existingError,});
     } catch (err) {
       return response.status(err.status).json(err.response);
     }
    }


    @Delete('/:id')
    async deleteError(@Res() response, @Param('id') errorId: string)
    {
      try {
        const deletedError = await this.errorService.deleteError(errorId);
        return response.status(HttpStatus.OK).json({
        message: 'Error deleted successfully',
        deletedError,});
      }catch (err) {
        return response.status(err.status).json(err.response);
      }
     }
}
