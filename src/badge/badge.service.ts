import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBadgeDto } from 'src/dto/create-badge.dto';
import { IBadge } from 'src/interface/badge.interface';
import { Model } from "mongoose";
import { UpdateBadgeDto } from 'src/dto/update-badge.dto';



@Injectable()
export class BadgeService {
constructor(@InjectModel('Badge') private badgeModel:Model<IBadge>) { }


async createBadge(createBadgeDto: CreateBadgeDto): Promise<IBadge> {
   const newBadge = await new this.badgeModel(createBadgeDto);
   return newBadge.save();
}


async updateBadge(badgeId: string, updateBadgeDto: UpdateBadgeDto): Promise<IBadge> {
    const existingBadge = await this.badgeModel.findByIdAndUpdate(badgeId, updateBadgeDto, { new: true });
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
   const existingBadge = await     this.badgeModel.findById(badgeId).exec();
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

}