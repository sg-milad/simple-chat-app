import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UserCreate } from './dto/user.create.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async createUser(userCreate: UserCreate): Promise<User> {
        const { username } = userCreate
        try {
            return await this.prisma.user.create({
                data: { username },
            });
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                throw new BadRequestException("user exist")
            }
            throw new InternalServerErrorException()
        }
    }

    async getUserById(userId: string): Promise<User> {
        return await this.prisma.user.findUnique({
            where: { id: userId },
        });
    }
}
