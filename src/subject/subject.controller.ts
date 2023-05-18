import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateSubjectDto } from 'src/dto/create-subject.dto';
import { UpdateSubjectDto } from 'src/dto/update-subject.dto';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
    constructor(private readonly subjectService: SubjectService) {}

@Post()
    async createSubject(@Res() response, @Body() CreateSubjectDto: CreateSubjectDto ){
        try {
            const newSubject = await this.subjectService.createSubject(CreateSubjectDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Subject has been created successfully',
                newSubject,});
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message:'Error: Subject not created!',
                error: 'Bad Request'});
        }
    }

@Put('/:id')
    async updateSubject(@Res() response,@Param('id') subjectId: string, @Body() updateSubjectDto: UpdateSubjectDto){
        try {
            const existingSubject = await this.subjectService.updateSubject(subjectId, updateSubjectDto);
            return response.status(HttpStatus.OK).json({
                message: 'Subject has been successfully updated',
                existingSubject,});
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

@Get()
    async getSubjects(@Res() response ) {
        try {
            const subjectData = await this.subjectService.getAllSubjects();
            return response.status(HttpStatus.OK).json({
                message: 'All subjects data found successfully',
                subjectData,});
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:id')
    async getSubject(@Res() response, @Param('id') subjectId: string) {
     try {
        const existingSubject = await
    this.subjectService.getSubject(subjectId);
        return response.status(HttpStatus.OK).json({
        message: 'subject found successfully',existingSubject,});
     } catch (err) {
       return response.status(err.status).json(err.response);
     }
    }


    @Delete('/:id')
    async deleteSubject(@Res() response, @Param('id') subjectId: string)
    {
      try {
        const deletedSubject = await this.subjectService.deleteSubject(subjectId);
        return response.status(HttpStatus.OK).json({
        message: 'Subject deleted successfully',
        deletedSubject,});
      }catch (err) {
        return response.status(err.status).json(err.response);
      }
     }
}
