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
import { CodeService } from './code.service';
import { CreateCodeDto } from 'src/dto/create-code.dto';
import { UpdateCodeDto } from 'src/dto/update-code.dto';
@Controller('code')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}
  @Post()
  async createCode(@Res() response, @Body() CreateCodeDto: CreateCodeDto) {
    try {
      const newCode = await this.codeService.createCode(CreateCodeDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Code has been created successfully',
        newCode,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Code not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateCode(
    @Res() response,
    @Param('id') codeId: string,
    @Body() updateCodeDto: UpdateCodeDto,
  ) {
    try {
      const existingCode = await this.codeService.updateCode(
        codeId,
        updateCodeDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Code has been successfully updated',
        existingCode,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getCodes(@Res() response) {
    try {
      const codeData = await this.codeService.getAllCodes();
      return response.status(HttpStatus.OK).json({
        message: 'All Codes data found successfully',
        codeData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getCode(@Res() response, @Param('id') codeId: string) {
    try {
      const existingCode = await this.codeService.getCode(codeId);
      return response.status(HttpStatus.OK).json({
        message: 'Code found successfully',
        existingCode,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteCode(@Res() response, @Param('id') codeId: string) {
    try {
      const deletedCode = await this.codeService.deleteCode(codeId);
      return response.status(HttpStatus.OK).json({
        message: 'Code deleted successfully',
        deletedCode,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
