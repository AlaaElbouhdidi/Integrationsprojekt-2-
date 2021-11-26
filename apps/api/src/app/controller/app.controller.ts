import { Controller, Get } from '@nestjs/common';
import { Message } from '@api-interfaces';
import { AppService } from '../service/app.service';
import { Public } from '../../decorators/public.decorator';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Public()
    @Get()
    getData(): Message {
        return this.appService.getData();
    }

    @Get('ping')
    async ping(): Promise<string> {
        return 'pong';
    }

    @Get('pong')
    async securePing(): Promise<string> {
        return 'pong';
    }
}
