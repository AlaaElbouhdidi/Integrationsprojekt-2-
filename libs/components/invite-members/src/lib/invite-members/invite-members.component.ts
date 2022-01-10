import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { Member } from '@api-interfaces';
import { AuthService, GroupService, UserService } from '@services';

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
    isUnvalid = false;
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
     * @param authService {UserService}
     */
    constructor(
        private groupService: GroupService,
        private authService: AuthService,
        private userService: UserService
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
                if (res) {
                    this.isUnvalid = true;
                    this.errorMessage = `${e} is already assigned to the group`;
                } else {
                    this.isUnvalid = false;
                    this.errorMessage = '';
                    this.emails.push(e);
                }
            } else {
                this.isUnvalid = true;
                this.errorMessage = `${e} is is not registred`;
            }
        } else {
            if (e != '') {
                this.isUnvalid = true;
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

    async sendInvites() {
        if (this.emails) {
            for (const e of this.emails) {
                const m: Member = {
                    isAdmin: false,
                    email: e
                };
                await this.userService.getUser(e).then((u) => {
                    m.uid = u.uid;
                });
                this.groupService.addMemberToGroup(this.gid, m);
            }
            this.sendInvitesEvent.emit(true);
        }
    }
    /* sendSignInEmail(email: string) {
      const actionCodeSettings = {
          url: 'http://mate-team.de/login',
          handleCodeInApp: true
      };
      const auth = getAuth();
      sendSignInLinkToEmail(auth, email, actionCodeSettings)
          .then(() => {
              window.localStorage.setItem('emailForSignIn', email);
          })
          .catch((error) => {
              const errorMessage = error.message;
              console.error(errorMessage);
          });
  } */
}
