import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException
} from '@nestjs/common';
import { FirebaseService } from '../../firebase/service/firebase.service';
import { CreateGameDto } from '../dto/create-game.dto';
import { UpdateGameDto } from '../dto/update-game.dto';
import { Game } from '@api-interfaces';
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
     * @param {CreateGameDto} createGameDto The DTO to create a game
     * @returns {Promise<Game>} The inserted game document from firestore
     * */
    async create(createGameDto: CreateGameDto): Promise<Game> {
        try {
            const {
                groupId,
                activity,
                firstTeamId,
                firstTeamScore,
                secondTeamId,
                secondTeamScore,
                date
            } = createGameDto;
            const data = {
                groupId,
                activity,
                firstTeamId,
                firstTeamScore,
                secondTeamId,
                secondTeamScore,
                date
            };
            const game = await (await this.gamesRef.add(data)).get();
            this.logger.log(`Successfully created game with id ${game.id}`);
            const gameData: Game = this.getGame(game);
            this.logger.log(gameData);
            return gameData;
        } catch (e) {
            this.logger.error(`Failed creating game`);
            throw new InternalServerErrorException(
                `Failed to create game, check the DTO that was sent over the network.`
            );
        }
    }
    /**
     * The method that finds all games
     * @returns {Promise<Game[]>} The games of firestore
     * */
    async findAll(): Promise<Game[]> {
        try {
            return Promise.resolve()
                .then(async () => {
                    const groups = await this.gamesRef.get();
                    if (groups) {
                        return groups;
                    }
                })
                .then((snapshot) => {
                    const games: Game[] = [];
                    if (!snapshot.docs.length) {
                        const message = 'No games found';
                        this.logger.error(message);
                        throw new NotFoundException(message);
                    }
                    snapshot.forEach((game) => {
                        const gameData: Game = this.getGame(game);
                        this.logger.log(`Successfully fetched event`);
                        this.logger.log(gameData);
                        games.push(gameData);
                    });
                    return games;
                });
        } catch (e) {
            this.logger.error(`Failed to fetch all games`);
            throw new InternalServerErrorException(`Failed to fetch all games`);
        }
    }
    /**
     * Method that finds a game by id
     * @param {string} id The id of the game
     * @returns {Promise<Game>} Returns the game
     * */
    async findOne(id: string): Promise<Game> {
        try {
            return Promise.resolve()
                .then(async () => await this.checkGameRefExists(id))
                .then((game) => {
                    this.checkGameExists(id, game);
                    const gameData: Game = this.getGame(game);
                    this.logger.log(`Successfully fetched event with id ${id}`);
                    this.logger.log(gameData);
                    return gameData;
                });
        } catch (e) {
            this.logger.error(`Failed to fetch game with id ${id}`);
            throw new InternalServerErrorException(
                `Failed to fetch game with id ${id}`
            );
        }
    }
    /**
     * The method to update a game
     * @param {string} id The id of the game to update
     * @param {UpdateGameDto} UpdateGameDto The DTO to update a game
     * @returns {Promise<Game>} The updated game document from firestore
     * */
    async update(id: string, updateGameDto: UpdateGameDto): Promise<Game> {
        try {
            return Promise.resolve()
                .then(async () => await this.checkGameRefExists(id))
                .then(async (oldGame) => {
                    this.checkGameExists(id, oldGame);
                    await this.gamesRef.doc(id).update({
                        groupId: updateGameDto.groupId,
                        activity: updateGameDto.activity,
                        firstTeamId: updateGameDto.firstTeamId,
                        firstTeamScore: updateGameDto.firstTeamScore,
                        secondTeam: updateGameDto.secondTeamId,
                        secondTeamScore: updateGameDto.secondTeamScore,
                        date: updateGameDto.date
                    });
                    const game = await this.gamesRef.doc(id).get();
                    const gameData: Game = this.getGame(game);
                    this.logger.log(`Successfully updated game with id ${id}`);
                    this.logger.log(gameData);
                    return gameData;
                });
        } catch (e) {
            this.logger.error(`Failed to update game with id ${id}`);
            throw new InternalServerErrorException(
                `Failed to update game with id ${id}`
            );
        }
    }
    /**
     * The method to delete a game
     * @param {string} id The id of the game to delete
     * @returns {Promise<Game>} The deleted game document from firestore
     * */
    async remove(id: string): Promise<Game> {
        try {
            return Promise.resolve()
                .then(async () => await this.checkGameRefExists(id))
                .then(async (game) => {
                    this.checkGameExists(id, game);
                    const gameData: Game = this.getGame(game);
                    await this.gamesRef.doc(id).delete();
                    this.logger.log(`Successfully deleted game with id ${id}`);
                    this.logger.log(gameData);
                    return gameData;
                });
        } catch (e) {
            this.logger.error(`Failed to delete game with id ${id}`);
            throw new InternalServerErrorException(
                `Failed to delete game with id ${id}`
            );
        }
    }
    /**
     * The method to build the game object from firestore
     * @param {FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>} game The game document
     * @returns {Game} The game data
     * */
    getGame(
        game: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
    ): Game {
        return {
            id: game.id,
            groupId: game.get('groupId'),
            activity: game.get('activity'),
            firstTeamId: game.get('firstTeamId'),
            firstTeamScore: game.get('firstTeamScore'),
            secondTeamId: game.get('secondTeamId'),
            secondTeamScore: game.get('secondTeamScore'),
            date: game.get('date')
        };
    }
    /**
     * The method to check whether a game document exists
     * @param {string} id The id of the game to check for existence
     * @param {FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>} game The game document
     * */
    checkGameExists(
        id: string,
        game: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
    ) {
        if (!game.exists) {
            const message = `No game with id ${id} found`;
            this.logger.error(message);
            throw new NotFoundException(message);
        }
    }
    /**
     * The method to check whether a game reference exists
     * @param {string} id The id of the game to check for existence
     * @returns {Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>>} The game reference
     * */
    async checkGameRefExists(
        id: string
    ): Promise<
        FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
    > {
        const game = await this.gamesRef.doc(id).get();
        if (game) {
            return game;
        }
    }
}
