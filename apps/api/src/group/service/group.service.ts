import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException
} from '@nestjs/common';
import { FirebaseService } from '../../firebase/service/firebase.service';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import * as admin from 'firebase-admin';
import { Group } from '@api-interfaces';
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
     * The GroupService Logger
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
            const { uid } = user;
            const { name, description, activity, member } = createGroupDto;
            const data = {
                name,
                description,
                activity,
                member: [uid, ...member]
            };
            const group = await (await this.groupsRef.add(data)).get();
            this.logger.log(`Successfully created group with id ${group.id}`);
            const groupData: Group = {
                id: group.id,
                name: group.get('name'),
                description: group.get('description'),
                activity: group.get('activity'),
                member: group.get('member')
            };
            return groupData;
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
            return Promise.resolve()
                .then(async () => {
                    const groups = await this.groupsRef.get();
                    if (groups) {
                        return groups;
                    }
                })
                .then((snapshot) => {
                    const groups: Group[] = [];
                    if (!snapshot.docs.length) {
                        const message = 'No groups found';
                        this.logger.error(message);
                        throw new NotFoundException(message);
                    }
                    snapshot.forEach((group) => {
                        const groupData: Group = {
                            id: group.id,
                            name: group.get('name'),
                            description: group.get('description'),
                            activity: group.get('activity'),
                            member: group.get('member')
                        };
                        this.logger.log(groupData);
                        groups.push(groupData);
                    });
                    return groups;
                });
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
            return Promise.resolve()
                .then(async () => {
                    const group = await this.groupsRef.doc(id).get();
                    if (group) {
                        return group;
                    }
                })
                .then((group) => {
                    if (!group.exists) {
                        const message = `No group with id ${id} found`;
                        this.logger.error(message);
                        throw new NotFoundException(message);
                    }
                    const groupData: Group = {
                        id: group.id,
                        name: group.get('name'),
                        description: group.get('description'),
                        activity: group.get('activity'),
                        member: group.get('member')
                    };
                    this.logger.log(`Successfully fetched group with id ${id}`);
                    this.logger.log(groupData);
                    return groupData;
                });
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
            return Promise.resolve()
                .then(async () => {
                    const group = await this.groupsRef.doc(id).get();
                    if (group) {
                        return group;
                    }
                })
                .then(async (oldGroup) => {
                    if (!oldGroup.exists) {
                        const message = `No group with id ${id} found`;
                        this.logger.error(message);
                        throw new NotFoundException(message);
                    }
                    const { name, description, activity, member } =
                        updateGroupDto;
                    await this.groupsRef.doc(id).update({
                        name: name,
                        description: description,
                        activity: activity,
                        member: member
                    });
                    const group = await this.groupsRef.doc(id).get();
                    const groupData: Group = {
                        id: group.id,
                        name: group.get('name'),
                        description: group.get('description'),
                        activity: group.get('activity'),
                        member: group.get('member')
                    };
                    this.logger.debug(groupData);
                    this.logger.log(`Successfully updated group with id ${id}`);
                    this.logger.log(groupData);
                    return groupData;
                });
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
            return Promise.resolve()
                .then(async () => {
                    const group = await this.groupsRef.doc(id).get();
                    if (group) {
                        return group;
                    }
                })
                .then(async (group) => {
                    if (!group.exists) {
                        const message = `No group with id ${id} found`;
                        this.logger.error(message);
                        throw new NotFoundException(message);
                    }
                    const groupData: Group = {
                        id: group.id,
                        name: group.get('name'),
                        description: group.get('description'),
                        activity: group.get('activity'),
                        member: group.get('member')
                    };
                    await this.groupsRef.doc(id).delete();
                    this.logger.log(`Successfully deleted group with id ${id}`);
                    this.logger.log(groupData);
                    return groupData;
                });
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
