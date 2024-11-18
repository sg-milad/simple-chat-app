import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiParam, ApiOkResponse } from '@nestjs/swagger';
import { UserResponseDto as UserDtoResponse } from './dto/user.response.dto';
import { UserCreate } from './dto/user.create.dto';
import { ValidateMongoIdPipe } from '../shared/helper/validate-mongo-id';

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiOkResponse({
        description: 'The user has been successfully created.',
        type: UserDtoResponse,
    })
    async createUser(@Body() userCreate: UserCreate) {
        return await this.userService.createUser(userCreate);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a user by ID' })
    @ApiParam({ name: 'id', type: String, description: 'The unique ID of the user' })
    @ApiOkResponse({
        description: 'The user details.',
        type: UserDtoResponse,
    })
    async getUserById(@Param('id', ValidateMongoIdPipe) id: string) {
        return await this.userService.getUserById(id);
    }
}
