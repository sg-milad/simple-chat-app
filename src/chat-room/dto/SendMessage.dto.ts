import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class SendMessageDto {
    @ApiProperty({
        description: 'The sender user ID',
        example: 'userId123',
    })
    @IsString()
    @IsMongoId({ message: 'senderId must be a valid MongoDB ObjectId' })
    senderId: string;

    @ApiProperty({
        description: 'The content of the message',
        example: 'Hello, everyone!',
    })
    @IsString()
    content: string;
}
