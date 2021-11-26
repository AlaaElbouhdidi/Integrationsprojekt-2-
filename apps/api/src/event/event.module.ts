import { Module } from '@nestjs/common';
import { EventService } from './service/event.service';
import { EventController } from './controller/event.controller';

@Module({
    controllers: [EventController],
    providers: [EventService],
})
export class EventModule {}
