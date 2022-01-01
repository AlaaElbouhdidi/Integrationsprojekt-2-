import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Team } from '@api-interfaces';

@Component({
    selector: 'mate-team-team-form',
    templateUrl: './team-form.component.html',
    styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent {
    teamForm: FormGroup;
    @Output() createTeamEvent = new EventEmitter<Team>();

    constructor(
        private fb: FormBuilder
    ) {
        this.teamForm = this.fb.group({
            name: new FormControl('', [
                Validators.required,
                Validators.maxLength(15)
            ])
        });
    }

    get name(): AbstractControl {
        return this.teamForm.controls.name;
    }

    createTeam(): void {
        const data: Team = {
            name: this.name.value,
            participants: []
        };
        this.createTeamEvent.emit(data);
        this.teamForm.reset();
    }
}
