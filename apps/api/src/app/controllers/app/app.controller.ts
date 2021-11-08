import { Controller, Get, UseGuards } from '@nestjs/common';
import { Message } from '@integrationsprojekt2/api-interfaces';
import { FirebaseAuthGuard } from '../../guards/firebase-auth.guard';
import { AppService } from '../../services/app/app.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
    ) {}

    @Get()
    getData(): Message {
        return this.appService.getData();
    }

    @Get('ping')
    async ping(): Promise<string> {
        return 'pong';
    }

    @UseGuards(FirebaseAuthGuard)
    @Get('pong')
    async securePing(): Promise<string> {
        return 'pong';
    }
}
