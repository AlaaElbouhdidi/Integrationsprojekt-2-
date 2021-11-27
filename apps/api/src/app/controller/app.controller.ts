import { Controller, Get } from '@nestjs/common';
import { Message } from '@api-interfaces';
import { AppService } from '../service/app.service';
import { Public } from '../../decorators/public.decorator';
import {
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { AppConstants } from '../constants/app.constants';
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
    @ApiOkResponse({
        description: 'Welcomed to the API',
        schema: AppConstants.OK,
    })
    @ApiInternalServerErrorResponse({
        description: 'Unexpected error',
        schema: AppConstants.INTERNAL_SERVER_ERROR,
    })
    getData(): Message {
        return this.appService.getData();
    }
}
