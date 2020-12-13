import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(@Inject(User) private userModel: typeof User) {}

    async findById(id: number) {
        return this.userModel.query().findById(id);
    }

    async findAll() {
        return this.userModel.query();
    }
}
