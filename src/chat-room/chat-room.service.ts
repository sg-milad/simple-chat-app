import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ChatRoom, Message } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { SendMessageDto } from './dto/SendMessage.dto';

@Injectable()
export class ChatRoomService {
    constructor(
        private prisma: PrismaService,
        private userService: UserService
    ) { }

    async createChatRoom(name: string): Promise<ChatRoom> {
        return await this.prisma.chatRoom.create({
            data: { name },
        });
    }

    async sendMessage(chatRoomId: string, sendMessageDto: SendMessageDto): Promise<Message> {
        const { content, senderId } = sendMessageDto

        const user = await this.userService.getUserById(senderId)
        const chatRoom = await this.getChatRomById(chatRoomId)

        if (!chatRoom) {
            throw new NotFoundException("chat room not found")
        }

        if (!chatRoom.userIds.includes(user.id)) {
            throw new ForbiddenException()
        }
        return await this.prisma.message.create({
            data: {
                content,
                senderId,
                chatRoomId,
            },
        });
    }

    async getMessages(chatRoomId: string): Promise<Message[]> {
        return await this.prisma.message.findMany({
            where: { chatRoomId },
            orderBy: { createdAt: 'asc' },
        });
    }

    async joinChatRoom(chatRoomId: string, userId: string): Promise<ChatRoom> {
        const user = await this.userService.getUserById(userId)

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const chatRoom = await this.getChatRomById(chatRoomId)
        if (!chatRoom) {
            throw new NotFoundException("chat room not found")
        }
        return await this.prisma.chatRoom.update({
            where: { id: chatRoomId },
            data: {
                users: {
                    connect: { id: userId },
                },
            },
        });
    }
    async getChatRomById(chatRoomId: string) {
        return await this.prisma.chatRoom.findUnique({ where: { id: chatRoomId } })
    }
}
