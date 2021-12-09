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
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { GroupService } from '../service/group.service';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { Group } from '@api-interfaces';
import { User } from '../../decorators/user.decorator';
import * as admin from 'firebase-admin';
import { AppConstants } from '../../app/constants/app.constants';
import { GroupConstants } from '../constants/group.constants';
import { GroupOwner } from '../decorator/group.owner.decorator';
/**
 * The GroupController
 **/
@ApiBearerAuth()
@ApiTags('Group')
@Controller('group')
export class GroupController {
    /**
     * The constructor that injects the GroupService in the GroupController
     * @param {GroupService} groupService The injected GroupService
     **/
    constructor(private readonly groupService: GroupService) {}
    /**
     * The route handler to create a group
     * @param {admin.auth.DecodedIdToken} user The currently logged in user
     * @param {CreateGroupDto} createGroupDto The DTO that the route handler forwards to the GroupService
     * @returns {Promise<Group>} Returns the created group
     * */
    @Post()
    @ApiOperation({ summary: 'Create a new group' })
    @ApiCreatedResponse({
        description: 'Group created',
        type: CreateGroupDto,
    })
    @ApiBadRequestResponse({
        description: 'Invalid data sent',
        schema: GroupConstants.BAD_REQUEST,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        schema: AppConstants.UNAUTHORIZED,
    })
    @ApiInternalServerErrorResponse({
        description: 'Unexpected error',
        schema: AppConstants.INTERNAL_SERVER_ERROR,
    })
    async create(
        @User() user: admin.auth.DecodedIdToken,
        @Body() createGroupDto: CreateGroupDto
    ): Promise<Group> {
        return await this.groupService.create(user, createGroupDto);
    }
    /**
     * The route handler that fetches all groups
     * @returns {Promise<Group[]>} Returns all groups
     * */
    @Get()
    @ApiOperation({ summary: 'Get all groups' })
    @ApiOkResponse({
        description: 'Fetched all groups',
        type: [CreateGroupDto],
    })
    @ApiNotFoundResponse({
        description: 'No groups found',
        schema: GroupConstants.NONE_FOUND,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        schema: AppConstants.UNAUTHORIZED,
    })
    @ApiInternalServerErrorResponse({
        description: 'Unexpected error',
        schema: AppConstants.INTERNAL_SERVER_ERROR,
    })
    async findAll(): Promise<Group[]> {
        return await this.groupService.findAll();
    }
    /**
     * The route handler that gets a group by id
     * @param {string} id The id of the group to find
     * @returns {Promise<Group>} Returns the requested group
     * */
    @Get(':id')
    @ApiOperation({ summary: 'Get a group by id' })
    @ApiOkResponse({
        description: 'Group fetched',
        type: CreateGroupDto,
    })
    @ApiNotFoundResponse({
        description: 'Group not found',
        schema: GroupConstants.NOT_FOUND,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        schema: AppConstants.UNAUTHORIZED,
    })
    @ApiInternalServerErrorResponse({
        description: 'Unexpected error',
        schema: AppConstants.INTERNAL_SERVER_ERROR,
    })
    async findOne(@Param('id') id: string): Promise<Group> {
        return await this.groupService.findOne(id);
    }
    /**
     * The route handler that updates a group by id
     * @param {string} id The id of the group to update
     * @returns {Promise<Group>} Returns the updated group
     * */
    @GroupOwner()
    @Patch(':id')
    @ApiOperation({ summary: 'Update a group by id' })
    @ApiOkResponse({
        description: 'Group edited',
        type: CreateGroupDto,
    })
    @ApiBadRequestResponse({
        description: 'Invalid data sent',
        schema: GroupConstants.BAD_REQUEST,
    })
    @ApiNotFoundResponse({
        description: 'Group not found',
        schema: GroupConstants.NOT_FOUND,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        schema: AppConstants.UNAUTHORIZED,
    })
    @ApiInternalServerErrorResponse({
        description: 'Unexpected error',
        schema: AppConstants.INTERNAL_SERVER_ERROR,
    })
    async update(
        @Param('id') id: string,
        @Body() updateGroupDto: UpdateGroupDto
    ): Promise<Group> {
        return await this.groupService.update(id, updateGroupDto);
    }
    /**
     * The route handler that deletes a group by id
     * @param {string} id The id of the group to delete
     * @returns {Promise<Group>} Returns the deleted group
     * */
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a group by id' })
    @ApiOkResponse({
        description: 'Group deleted',
        type: UpdateGroupDto,
    })
    @ApiNotFoundResponse({
        description: 'Group not found',
        schema: GroupConstants.NOT_FOUND,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        schema: AppConstants.UNAUTHORIZED,
    })
    @ApiInternalServerErrorResponse({
        description: 'Unexpected error',
        schema: AppConstants.INTERNAL_SERVER_ERROR,
    })
    async remove(@Param('id') id: string): Promise<Group> {
        return await this.groupService.remove(id);
    }
}
