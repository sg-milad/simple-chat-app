import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsMongoId, IsDateString } from 'class-validator';

export class ChatRoomDto {
    @ApiProperty({
        description: 'The ID of the chat room',
        example: '60c72b2f5f1b2c001f8d0b34',
    })
    @IsMongoId()
    id: string;

    @ApiProperty({
        description: 'The name of the chat room',
        example: 'General Chat Room',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The list of users in the chat room',
        example: ['60c72b2f5f1b2c001f8d0b34', '60c72b2f5f1b2c001f8d0b35'],
    })
    @IsArray()
    @IsMongoId({ each: true })
    userIds: string[];

    @ApiProperty({
        description: 'Timestamp of when the chat room was created',
        example: '2023-11-18T08:00:00Z',
    })
    @IsDateString()
    createdAt: Date;
}
