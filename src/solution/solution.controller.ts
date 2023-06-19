import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateSolutionDto } from 'src/dto/create-solution.dto';
import { UpdateSolutionDto } from 'src/dto/update-solution.dto';
import { SolutionService } from 'src/solution/solution.service';
@Controller('solution')
export class SolutionController {
  constructor(private readonly solutionService: SolutionService,
    ) {}

  @Put('/:id')
  async updateSolution(
    @Res() response,
    @Param('id') solutionId: string,
    @Body() updateSolutionDto: UpdateSolutionDto,
  ) {
    try {
      const existingSolution = await this.solutionService.updateSolution(
        solutionId,
        updateSolutionDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Solution has been successfully updated',
        existingSolution,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get()
  async getSolutions(@Res() response) {
    try {
      const solutionData = await this.solutionService.getAllSolutions();
      return response.status(HttpStatus.OK).json({
        message: 'All Solutions data found successfully',
        solutionData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getSolution(@Res() response, @Param('id') solutionId: string) {
    try {
      const existingSolution = await this.solutionService.getSolution(
        solutionId,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Solution found successfully',
        existingSolution,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteSolution(@Res() response, @Param('id') solutionId: string) {
    try {
      const deletedSolution = await this.solutionService.deleteSolution(
        solutionId,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Solution deleted successfully',
        deletedSolution,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post()
  async createSolution(@Body() solutionDto: CreateSolutionDto) {
    return this.solutionService.createSolution(solutionDto);
  }

  @Post(':errorId/solutions')
  async addSolutionToError(
    @Param('errorId') errorId: string,
    @Body() solutionData: any,
  ) {
    try {
      const solution = await this.solutionService.addSolutionToError(
        errorId,
        solutionData,
      );
      return { message: 'Solution added successfully', solution };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
