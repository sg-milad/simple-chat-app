import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateChatRoomDto {
    @ApiProperty({
        description: 'The name of the chat room',
        example: 'General Chat Room',
    })
    @IsString()
    @IsNotEmpty()
    @Length(3, 50)
    name: string;
}
