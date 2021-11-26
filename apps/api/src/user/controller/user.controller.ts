import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { FirebaseAuthGuard } from '../../firebase/firebase-auth.guard';
import * as firebase from 'firebase-admin';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(FirebaseAuthGuard)
    @Get()
    async getUsers(): Promise<firebase.auth.ListUsersResult> {
        return this.userService.getUsers();
    }
}
