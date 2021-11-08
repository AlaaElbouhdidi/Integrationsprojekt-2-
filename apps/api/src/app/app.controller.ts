import { Controller, Get } from '@nestjs/common';
import { Message } from '@integrationsprojekt2/api-interfaces';
import { AppService } from './app.service';
import { FirebaseService } from './firebase/firebase.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly firebaseService: FirebaseService
    ) {}

    @Get()
    getData(): Message {
        return this.appService.getData();
    }

    @Get('users')
    async getUsers() {
        return this.firebaseService.getUsers();
    }

    @Get('ping')
    async ping(): Promise<string> {
        return 'pong';
    }

    @Get('secure/ping')
    async securePing(): Promise<string> {
        return 'pong';
    }
}
