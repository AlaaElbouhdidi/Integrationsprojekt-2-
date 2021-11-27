import { EventService } from '../service/event.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { Public } from '../../decorators/public.decorator';
import { User } from '../../decorators/user.decorator';
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
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import * as admin from 'firebase-admin';
import { EventConstants } from '../constants/event.constants';
/**
 * The EventController
 **/
@ApiBearerAuth()
@ApiTags('Event')
@Controller('event')
export class EventController {
    /**
     * The constructor that injects the EventService in the EventController
     * @param {EventService} eventService The injected EventService
     **/
    constructor(private readonly eventService: EventService) {}
    /**
     * The route handler to create an event
     * @param {admin.auth.DecodedIdToken} user The currently logged in user
     * @param {CreateEventDto} createEventDto The DTO that the route handler forwards to the EventService
     * @returns {Event} Returns the created event
     * */
    @Post()
    @ApiOperation({ summary: 'Create a new event' })
    @ApiCreatedResponse({ description: 'Event created', type: Event })
    @ApiBadRequestResponse({
        description: 'Invalid data sent',
        schema: EventConstants.BAD_REQUEST,
    })
    async create(
        @User() user: admin.auth.DecodedIdToken,
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
    @ApiOperation({ summary: 'Get all events' })
    @ApiOkResponse({
        description: 'Fetched all events',
        type: [Event],
        isArray: true,
    })
    async findAll(): Promise<Event[]> {
        return await this.eventService.findAll();
    }
    /**
     * The route handler that gets an event by id
     * @param {string} id The id of the event to find
     * @returns {Event} Returns the requested event
     * */
    @Get(':id')
    @ApiOperation({ summary: 'Get an event by id' })
    @ApiOkResponse({ description: 'Event fetched', type: Event })
    @ApiNotFoundResponse({
        description: 'Event not found',
        schema: EventConstants.NOT_FOUND,
    })
    async findOne(@Param('id') id: string): Promise<Event> {
        return await this.eventService.findOne(id);
    }
    /**
     * The route handler that updates an event by id
     * @param {string} id The id of the event to update
     * @returns {Event} Returns the updated event
     * */
    @Patch(':id')
    @ApiOperation({ summary: 'Update an event by id' })
    @ApiOkResponse({ description: 'Event edited', type: Event })
    @ApiBadRequestResponse({
        description: 'Invalid data sent',
        schema: EventConstants.BAD_REQUEST,
    })
    @ApiNotFoundResponse({
        description: 'Event not found',
        schema: EventConstants.NOT_FOUND,
    })
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
    @ApiOperation({ summary: 'Delete an event by id' })
    @ApiOkResponse({ description: 'Event deleted', type: Event })
    @ApiNotFoundResponse({
        description: 'User not found',
        schema: EventConstants.NOT_FOUND,
    })
    async remove(@Param('id') id: string): Promise<Event> {
        return await this.eventService.remove(id);
    }
}
