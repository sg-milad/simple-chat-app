import { Controller, Post, Get, Param, Body, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiOkResponse } from '@nestjs/swagger';
import { ChatRoomService } from '../chat-room/chat-room.service';
import { CreateChatRoomDto } from '../chat-room/dto/CreateChatRoom.dto';
import { ChatRoomDto } from '../chat-room/dto/ChatRoom.dto';
import { SendMessageDto } from '../chat-room/dto/SendMessage.dto';
import { JoinChatRoomDto } from './dto/JoinChatRoom.dto';
import { ValidateMongoIdPipe } from 'src/shared/helper/validate-mongo-id';

@ApiTags('chat-rooms')
@Controller('chat-rooms')
export class ChatRoomController {
    constructor(
        private chatRoomService: ChatRoomService,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create a new chat room' })
    @ApiOkResponse({
        description: 'The chat room has been successfully created.',
        type: ChatRoomDto,
    })
    async createChatRoom(@Body() createChatRoomDto: CreateChatRoomDto) {
        return await this.chatRoomService.createChatRoom(createChatRoomDto.name);
    }

    @Post(':id/join')
    @ApiOperation({ summary: 'Join an existing chat room' })
    @ApiParam({ name: 'id', type: String, description: 'The ID of the chat room' })
    @ApiOkResponse({
        description: 'The user has successfully joined the chat room.',
        type: ChatRoomDto,
    })
    async joinChatRoom(@Param('id', ValidateMongoIdPipe) id: string, @Body() joinChatRoomDto: JoinChatRoomDto) {
        const { userId } = joinChatRoomDto
        return await this.chatRoomService.joinChatRoom(id, userId);
    }

    @Post(':id/messages')
    @ApiOperation({ summary: 'Send a message in a chat room' })
    @ApiParam({ name: 'id', type: String, description: 'The ID of the chat room' })
    @ApiOkResponse({
        description: 'The message has been successfully sent.',
        type: SendMessageDto,
    })
    async sendMessage(
        @Param('id', ValidateMongoIdPipe) id: string,
        @Body() sendMessageDto: SendMessageDto,
    ) {
        return await this.chatRoomService.sendMessage(id, sendMessageDto);
    }

    @Get(':id/messages')
    @ApiOperation({ summary: 'Retrieve messages from a chat room' })
    @ApiParam({ name: 'id', type: String, description: 'The ID of the chat room' })
    @ApiOkResponse({
        description: 'List of messages in the chat room',
        isArray: true,
        type: SendMessageDto,
    })
    async getMessages(@Param('id', ValidateMongoIdPipe) id: string) {
        const chatRoom = await this.chatRoomService.getMessages(id);
        if (!chatRoom) {
            throw new NotFoundException("chat room not found")
        }
    }
}
