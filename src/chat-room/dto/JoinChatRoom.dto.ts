import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class JoinChatRoomDto {
    @ApiProperty({
        description: 'The ID of the user joining the chat room',
        type: String,
    })
    @IsMongoId({ message: 'userId must be a valid MongoDB ObjectId' })
    userId: string;
}
