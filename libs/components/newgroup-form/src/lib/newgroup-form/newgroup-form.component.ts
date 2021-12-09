import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { Activity, Member } from '@api-interfaces';
import { AlertService, AuthService, GroupService } from '@services';
@Component({
    selector: 'mate-team-newgroup-form',
    templateUrl: './newgroup-form.component.html',
    styleUrls: ['./newgroup-form.component.scss']
})
export class NewgroupFormComponent implements OnInit {
    newGroupForm: FormGroup;
    activities = Activity;
    loading = false;
    keys: string[];

    constructor(
        private fb: FormBuilder,
        private groupService: GroupService,
        private alertService: AlertService,
        private authService: AuthService
    ) {
        this.newGroupForm = this.fb.group({
            name: new FormControl('', [Validators.required]),
            activity: new FormControl('', [Validators.required]),
            description: new FormControl('')
        });
        this.keys = Object.keys(this.activities);
    }
    get name(): AbstractControl {
        return this.newGroupForm.controls.name;
    }

    get activity(): AbstractControl {
        return this.newGroupForm.controls.activity;
    }
    get description(): AbstractControl {
        return this.newGroupForm.controls.description;
    }
    get member(): Member {
        return {
            uid: this.authService.getCurrentUser().uid,
            isAdmin: true
        };
    }

    async newGroup(): Promise<void> {
        try {
            this.loading = true;
            await this.groupService.addNewGroup(
                {
                    name: this.name.value,
                    activity: this.activity.value,
                    description: this.description.value,
                    member: [this.member],
                },
                this.member
            );
            this.loading = false;
            this.newGroupForm.reset();
            this.alertService.addAlert({
                type: 'success',
                message: 'Successfully added a group.'
            });
            this.groupService.toggleSuccess(true);
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
