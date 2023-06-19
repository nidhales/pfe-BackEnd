import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChatDto } from 'src/dto/create-chat.dto';
import { Chat } from 'src/schema/chat.schema';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

  async createChat(createChatDto: CreateChatDto): Promise<Chat> {
    const createdChat = new this.chatModel(createChatDto);
    return createdChat.save();
  }

  async getChatsBySenderIdAndReceiverId(
    senderId: string,
    receiverId: string,
  ): Promise<Chat[]> {
    return this.chatModel
      .find({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      })
      .sort({ timestamp: 'asc' })
      .populate('senderId', 'FirstName')
      .populate('receiverId', 'FirstName')
      .exec();
  }
}
