import { Injectable } from '@angular/core';
import { Event, Group, Member, Participant, Team, User } from '@api-interfaces';
import {
    AngularFirestore,
    AngularFirestoreCollection
} from '@angular/fire/compat/firestore';

import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

/**
 * Group service
 */
@Injectable({
    providedIn: 'root'
})
export class GroupService {
    /**
     * ID of the current group
     */
    currentGroupId = '';
    /**
     * Group Collection
     */
    groupCollection: AngularFirestoreCollection<Group>;

    private success = false;
    private subject = new BehaviorSubject<string>('');

    /**
     * Constructor of group service
     * @param afs {AngularFirestore}
     * @param authService {AuthService},
     * @param userService {UserService}
     */
    constructor(
        public afs: AngularFirestore,
        public authService: AuthService,
        private userService: UserService
    ) {
        this.groupCollection = this.afs.collection('groups');
    }

    /**
     * Get a group by id
     *
     * @param groupId {string} The id of the group to get
     * @returns {Promise<Group | undefined>} A Promise containing the group or undefined if no group found
     */
    getGroupById(groupId: string): Promise<Group | undefined> {
        return this.afs
            .collection<Group>('groups')
            .doc(groupId)
            .ref.get()
            .then((group) => group.data());
    }

    /**
     * Get groups of the user
     *
     * @returns {Promise<Group[]>} A promise containing the group of the user
     */
    async getUserGroups(): Promise<Group[]> {
        const { uid } = this.authService.getCurrentUser();
        const user = (
            await this.afs.collection(`/users`).doc<User>(uid).ref.get()
        ).data();
        const userGroups: Group[] = [];
        if (user) {
            const { groups } = user;
            if (!groups) {
                return [];
            }
            groups.forEach(async (groupId) => {
                const group = (
                    await this.groupCollection.doc(groupId).ref.get()
                ).data();
                if (group) {
                    userGroups.push({ ...group, id: groupId });
                }
            });
        } else {
            return [];
        }
        return userGroups;
    }

    /**
     * Get user data changes
     *
     * @returns {Observable<User | undefined>} Observable containing the user data
     */
    userDataChanges(): Observable<User | undefined> {
        const user = this.authService.getCurrentUser();
        return this.afs.collection<User>('/users').doc(user.uid).valueChanges();
    }

    /**
     * Get invitations to groups of a user
     *
     * @returns {Promise<Group[]>} The groups of which the user has invitations for
     */
    async getUserInvitations(): Promise<Group[]> {
        const { uid } = this.authService.getCurrentUser();
        const user = (
            await this.afs.collection(`/users`).doc<User>(uid).ref.get()
        ).data();
        const groupInvitations: Group[] = [];
        if (!user) {
            return [];
        }
        const { invitations } = user;
        if (!invitations) {
            return [];
        }
        for (const invitation of invitations) {
            const group = (
                await this.groupCollection.doc(invitation).ref.get()
            ).data();
            if (group) {
                groupInvitations.push({ ...group, id: invitation });
            }
        }
        return groupInvitations;
    }

    /**
     * Send an invitation to a user for a group
     *
     * @param user {User} The user to which to send the invitation
     * @param groupId {string} The id of the group to which the invitation belongs
     */
    async sendUserGroupInvitation(user: User, groupId: string): Promise<void> {
        let { invitations } = user;
        if (!invitations) {
            invitations = [];
        }
        await this.afs
            .collection('users')
            .doc(user.uid)
            .set(
                {
                    invitations: [...invitations, groupId]
                },
                { merge: true }
            );
    }

    /**
     * Check if user has been already invited to group
     *
     * @param email {string} The email of the user to check
     * @param groupId {string} The id of the group to check the invitation for
     */
    async invitationAlreadySent(
        email: string,
        groupId: string
    ): Promise<boolean> {
        const { invitations } = await this.userService.getUser(email);
        if (!invitations) {
            return false;
        }
        return invitations.some((invitation) => invitation === groupId);
    }

    /**
     * Decline an invitation for a group
     *
     * @param groupId {string} The id of the group to decline the invitation for
     */
    async declineUserGroupInvitation(groupId: string): Promise<void> {
        const currentUser = this.authService.getCurrentUser();
        const user = await this.afs
            .collection('users')
            .doc(currentUser.uid)
            .ref.get()
            .then((doc) => {
                return doc.data() as User;
            });
        let { invitations } = user;
        if (!invitations) {
            invitations = [];
        }
        const updatedInvitations = invitations.filter(
            (groupInvitationId) => groupInvitationId !== groupId
        );
        await this.afs.collection('users').doc(currentUser.uid).set(
            {
                invitations: updatedInvitations
            },
            { merge: true }
        );
    }

    /**
     * Accept an invitation for a group
     *
     * @param groupId {string} The id of the group to accept the invitation for
     */
    async acceptUserGroupInvitation(groupId: string): Promise<void> {
        const currentUser = this.authService.getCurrentUser();
        const user = await this.afs
            .collection('users')
            .doc(currentUser.uid)
            .ref.get()
            .then((doc) => {
                return doc.data() as User;
            });
        let { invitations, groups } = user;
        if (!invitations) {
            invitations = [];
        }
        if (!groups) {
            groups = [];
        }
        const updatedInvitations = invitations.filter(
            (groupInvitationId) => groupInvitationId !== groupId
        );
        await this.afs
            .collection('users')
            .doc(currentUser.uid)
            .set(
                {
                    invitations: updatedInvitations,
                    groups: [...groups, groupId]
                },
                { merge: true }
            );
        await this.addMemberToGroup(groupId, {
            uid: user.uid,
            isAdmin: false,
            email: user.email
        });
    }

    /**
     * Remove a group reference from a user
     *
     * @param groupId {string} The id of the group whose reference will be removed
     * @param userId {string} The user where the reference will be removed
     */
    async removeUserGroupReference(
        groupId: string,
        userId: string
    ): Promise<void> {
        const user = await this.userService.getUserByUid(userId);
        let { groups } = user;
        if (!groups) {
            groups = [];
        }
        const updatedGroupsReferences = groups.filter(
            (groupReference) => groupReference !== groupId
        );
        await this.afs.collection('users').doc(user.uid).set(
            {
                groups: updatedGroupsReferences
            },
            { merge: true }
        );
    }

    toggleSuccess(gid: string): void {
        if (gid != '') {
            this.success = true;
        }
        this.subject.next(gid);
    }
    onToggle(): Observable<string> {
        return this.subject.asObservable();
    }

    async addNewGroup(g: Group, m: Member): Promise<string> {
        const groupId = await this.groupCollection.add(g).then((ref) => {
            this.groupCollection
                .doc(ref.id)
                .collection('members')
                .doc(m.email)
                .set(m);
            return ref.id;
        });
        const { uid } = this.authService.getCurrentUser();
        const user = (
            await this.afs.collection(`/users`).doc<User>(uid).ref.get()
        ).data();
        if (user) {
            let { groups } = user;
            if (!groups) {
                groups = [];
            }
            await this.afs
                .collection(`/users`)
                .doc(uid)
                .set(
                    {
                        groups: [...groups, groupId]
                    },
                    { merge: true }
                );
        }
        return groupId;
    }
    async addMemberToGroup(gid: string, m: Member): Promise<void> {
        await this.groupCollection
            .doc(gid)
            .collection('members')
            .doc(m.email)
            .set(m);
    }
    async isAlreadyMember(gid: string, email: string): Promise<boolean> {
        return await this.afs
            .collection('groups/' + gid + '/members/')
            .ref.where('email', '==', email)
            .get()
            .then((qs) => {
                return qs.size > 0;
            });
    }
    getAllMembers(gid: string): Observable<Member[]> {
        return this.afs
            .collection<Member>(`groups/${gid}/members`)
            .valueChanges();
    }
    async deleteMember(gid: string, m: Member): Promise<void> {
        await this.afs
            .collection<Member>(`groups/${gid}/members`)
            .doc(m.email)
            .delete();
        if (m.uid) {
            const participant: Participant = {
                uid: m.uid,
                displayName: '',
                icon: ''
            };
            const eventIds: string[] = [];
            await this.afs
                .collection<Event>('events')
                .ref.where('groupID', '==', gid)
                .where('participants', 'array-contains', participant)
                .get()
                .then((qs) => {
                    qs.docs.forEach((doc) => {
                        const id = doc.id;
                        eventIds.push(id);
                        const updatedParticipants = doc
                            .data()
                            .participants.filter(
                                (participant) => participant.uid !== m.uid
                            );
                        this.afs.collection('events').doc(id).set(
                            {
                                participants: updatedParticipants
                            },
                            { merge: true }
                        );
                    });
                });

            eventIds.forEach((id) => {
                this.afs
                    .collection('events')
                    .doc(id)
                    .collection<Team>('teams')
                    .ref.get()
                    .then((qs) => {
                        qs.docs.forEach((doc) => {
                            const teamId = doc.id;
                            const updatedTeamParticipants = doc
                                .data()
                                .participants.filter(
                                    (participant) => participant.uid !== m.uid
                                );
                            this.afs
                                .collection('events')
                                .doc(id)
                                .collection('teams')
                                .doc(teamId)
                                .set(
                                    {
                                        participants: updatedTeamParticipants
                                    },
                                    { merge: true }
                                );
                        });
                    });
            });
        }
    }
    toggleIsAdmin(gid: string, m: Member) {
        this.afs
            .collection(`groups`)
            .doc(gid)
            .update({ admin:  m.uid});
    }
    /**
     * update the name or the description of a group
     */
    async updateGroup(
        gid: string,
        name: string,
        description: string
    ): Promise<void> {
        await this.groupCollection.doc(gid).update({
            name: name,
            description: description
        });
    }
    /**
     * delete a group
     */
    async deleteGroup(gid: string): Promise<void> {
        await this.afs
            .collection(`groups/${gid}/members`)
            .get()
            .forEach((qs) => {
                qs.docs.forEach((i) => {
                    this.afs
                        .collection(`groups/${gid}/members`)
                        .doc(i.id)
                        .delete();
                });
            });
        await this.afs
            .collection(`groups/${gid}/datePolls`)
            .get()
            .forEach((qs) => {
                qs.docs.forEach((i) => {
                    this.afs
                        .collection(`groups/${gid}/datePolls`)
                        .doc(i.id)
                        .delete();
                });
            });
        await this.afs
            .collection('events')
            .ref.where('groupID', '==', gid)
            .get()
            .then((qs) => {
                qs.forEach(async (eventDoc) => {
                    await this.afs
                        .collection<Event>('events')
                        .doc(eventDoc.id)
                        .collection('teams')
                        .ref.get()
                        .then((qs) => {
                            qs.docs.forEach((teamDoc) => {
                                this.afs
                                    .collection<Event>('events')
                                    .doc(eventDoc.id)
                                    .collection('teams')
                                    .doc(teamDoc.id)
                                    .delete();
                            });
                        });
                    await this.afs
                        .collection('events')
                        .doc(eventDoc.id)
                        .delete();
                });
            });
        await this.groupCollection.doc(gid).delete();
    }
}
