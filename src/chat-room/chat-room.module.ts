import { Module } from '@nestjs/common';
import { ChatRoomService } from './chat-room.service';
import { ChatRoomController } from './chat-room.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [ChatRoomService],
  controllers: [ChatRoomController],
  exports: [ChatRoomService]
})
export class ChatRoomModule { }
