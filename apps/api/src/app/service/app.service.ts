import { Injectable } from '@nestjs/common';
import { Message } from '@api-interfaces';
/**
 * The AppService
 **/
@Injectable()
export class AppService {
    /**
     * The method that returns a welcome message
     * @returns {Message} Returns a welcome message
     * */
    getData(): Message {
        return { message: 'Welcome to api!' };
    }
}
