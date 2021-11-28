import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { GameService } from '../service/game.service';
import { CreateGameDto } from '../dto/create-game.dto';
import { UpdateGameDto } from '../dto/update-game.dto';
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

import { GameConstants } from '../constants/game.constants';
import { AppConstants } from '../../app/constants/app.constants';
import { Game } from '@api-interfaces';
/**
 * The GameController
 * */
@ApiBearerAuth()
@ApiTags('Game')
@Controller('game')
export class GameController {
    /**
     * The constructor that injects the GameService in the GameController
     * @param {GameService} gameService The injected GameService
     **/
    constructor(private readonly gameService: GameService) {}
    /**
     * The route handler to create a game
     * @param {CreateGameDto} createGameDto The DTO that the route handler forwards to the GameService
     * @returns {Promise<Game>} Returns the created game
     * */
    @Post()
    @ApiOperation({ summary: 'Create a new game' })
    @ApiCreatedResponse({
        description: 'Game created',
        type: CreateGameDto,
    })
    @ApiBadRequestResponse({
        description: 'Invalid data sent',
        schema: GameConstants.BAD_REQUEST,
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
        @Body() createGameDto: CreateGameDto
    ): Promise<Game> {
        return await this.gameService.create(createGameDto);
    }
    /**
     * The route handler that fetches all games
     * @returns {Promise<Game[]>} Returns all games
     * */
    @Get()
    @ApiOperation({ summary: 'Get all games' })
    @ApiOkResponse({
        description: 'Fetched all games',
        type: [CreateGameDto],
    })
    @ApiNotFoundResponse({
        description: 'No games found',
        schema: GameConstants.NONE_FOUND,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        schema: AppConstants.UNAUTHORIZED,
    })
    @ApiInternalServerErrorResponse({
        description: 'Unexpected error',
        schema: AppConstants.INTERNAL_SERVER_ERROR,
    })
    async findAll(): Promise<Game[]> {
        return await this.gameService.findAll();
    }
    /**
     * The route handler that gets a game by id
     * @param {string} id The id of the game to find
     * @returns {Promise<Game>} Returns the requested game
     * */
    @Get(':id')
    @ApiOperation({ summary: 'Get a game by id' })
    @ApiOkResponse({
        description: 'Game fetched',
        type: UpdateGameDto,
    })
    @ApiNotFoundResponse({
        description: 'Game not found',
        schema: GameConstants.NOT_FOUND,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        schema: AppConstants.UNAUTHORIZED,
    })
    @ApiInternalServerErrorResponse({
        description: 'Unexpected error',
        schema: AppConstants.INTERNAL_SERVER_ERROR,
    })
    async findOne(@Param('id') id: string): Promise<Game> {
        return await this.gameService.findOne(id);
    }
    /**
     * The route handler that updates a game by id
     * @param {string} id The id of the game to update
     * @returns {Promise<Game>} Returns the updated game
     * */
    @Patch(':id')
    @ApiOperation({ summary: 'Update a game by id' })
    @ApiOkResponse({
        description: 'Game edited',
        type: UpdateGameDto,
    })
    @ApiBadRequestResponse({
        description: 'Invalid data sent',
        schema: GameConstants.BAD_REQUEST,
    })
    @ApiNotFoundResponse({
        description: 'Game not found',
        schema: GameConstants.NOT_FOUND,
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
        @Body() updateGameDto: UpdateGameDto
    ): Promise<Game> {
        return await this.gameService.update(id, updateGameDto);
    }
    /**
     * The route handler that deletes a game by id
     * @param {string} id The id of the game to delete
     * @returns {Promise<Game>} Returns the deleted game
     * */
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a game by id' })
    @ApiOkResponse({
        description: 'Game deleted',
        type: UpdateGameDto,
    })
    @ApiNotFoundResponse({
        description: 'Game not found',
        schema: GameConstants.NOT_FOUND,
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        schema: AppConstants.UNAUTHORIZED,
    })
    @ApiInternalServerErrorResponse({
        description: 'Unexpected error',
        schema: AppConstants.INTERNAL_SERVER_ERROR,
    })
    async remove(@Param('id') id: string): Promise<Game> {
        return await this.gameService.remove(id);
    }
}
