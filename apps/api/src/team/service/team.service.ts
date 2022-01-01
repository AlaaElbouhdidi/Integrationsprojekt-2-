import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException
} from '@nestjs/common';
import { FirebaseService } from '../../firebase/service/firebase.service';
import { CreateTeamDto } from '../dto/create-team.dto';
import { UpdateTeamDto } from '../dto/update-team.dto';
import { Team } from '@api-interfaces';
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
     * @param {CreateTeamDto} createTeamDto The DTO to create a team
     * @returns {Promise<Team>} The inserted team document from firestore
     * */
    async create(createTeamDto: CreateTeamDto): Promise<Team> {
        try {
            const { groupId, member } = createTeamDto;
            const [{ uid, isAdmin }] = member;
            this.logger.debug({ createTeamDto });
            const team = await (
                await this.teamsRef.add({
                    groupId: groupId,
                    member: {
                        uid: uid,
                        isAdmin: isAdmin
                    }
                })
            ).get();
            this.logger.log(`Successfully created team with id ${team.id}`);
            const teamData: Team = {
                id: team.id,
                name: team.get('name'),
                participants: team.get('participants')
            };
            return teamData;
        } catch (e) {
            this.logger.error(
                `Unexpected server error. Failed to create team. Error: ${e.message}`
            );
            throw new InternalServerErrorException(
                `Unexpected server error. Failed to create team. Error: ${e.message}`
            );
        }
    }
    /**
     * The method that finds all teams
     * @returns {Promise<Team[]>} The teams of firestore
     * */
    async findAll(): Promise<Team[]> {
        try {
            return Promise.resolve()
                .then(async () => {
                    const teams = await this.teamsRef.get();
                    if (teams) {
                        return teams;
                    }
                })
                .then((snapshot) => {
                    const teams: Team[] = [];
                    if (!snapshot.docs.length) {
                        const message = 'No teams found';
                        this.logger.error(message);
                        throw new NotFoundException(message);
                    }
                    snapshot.forEach((team) => {
                        const teamData: Team = {
                            id: team.id,
                            name: team.get('name'),
                            participants: team.get('participants')
                        };
                        this.logger.log(teamData);
                        teams.push(teamData);
                    });
                    return teams;
                });
        } catch (e) {
            this.logger.error(
                `Unexpected server error. Failed to find all teams. Error: ${e.message}`
            );
            throw new InternalServerErrorException(
                `Unexpected server error. Failed to find all teams. Error: ${e.message}`
            );
        }
    }
    /**
     * Method that finds a team by id
     * @param {string} id The id of the team
     * @returns {Promise<Team>} Returns the team
     * */
    async findOne(id: string): Promise<Team> {
        try {
            return Promise.resolve()
                .then(async () => {
                    const team = await this.teamsRef.doc(id).get();
                    if (team) {
                        return team;
                    }
                })
                .then((team) => {
                    if (!team.exists) {
                        const message = `No team with id ${id} found`;
                        this.logger.error(message);
                        throw new NotFoundException(message);
                    }
                    const teamData: Team = {
                        id: team.id,
                        name: team.get('name'),
                        participants: team.get('participants')
                    };
                    this.logger.log(`Successfully fetched team with id ${id}`);
                    this.logger.log(teamData);
                    return teamData;
                });
        } catch (e) {
            this.logger.error(
                `Unexpected server error. Failed to find team with id ${id}. Error: ${e.message}`
            );
            throw new InternalServerErrorException(
                `Unexpected server error. Failed to find team with id ${id}. Error: ${e.message}`
            );
        }
    }
    /**
     * The method to update a team
     * @param {string} id The id of the team to update
     * @param {UpdateTeamDto} updateTeamDto The DTO to update a team
     * @returns {Promise<Team>} The updated team document from firestore
     * */
    async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
        try {
            return Promise.resolve()
                .then(async () => {
                    const team = await this.teamsRef.doc(id).get();
                    if (team) {
                        return team;
                    }
                })
                .then(async (oldTeam) => {
                    if (!oldTeam.exists) {
                        const message = `No group team id ${id} found`;
                        this.logger.error(message);
                        throw new NotFoundException(message);
                    }
                    const { groupId, member } = updateTeamDto;
                    const [{ uid, isAdmin }] = member;
                    await this.teamsRef.doc(id).update({
                        groupId: groupId,
                        member: {
                            uid: uid,
                            isAdmin: isAdmin
                        }
                    });
                    const team = await this.teamsRef.doc(id).get();
                    const teamData: Team = {
                        id: oldTeam.id,
                        name: team.get('name'),
                        participants: team.get('participants')
                    };
                    this.logger.log(`Successfully updated team with id ${id}`);
                    this.logger.log(teamData);
                    return teamData;
                });
        } catch (e) {
            this.logger.error(
                `Unexpected server error. Failed to update team with id ${id}. Error: ${e.message}`
            );
            throw new InternalServerErrorException(
                `Unexpected server error. Failed to update team with id ${id}. Error: ${e.message}`
            );
        }
    }
    /**
     * The method to delete a team
     * @param {string} id The id of the team to delete
     * @returns {Promise<Team>} The deleted team document from firestore
     * */
    async remove(id: string): Promise<Team> {
        try {
            return Promise.resolve()
                .then(async () => {
                    const team = await this.teamsRef.doc(id).get();
                    if (team) {
                        return team;
                    }
                })
                .then(async (team) => {
                    if (!team.exists) {
                        const message = `No team with id ${id} found`;
                        this.logger.error(message);
                        throw new NotFoundException(message);
                    }
                    const teamData: Team = {
                        id: team.id,
                        name: team.get('name'),
                        participants: team.get('participants')
                    };
                    await this.teamsRef.doc(id).delete();
                    this.logger.log(`Successfully deleted team with id ${id}`);
                    this.logger.log(teamData);
                    return teamData;
                });
        } catch (e) {
            this.logger.error(
                `Unexpected server error. Failed to delete team with id ${id}. Error: ${e.message}`
            );
            throw new InternalServerErrorException(
                `Unexpected server error. Failed to delete team with id ${id}. Error: ${e.message}`
            );
        }
    }
}
