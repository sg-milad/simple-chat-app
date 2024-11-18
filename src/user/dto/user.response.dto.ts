import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
    @ApiProperty({
        description: 'The unique ID of the user',
        example: '60c72b2f5f1b2c001f8d0b34',
    })
    id: string;

    @ApiProperty({
        description: 'The username of the user',
        example: 'john_doe',
    })
    username: string;

    @ApiProperty({
        description: 'The list of chat room IDs the user is part of',
        example: ['60c72b2f5f1b2c001f8d0b34', '60c72b2f5f1b2c001f8d0b35'],
    })
    chatRoomIds: string[];

    @ApiProperty({
        description: 'Timestamp when the user was created',
        example: '2023-11-18T08:00:00Z',
    })
    createdAt: Date;
}
