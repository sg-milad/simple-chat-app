import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatRoomModule } from './chat-room/chat-room.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './shared/prisma/prisma.module';

@Module({
  imports: [PrismaModule, ChatRoomModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
