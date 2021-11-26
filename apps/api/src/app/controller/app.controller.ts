import { Controller, Get } from '@nestjs/common';
import { Message } from '@api-interfaces';
import { AppService } from '../service/app.service';
import { Public } from '../../decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}
    @Public()
    @Get()
    getData(): Message {
        return this.appService.getData();
    }
}
