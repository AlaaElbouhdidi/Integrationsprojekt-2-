import { EventService } from '../service/event.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
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
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import * as admin from 'firebase-admin';
import { EventConstants } from '../constants/event.constants';
import { AppConstants } from '../../app/constants/app.constants';
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
     * @returns {Promise<Event>} Returns the created event
     * */
    @Post()
    @ApiOperation({ summary: 'Create a new event' })
    @ApiCreatedResponse({
        description: 'Event created',
        schema: EventConstants.CREATED,
    })
    @ApiBadRequestResponse({
        description: 'Invalid data sent',
        schema: EventConstants.BAD_REQUEST_CREATE,
    })
    @ApiInternalServerErrorResponse({
        description: 'Unexpected error',
        schema: AppConstants.INTERNAL_SERVER_ERROR,
    })
    async create(
        @User() user: admin.auth.DecodedIdToken,
        @Body() createEventDto: CreateEventDto
    ): Promise<Event> {
        return await this.eventService.create(user, createEventDto);
    }
    /**
     * The route handler that fetches all events
     * @returns {Promise<Event[]>} Returns all events
     * */
    @Get()
    @ApiOperation({ summary: 'Get all events' })
    @ApiOkResponse({
        description: 'Fetched all events',
        schema: EventConstants.OK_FIND_ALL,
    })
    @ApiInternalServerErrorResponse({
        description: 'Unexpected error',
        schema: AppConstants.INTERNAL_SERVER_ERROR,
    })
    async findAll(): Promise<Event[]> {
        return await this.eventService.findAll();
    }
    /**
     * The route handler that gets an event by id
     * @param {string} id The id of the event to find
     * @returns {Promise<Event>} Returns the requested event
     * */
    @Get(':id')
    @ApiOperation({ summary: 'Get an event by id' })
    @ApiOkResponse({ description: 'Event fetched', schema: EventConstants.OK_FIND_ONE})
    @ApiNotFoundResponse({
        description: 'Event not found',
        schema: EventConstants.NOT_FOUND,
    })
    @ApiInternalServerErrorResponse({
        description: 'Unexpected error',
        schema: AppConstants.INTERNAL_SERVER_ERROR,
    })
    async findOne(@Param('id') id: string): Promise<Event> {
        return await this.eventService.findOne(id);
    }
    /**
     * The route handler that updates an event by id
     * @param {string} id The id of the event to update
     * @returns {Promise<Event>} Returns the updated event
     * */
    @Patch(':id')
    @ApiOperation({ summary: 'Update an event by id' })
    @ApiOkResponse({ description: 'Event edited', schema: EventConstants.OK_UPDATE })
    @ApiBadRequestResponse({
        description: 'Invalid data sent',
        schema: EventConstants.BAD_REQUEST_UPDATE,
    })
    @ApiNotFoundResponse({
        description: 'Event not found',
        schema: EventConstants.NOT_FOUND,
    })
    @ApiInternalServerErrorResponse({
        description: 'Unexpected error',
        schema: AppConstants.INTERNAL_SERVER_ERROR,
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
     * @returns {Promise<Event>} Returns the deleted event
     * */
    @Delete(':id')
    @ApiOperation({ summary: 'Delete an event by id' })
    @ApiOkResponse({ description: 'Event deleted', schema: EventConstants.OK_DELETE })
    @ApiNotFoundResponse({
        description: 'Event not found',
        schema: EventConstants.NOT_FOUND,
    })
    @ApiInternalServerErrorResponse({
        description: 'Unexpected error',
        schema: AppConstants.INTERNAL_SERVER_ERROR,
    })
    async remove(@Param('id') id: string): Promise<Event> {
        return await this.eventService.remove(id);
    }
}
