import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnDestroy } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
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
    /**
     * the state of the input
     */
    isUnvalid = false;
    emails: string[] = [];
    /**
     * subscription for the gid from the form component
     */
    subscription: Subscription;
    /**
     * created group id 
     */
    private gid = '';
    /**
     * Constructor which initializes the reactive register form
     * @param groupService {GroupService}
     * @param authService {AuthService}
     * @param alertService {AlertService}
     * @param router {Router}
     */
    constructor(
        private groupService: GroupService,
        private authService: AuthService,
        private alertService: AlertService,
        private router : Router
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
                    this.alertService.addAlert({
                        type: 'error',
                        message: e+': Member already added'
                    });
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
                this.alertService.addAlert({
                    type: 'success',
                    message: 'Member successfully added'
                });
                console.log('email sent and member added');
            }
        }
    }
    sendSignInEmail(email: string) {
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
    }
}
