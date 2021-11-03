import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * App Controller
 */
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}
    /**
    * Root Endpoint /
    * @returns Hello World string
    */
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
