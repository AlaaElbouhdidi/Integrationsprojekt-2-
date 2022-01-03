import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Team } from '@api-interfaces';

/**
 * Team form component
 */
@Component({
    selector: 'mate-team-team-form',
    templateUrl: './team-form.component.html',
    styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent {
    /**
     * Team form group
     */
    teamForm: FormGroup;
    /**
     * Create team event
     */
    @Output() createTeamEvent = new EventEmitter<Team>();

    /**
     * Constructor of team form component
     * @param fb {FormBuilder}
     */
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

    /**
     * @returns {AbstractControl} The name input control of the form
     */
    get name(): AbstractControl {
        return this.teamForm.controls.name;
    }

    /**
     * Emits create team event with the team data and resets form input
     */
    createTeam(): void {
        const data: Team = {
            name: this.name.value,
            participants: []
        };
        this.createTeamEvent.emit(data);
        this.teamForm.reset();
    }
}
