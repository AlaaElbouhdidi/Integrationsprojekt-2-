import {
    Injectable,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import { FirebaseService } from '../../firebase/service/firebase.service';
import { CreateGameDto } from '../dto/create-game.dto';
import { UpdateGameDto } from '../dto/update-game.dto';
import * as admin from 'firebase-admin';
/**
 * The GameService
 * */
@Injectable()
export class GameService {
    /**
     * The constructor of the gameService
     * @param {FirebaseService} firebaseService The injected FirebaseService to use in the GameService
     * */
    constructor(private readonly firebaseService: FirebaseService) {}
    /**
     * The EventService Logger
     * */
    private readonly logger: Logger = new Logger('GameService');
    /**
     * The reference to the games collection in firestore
     * */
    private readonly gamesRef = this.firebaseService
        .getFirestore()
        .collection('games');

    /**
     * The method to create a game
     * @param {admin.auth.DecodedIdToken} user The logged in user
     * @param {CreateGameDto} createGameDto The DTO to create a game
     * @returns The inserted game document from firestore
     * */
    async create(
        user: admin.auth.DecodedIdToken,
        createGameDto: CreateGameDto
    ) {
        try {
            this.logger.log(user, createGameDto);
            await this.gamesRef.add(createGameDto);
            return `This action creates a game`;
        } catch (e) {
            this.logger.error(`Failed creating game`);
            throw new InternalServerErrorException(
                `Failed to create game, check the DTO that was sent over the network.`
            );
        }
    }
    /**
     * The method that finds all games
     * @returns The games of firestore
     * */
    async findAll() {
        try {
            return `This action returns all games`;
        } catch (e) {
            this.logger.error(`Failed to fetch all games`);
            throw new InternalServerErrorException(`Failed to fetch all games`);
        }
    }
    /**
     * Method that finds a game by id
     * @param {string} id The id of the game
     * @returns Returns the game
     * */
    async findOne(id: string) {
        try {
            return `This action returns a game with id ${id}`;
        } catch (e) {
            this.logger.error(`Failed to fetch game with id ${id}`);
            throw new InternalServerErrorException(`Failed to fetch game with id ${id}`);
        }
    }
    /**
     * The method to update a game
     * @param {CreateGameDto} createGameDto The DTO to update a game
     * @returns The updated game document from firestore
     * */
    async update(id: string, updateGameDto: UpdateGameDto) {
        try {
            this.logger.log(updateGameDto);
            return `This action updates a game with id ${id}`;
        } catch (e) {
            this.logger.error(`Failed to update game with id ${id}`);
            throw new InternalServerErrorException(`Failed to update game with id ${id}`);
        }
    }
    /**
     * The method to delete a game
     * @param {CreateGameDto} createGameDto The DTO to delete a game
     * @returns The deleted game document from firestore
     * */
    async remove(id: string) {
        try {
            return `This action removes a #${id} game`;
        } catch (e) {
            this.logger.error(`Failed to delete game with id ${id}`);
            throw new InternalServerErrorException(`Failed to delete game with id ${id}`);
        }
    }
}
