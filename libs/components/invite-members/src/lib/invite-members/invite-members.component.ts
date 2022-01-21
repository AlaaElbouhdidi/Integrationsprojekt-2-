import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {
    AlertService,
    AuthService,
    GroupService,
    UserService
} from '@services';

/**
 * Invite members component
 */
@Component({
    selector: 'mate-team-invite-members',
    templateUrl: './invite-members.component.html',
    styleUrls: ['./invite-members.component.scss']
})
export class InviteMembersComponent {
    /**
     * Selectable
     */
    selectable = true;
    /**
     * Removable
     */
    removable = true;
    /**
     * Add on blur
     */
    addOnBlur = true;
    /**
     * separator key codes
     */
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    /**
     * the state of the input
     */
    isInvalid = false;
    /**
     * the error message when the state is wrong
     */
    errorMessage = '';
    /**
     * Emails
     */
    emails: string[] = [];
    /**
     * created group id
     */
    @Input() gid = '';
    /**
     * Send invites event
     */
    @Output() sendInvitesEvent = new EventEmitter<boolean>();

    /**
     * Constructor which initializes the reactive register form
     * @param groupService {GroupService}
     * @param authService {AuthService}
     * @param userService {UserService}
     * @param alertService {AlertService}
     */
    constructor(
        private groupService: GroupService,
        private authService: AuthService,
        private userService: UserService,
        private alertService: AlertService
    ) {}

    /**
     * Add email to list for group invitations
     *
     * @param event {MatChipInputEvent} Event
     */
    async add(event: MatChipInputEvent): Promise<void> {
        const email = (event.value || '').trim();
        //Check if the email is valid
        const validRegex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // Add an email
        if (email.match(validRegex)) {
            // Check if the email is already registred via only Email or via password
            if (await this.authService.emailIsAlreadyRegistered(email)) {
                // Check if the email is already assigned to this group
                const res = await this.groupService.isAlreadyMember(
                    this.gid,
                    email
                );
                const alreadyInvited =
                    await this.groupService.invitationAlreadySent(
                        email,
                        this.gid
                    );
                if (alreadyInvited) {
                    this.isInvalid = true;
                    this.errorMessage = `${email} has already been invited`;
                    return;
                }
                if (res) {
                    this.isInvalid = true;
                    this.errorMessage = `${email} is already assigned to the group`;
                } else {
                    this.isInvalid = false;
                    this.errorMessage = '';
                    this.emails.push(email);
                }
            } else {
                this.isInvalid = true;
                this.errorMessage = `${email} is is not registred`;
            }
        } else {
            if (email != '') {
                this.isInvalid = true;
                this.errorMessage = `${email} is not correctly formatted`;
            }
        }
        // Clear the input value
        event.chipInput?.clear();
    }

    /**
     * Remove an email
     *
     * @param email {string} The email to remove
     */
    remove(email: string): void {
        const index = this.emails.indexOf(email);

        if (index >= 0) {
            this.emails.splice(index, 1);
        }
    }

    /**
     * Send group invites to specified emails
     */
    async sendInvites(): Promise<void> {
        if (this.emails) {
            for (const email of this.emails) {
                const user = await this.userService.getUser(email);
                try {
                    const invited =
                        await this.groupService.invitationAlreadySent(
                            email,
                            this.gid
                        );
                    if (invited) {
                        continue;
                    }
                    await this.groupService.sendUserGroupInvitation(
                        user,
                        this.gid
                    );
                    this.sendInvitesEvent.emit(true);
                } catch (e) {
                    this.sendInvitesEvent.emit(false);
                }
            }
        }
    }
}
