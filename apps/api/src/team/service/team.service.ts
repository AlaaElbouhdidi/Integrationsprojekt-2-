import {
    Injectable,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import { FirebaseService } from '../../firebase/service/firebase.service';
import { CreateTeamDto } from '../dto/create-team.dto';
import { UpdateTeamDto } from '../dto/update-team.dto';
import * as admin from 'firebase-admin';
// import { Team } from '@api-interfaces';
/**
 * The TeamService
 * */
@Injectable()
export class TeamService {
    /**
     * The constructor of the TeamService
     * @param {FirebaseService} firebaseService The injected FirebaseService to use in the TeamService
     * */
    constructor(private readonly firebaseService: FirebaseService) {}
    /**
     * The TeamService Logger
     * */
    private readonly logger: Logger = new Logger('TeamService');
    /**
     * The reference to the teams collection in firestore
     * */
    private readonly teamsRef = this.firebaseService
        .getFirestore()
        .collection('teams');
    /**
     * The method to create a group
     * @param {admin.auth.DecodedIdToken} user The logged in user
     * @param {CreateTeamDto} createTeamDto The DTO to create a team
     * @returns {Promise<Team>} The inserted team document from firestore
     * */
    async create(
        user: admin.auth.DecodedIdToken,
        createTeamDto: CreateTeamDto
    ) /*: Promise<Team>*/ {
        try {
            this.logger.log(user, createTeamDto);
            await this.teamsRef.add(createTeamDto);
            return await 'This action adds a new team';
        } catch (e) {
            this.logger.error(`Unexpected server error. Failed to create team`);
            throw new InternalServerErrorException(
                `Unexpected server error. Failed to create team`
            );
        }
    }
    /**
     * The method that finds all teams
     * @returns {Promise<Team[]>} The teams of firestore
     * */
    async findAll() /*: Promise<Team[]>*/ {
        try {
            return await `This action returns all teams`;
        } catch (e) {
            this.logger.error(
                `Unexpected server error. Failed to find all teams`
            );
            throw new InternalServerErrorException(
                `Unexpected server error. Failed to find all teams`
            );
        }
    }
    /**
     * Method that finds a team by id
     * @param {string} id The id of the team
     * @returns {Promise<Team>} Returns the team
     * */
    async findOne(id: string) /*: Promise<Team>*/ {
        try {
            return await `This action returns a #${id} group`;
        } catch (e) {
            this.logger.error(
                `Unexpected server error. Failed to find team with id ${id}`
            );
            throw new InternalServerErrorException(
                `Unexpected server error. Failed to find team with id ${id}`
            );
        }
    }
    /**
     * The method to update a team
     * @param {string} id The id of the team to update
     * @param {UpdateTeamDto} updateTeamDto The DTO to update a team
     * @returns {Promise<Team>} The updated team document from firestore
     * */
    async update(id: string, updateTeamDto: UpdateTeamDto) /*: Promise<Team>*/ {
        try {
            this.logger.log(updateTeamDto);
            return await `This action updates a #${id} group`;
        } catch (e) {
            this.logger.error(
                `Unexpected server error. Failed to update team with id ${id}`
            );
            throw new InternalServerErrorException(
                `Unexpected server error. Failed to update team with id ${id}`
            );
        }
    }
    /**
     * The method to delete a team
     * @param {string} id The id of the team to delete
     * @returns {Promise<Team>} The deleted team document from firestore
     * */
    async remove(id: string) /*: Promise<Team>*/ {
        try {
            return await `This action removes the group with id ${id}`;
        } catch (e) {
            this.logger.error(
                `Unexpected server error. Failed to delete team with id ${id}`
            );
            throw new InternalServerErrorException(
                `Unexpected server error. Failed to delete team with id ${id}`
            );
        }
    }
}
