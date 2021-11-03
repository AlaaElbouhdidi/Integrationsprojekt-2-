import { Injectable } from '@nestjs/common';

/**
 * App Service
 */
@Injectable()
export class AppService {
    /**
     * Function that returns Hello World
     * @returns Hello World string
     */
    getHello(): string {
        return 'Hello World!';
    }
}
