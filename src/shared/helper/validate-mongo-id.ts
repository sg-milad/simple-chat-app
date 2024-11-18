import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateMongoIdPipe implements PipeTransform {
    transform(value: any) {
        const isValidObjectId = /^[a-f\d]{24}$/i.test(value);
        if (!isValidObjectId) {
            throw new BadRequestException(`Invalid MongoDB ObjectId: ${value}`);
        }
        return value;
    }
}
