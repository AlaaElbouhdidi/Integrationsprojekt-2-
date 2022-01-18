import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {
    AlertService,
    AuthService,
    GroupService,
    UserService
} from '@services';

@Component({
    selector: 'mate-team-invite-members',
    templateUrl: './invite-members.component.html',
    styleUrls: ['./invite-members.component.scss']
})
export class InviteMembersComponent {
    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    /**
     * the state of the input
     */
    isInvalid = false;
    /**
     * the error message when the state is wrong
     */
    errorMessage = '';
    emails: string[] = [];
    /**
     * created group id
     */
    @Input() gid = '';
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

    async add(event: MatChipInputEvent): Promise<void> {
        const e = (event.value || '').trim();
        //Check if the email is valid
        const validRegex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // Add an email
        if (e.match(validRegex)) {
            // Check if the email is already registred via only Email or via password
            const state = await this.authService.emailIsAlreadyRegistred(e);
            if (state === 0 || state === 1) {
                // Check if the email is already assigned to this group
                const res = await this.groupService.isAlreadyMember(
                    this.gid,
                    e
                );
                const alreadyInvited =
                    await this.groupService.invitationAlreadySent(e, this.gid);
                if (alreadyInvited) {
                    this.isInvalid = true;
                    this.errorMessage = `${e} has already been invited`;
                    return;
                }
                if (res) {
                    this.isInvalid = true;
                    this.errorMessage = `${e} is already assigned to the group`;
                } else {
                    this.isInvalid = false;
                    this.errorMessage = '';
                    this.emails.push(e);
                }
            } else {
                this.isInvalid = true;
                this.errorMessage = `${e} is is not registred`;
            }
        } else {
            if (e != '') {
                this.isInvalid = true;
                this.errorMessage = `${e} is not correctly formatted`;
            }
        }
        // Clear the input value
        event.chipInput?.clear();
    }

    remove(email: string): void {
        const index = this.emails.indexOf(email);

        if (index >= 0) {
            this.emails.splice(index, 1);
        }
    }

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
