import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateSolutionDto } from 'src/dto/create-solution.dto';
import { UpdateSolutionDto } from 'src/dto/update-solution.dto';
import { SolutionService } from 'src/solution/solution.service';
@Controller('solution')
export class SolutionController {
   constructor(private readonly solutionService: SolutionService) { }
@Post()
   async createSolution(@Res() response, @Body() createSolutionDto: CreateSolutionDto) {
  try {
    const newSolution = await this.solutionService.createSolution(createSolutionDto);
    return response.status(HttpStatus.CREATED).json({
    message: 'Solution has been created successfully',
    newSolution,});
 } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: Solution not created!',
    error: 'Bad Request'
 });
 }
}
@Put('/:id')
async updateSolution(@Res() response,@Param('id') solutionId: string,
@Body() updateSolutionDto: UpdateSolutionDto) {
  try {
   const existingSolution = await this.solutionService.updateSolution(solutionId, updateSolutionDto);
  return response.status(HttpStatus.OK).json({
  message: 'Solution has been successfully updated',
  existingSolution,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}
@Get()
async getSolutions(@Res() response) {
try {
  const solutionData = await this.solutionService.getAllSolutions();
  return response.status(HttpStatus.OK).json({
  message: 'All Solutions data found successfully',solutionData,});
 } catch (err) {
  return response.status(err.status).json(err.response);
 }
}


@Get('/:id')
async getSolution(@Res() response, @Param('id') solutionId: string) {
 try {
    const existingSolution = await
this.solutionService.getSolution(solutionId);
    return response.status(HttpStatus.OK).json({
    message: 'Solution found successfully',existingSolution,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}



@Delete('/:id')
async deleteSolution(@Res() response, @Param('id') solutionId: string)
{
  try {
    const deletedSolution = await this.solutionService.deleteSolution(solutionId);
    return response.status(HttpStatus.OK).json({
    message: 'Solution deleted successfully',
    deletedSolution,});
  }catch (err) {
    return response.status(err.status).json(err.response);
  }
 }
}