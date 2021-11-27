import { Controller, Get } from '@nestjs/common';
import { Message } from '@api-interfaces';
import { AppService } from '../service/app.service';
import { Public } from '../../decorators/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
/**
 * The AppController
 **/
@ApiTags('App')
@Controller()
export class AppController {
    /**
     * The constructor that injects the EventService in the AppController
     * @param {AppService} appService The injected AppService
     **/
    constructor(private readonly appService: AppService) {}
    /**
     * The route handler that welcomes to the API
     * @returns {Message} Returns a welcome message
     * */
    @Public()
    @Get()
    @ApiOperation({ summary: 'API entry point' })
    getData(): Message {
        return this.appService.getData();
    }
}
