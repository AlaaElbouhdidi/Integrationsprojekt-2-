import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnDestroy } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { Member } from '@api-interfaces';
import { AuthService, GroupService, AlertService } from '@services';
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';
import { Subscription } from 'rxjs';

@Component({
    selector: 'mate-team-newgroup-success',
    templateUrl: './newgroup-success.component.html',
    styleUrls: ['./newgroup-success.component.scss']
})
export class NewgroupSuccessComponent implements OnDestroy {

    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    isUnvalid = false;
    emails: string[] = [];

    subscription: Subscription;
    private gid = '';

    constructor(
        private groupService: GroupService,
        private authService: AuthService,
        private alertService: AlertService
    ) {
        this.subscription = this.groupService
            .onToggle()
            .subscribe((value) => {this.gid = value;}); 
    }

    ngOnDestroy() {
        // Unsubscribe to ensure no memory leaks
        //this.subscription.unsubscribe();
        console.log('destroy');
    }
    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
        const validRegex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // Add an email
        if (value.match(validRegex)) {
            this.isUnvalid = false;
            this.emails.push(value);
        } else {
            if (value != '') this.isUnvalid = true;
        }

        // Clear the input value
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        event.chipInput!.clear();
    }

    remove(email: string): void {
        const index = this.emails.indexOf(email);

        if (index >= 0) {
            this.emails.splice(index, 1);
        }
    }

    async sendInvites(): Promise<void> {
        let state = -1;
        for (const e of this.emails) {
            state = await this.authService.emailIsAlreadyRegistred(e);

            if (state === 0 || state === 1) {
                const m: Member = {
                    isAdmin: false,
                    email: e,
                };
                const res = await this.groupService.isAlreadyMember(
                    this.gid,
                    e
                );
                console.log(e + ': User already added');

                if (res) {
                    console.log(e + ': already member');
                } else {
                    console.log(e + ': not a member yet');
                    this.groupService.addMemberToGroup(this.gid, m);
                    this.alertService.addAlert({
                        type: 'success',
                        message: 'Member successfully added'
                    });
                }
            }
            if (state === -1) {
                console.log(e + ': User not exist  ');
                this.sendSignInEmail(e);
                this.groupService.addMemberToGroup(this.gid, {email: e, isAdmin: false});
                console.log('email sent and member added');
            }
        }
    }
    sendSignInEmail(email: string) {
        const actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be in the authorized domains list in the Firebase Console.
            url: 'http://mate-team.de/login',
            // This must be true.
            handleCodeInApp: true
        };
        const auth = getAuth();
        sendSignInLinkToEmail(auth, email, actionCodeSettings)
            .then(() => {
                // The link was successfully sent. Inform the user.
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                window.localStorage.setItem('emailForSignIn', email);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
                
            });
    }
}
