import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBadgeDto } from 'src/dto/create-badge.dto';
import { IBadge } from 'src/interface/badge.interface';
import { Model } from 'mongoose';
import { UpdateBadgeDto } from 'src/dto/update-badge.dto';
import { Badge } from 'src/schema/badge.schema';
import { UserDetails } from 'src/interface/student.interface';

@Injectable()
export class BadgeService {
  constructor(
    @InjectModel('Badge') private badgeModel: Model<Badge>,
    @InjectModel('User') private userModel: Model<UserDetails>,
  ) {}

  async createBadge(createBadgeDto: CreateBadgeDto): Promise<IBadge> {
    const newBadge = await new this.badgeModel(createBadgeDto);
    return newBadge.save();
  }

  async updateBadge(
    badgeId: string,
    updateBadgeDto: UpdateBadgeDto,
  ): Promise<IBadge> {
    const existingBadge = await this.badgeModel.findByIdAndUpdate(
      badgeId,
      updateBadgeDto,
      { new: true },
    );
    if (!existingBadge) {
      throw new NotFoundException(`Badge #${badgeId} not found`);
    }
    return existingBadge;
  }

  async getAllBadges(): Promise<IBadge[]> {
    const badgeData = await this.badgeModel.find();
    if (!badgeData || badgeData.length == 0) {
      throw new NotFoundException('Badges data not found!');
    }
    return badgeData;
  }

  async getBadge(badgeId: string): Promise<IBadge> {
    const existingBadge = await this.badgeModel.findById(badgeId).exec();
    if (!existingBadge) {
      throw new NotFoundException(`Badge #${badgeId} not found`);
    }
    return existingBadge;
  }

  async deleteBadge(badgeId: string): Promise<IBadge> {
    const deletedBadge = await this.badgeModel.findByIdAndDelete(badgeId);
    if (!deletedBadge) {
      throw new NotFoundException(`Badge #${badgeId} not found`);
    }
    return deletedBadge;
  }

  async addBadgeToUser(userId: string, badgeData: any): Promise<Badge> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const badge = new this.badgeModel({
      user: user._id,
      name: badgeData.name,
      // Set other solution properties
    });

    user.badges.push(badge._id);
    await user.save();
    await badge.save();

    return badge;
  }
}
