import { Group } from '@api-interfaces';
import {
    Injectable,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import { FirebaseService } from '../../firebase/service/firebase.service';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import * as admin from 'firebase-admin';
/**
 * The GroupService
 * */
@Injectable()
export class GroupService {
    /**
     * The constructor of the GroupService
     * @param {FirebaseService} firebaseService The injected FirebaseService to use in the GroupService
     * */
    constructor(private readonly firebaseService: FirebaseService) {}
    /**
     * The EventService Logger
     * */
    private readonly logger: Logger = new Logger('GroupService');
    /**
     * The reference to the groups collection in firestore
     * */
    private readonly groupsRef = this.firebaseService
        .getFirestore()
        .collection('groups');
    /**
     * The method to create a group
     * @param {admin.auth.DecodedIdToken} user The logged in user
     * @param {CreateGroupDto} createGroupDto The DTO to create a group
     * @returns {Promise<Group>} The inserted group document from firestore
     * */
    async create(
        user: admin.auth.DecodedIdToken,
        createGroupDto: CreateGroupDto
    ): Promise<Group> {
        try {
            return await 'This action adds a new group';
        } catch (e) {
            this.logger.error(
                `Unexpected server error. Failed to create group`
            );
            throw new InternalServerErrorException(
                `Unexpected server error. Failed to create group`
            );
        }
    }
    /**
     * The method that finds all groups
     * @returns {Promise<Group[]>} The groups of firestore
     * */
    async findAll(): Promise<Group[]> {
        try {
            return await `This action returns all group`;
        } catch (e) {
            this.logger.error(
                `Unexpected server error. Failed to find all groups`
            );
            throw new InternalServerErrorException(
                `Unexpected server error. Failed to find all groups`
            );
        }
    }
    /**
     * Method that finds a group by id
     * @param {string} id The id of the group
     * @returns {Promise<Group>} Returns the group
     * */
    async findOne(id: string): Promise<Group> {
        try {
            return await `This action returns a #${id} group`;
        } catch (e) {
            this.logger.error(
                `Unexpected server error. Failed to find group with id ${id}`
            );
            throw new InternalServerErrorException(
                `Unexpected server error. Failed to find group with id ${id}`
            );
        }
    }
    /**
     * The method to update a group
     * @param {string} id The id of the group to update
     * @param {UpdateGroupDto} UpdateGroupDto The DTO to update a group
     * @returns {Promise<Group>} The updated group document from firestore
     * */
    async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
        try {
            return await `This action updates a #${id} group`;
        } catch (e) {
            this.logger.error(
                `Unexpected server error. Failed to update group with id ${id}`
            );
            throw new InternalServerErrorException(
                `Unexpected server error. Failed to update group with id ${id}`
            );
        }
    }
    /**
     * The method to delete a group
     * @param {string} id The id of the group to delete
     * @returns {Promise<Group>} The deleted group document from firestore
     * */
    async remove(id: string): Promise<Group> {
        try {
            return await `This action removes the group with id ${id}`;
        } catch (e) {
            this.logger.error(
                `Unexpected server error. Failed to delete group with id ${id}`
            );
            throw new InternalServerErrorException(
                `Unexpected server error. Failed to delete group with id ${id}`
            );
        }
    }
}
