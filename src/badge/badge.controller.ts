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
import { CreateBadgeDto } from 'src/dto/create-badge.dto';
import { UpdateBadgeDto } from 'src/dto/update-badge.dto';
import { BadgeService } from 'src/badge/badge.service';

@Controller('badge')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @Post()
  async createBadge(@Res() response, @Body() createBadgeDto: CreateBadgeDto) {
    try {
      const newBadge = await this.badgeService.createBadge(createBadgeDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Badge has been created successfully',
        newBadge,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Badge not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateBadge(
    @Res() response,
    @Param('id') badgeId: string,
    @Body() updateBadgetDto: UpdateBadgeDto,
  ) {
    try {
      const existingBadge = await this.badgeService.updateBadge(
        badgeId,
        updateBadgetDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Badge has been successfully updated',
        existingBadge,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getBadges(@Res() response) {
    try {
      const badgeData = await this.badgeService.getAllBadges();
      return response.status(HttpStatus.OK).json({
        message: 'All badges data found successfully',
        badgeData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getBadge(@Res() response, @Param('id') badgeId: string) {
    try {
      const existingBadge = await this.badgeService.getBadge(badgeId);
      return response.status(HttpStatus.OK).json({
        message: 'Badge found successfully',
        existingBadge,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteBadge(@Res() response, @Param('id') badgeId: string) {
    try {
      const deletedBadge = await this.badgeService.deleteBadge(badgeId);
      return response.status(HttpStatus.OK).json({
        message: 'Badge deleted successfully',
        deletedBadge,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post(':userId/badges')
  async addBadgeToUser(
    @Param('userId') userId: string,
    @Body() badgeData: any,
  ) {
    try {
      const badge = await this.badgeService.addBadgeToUser(userId, badgeData);
      return { message: 'Solution added successfully', badge };
    } catch (error) {
      return { message: 'Error adding solution', error };
    }
  }
}
