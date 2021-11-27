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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../../decorators/user.decorator';
import * as admin from 'firebase-admin';
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
     * @param {admin.auth.DecodedIdToken} user The currently logged in user
     * @param {CreateGameDto} createGameDto The DTO that the route handler forwards to the GameService
     * @returns Returns the created game
     * */
    @Post()
    async create(
        @User() user: admin.auth.DecodedIdToken,
        @Body() createGameDto: CreateGameDto
    ) {
        return await this.gameService.create(user, createGameDto);
    }
    /**
     * The route handler that fetches all games
     * @returns  Returns all games
     * */
    @Get()
    async findAll() {
        return await this.gameService.findAll();
    }
    /**
     * The route handler that gets a game by id
     * @param {string} id The id of the game to find
     * @returns Returns the requested game
     * */
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.gameService.findOne(id);
    }
    /**
     * The route handler that updates a game by id
     * @param {string} id The id of the game to update
     * @returns Returns the updated game
     * */
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateGameDto: UpdateGameDto
    ) {
        return await this.gameService.update(id, updateGameDto);
    }
    /**
     * The route handler that deletes a game by id
     * @param {string} id The id of the game to delete
     * @returns Returns the deleted game
     * */
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.gameService.remove(id);
    }
}
