import { EventService } from '../service/event.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { Public } from '../../decorators/public.decorator';
import { User } from '../../decorators/user.decorator';
import { DecodedIdToken } from 'firebase-admin/auth';
import { Event } from '@api-interfaces';
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';

/**
 * The Vehicle Controller
 **/
@Controller('event')
export class EventController {
    /**
     * The constructor that injects the EventService in the EventController
     * @param {EventService} eventService The injected EventService
     **/
    constructor(private readonly eventService: EventService) {}
    /**
     * The route handler to create an event
     * @param {DecodedIdToken} user The currently logged in user
     * @param {CreateEventDto} createEventDto The DTO that the route handler forwards to the EventService
     * @returns {Event} Returns the created event
     * */
    @Post()
    async create(
        @User() user: DecodedIdToken,
        @Body() createEventDto: CreateEventDto
    ): Promise<Event> {
        return await this.eventService.create(user, createEventDto);
    }
    /**
     * The route handler that fetches all events
     * @returns {Event[]} Returns all events
     * */
    @Public()
    @Get()
    async findAll(): Promise<Event[]> {
        return await this.eventService.findAll();
    }
    /**
     * The route handler that gets an event by id
     * @param {string} id The id of the event to find
     * @returns {Event} Returns the requested event
     * */
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Event> {
        return await this.eventService.findOne(id);
    }
    /**
     * The route handler that updates an event by id
     * @param {string} id The id of the event to update
     * @returns {Event} Returns the updated event
     * */
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateEventDto: UpdateEventDto
    ): Promise<Event> {
        return await this.eventService.update(id, updateEventDto);
    }
    /**
     * The route handler that deletes an event by id
     * @param {string} id The id of the event to delete
     * @returns {Event} Returns the deleted event
     * */
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Event> {
        return await this.eventService.remove(id);
    }
}
