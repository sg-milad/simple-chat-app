import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatRoomModule } from './chat-room/chat-room.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [ChatRoomModule, MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
