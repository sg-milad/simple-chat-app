import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class UserCreate {
    @ApiProperty({ type: String })
    @IsString()
    @Length(3, 50)
    username: string
}