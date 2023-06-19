import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from 'src/dto/create-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async createChat(@Body() createChatDto: CreateChatDto) {
    return this.chatService.createChat(createChatDto);
  }

  @Get(':senderId/:receiverId')
  async getChatsBySenderIdAndReceiverId(
    @Param('senderId') senderId: string,    
    @Param('receiverId') receiverId: string,
  ) {
    return this.chatService.getChatsBySenderIdAndReceiverId(
      senderId,
      receiverId,
    );
  }
}
