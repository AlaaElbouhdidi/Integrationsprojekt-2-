import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { Member } from '@api-interfaces';
import { AlertService, AuthService, GroupService } from '@services';

/**
 * New group form component
 */
@Component({
    selector: 'mate-team-newgroup-form',
    templateUrl: './newgroup-form.component.html',
    styleUrls: ['./newgroup-form.component.scss']
})
export class NewgroupFormComponent implements OnInit {
    /**
     * Register Form Group
     */
    newGroupForm: FormGroup;
    /**
     * Loading state
     */
    loading = false;

    /**
     * Constructor which initializes the reactive register form
     * @param fb {FormBuilder}
     * @param authService {AuthService}
     * @param alertService {AlertService}
     * @param groupService {GroupService}
     */
    constructor(
        private fb: FormBuilder,
        private groupService: GroupService,
        private alertService: AlertService,
        private authService: AuthService
    ) {
        this.newGroupForm = this.fb.group({
            name: new FormControl('', [Validators.required]),
            description: new FormControl('')
        });
    }

    /**
     * @returns {AbstractControl} The name input control of the form
     */
    get name(): AbstractControl {
        return this.newGroupForm.controls.name;
    }

    /**
     * @returns {AbstractControl} The description input control of the form
     */
    get description(): AbstractControl {
        return this.newGroupForm.controls.description;
    }

    /**
     * @returns {Member} The signed-in user as the admin and the member of the to be created group
     */
    get member(): Member {
        const u = this.authService.getCurrentUser();
        return {
            uid: u.uid,
            isAdmin: true,
            email: u.email || ''
        };
    }

    /**
     * Calls group service to add a new group and handles success and error cases
     */
    async newGroup(): Promise<void> {
        try {
            const g = {
                name: this.name.value,
                description: this.description.value,
                admin: this.member.uid || ''
            };
            this.loading = true;
            const gid = await this.groupService.addNewGroup(g, this.member);
            this.loading = false;
            this.newGroupForm.reset();
            this.alertService.addAlert({
                type: 'success',
                message: 'Successfully added a group.'
            });
            this.groupService.toggleSuccess(gid);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error(err);

            this.loading = false;
            this.newGroupForm.reset();
            this.alertService.addAlert({
                type: 'error',
                message: err.message
            });
        }
    }

    /**
     * Initialize the component handles success and error cases
     */
    async ngOnInit(): Promise<void> {
        try {
            console.log(`Component initialized`);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            this.loading = false;
            this.newGroupForm.reset();
            this.alertService.addAlert({
                type: 'error',
                message: err.message
            });
        }
    }
}
