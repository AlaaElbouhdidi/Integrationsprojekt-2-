import { Component, EventEmitter, Output } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { Choice, Poll } from '@api-interfaces';

/**
 * Create poll form component
 */
@Component({
    selector: 'mate-team-create-poll-form',
    templateUrl: './create-poll-form.component.html',
    styleUrls: ['./create-poll-form.component.scss']
})
export class CreatePollFormComponent {
    /**
     * Create poll form group
     */
    createPollForm: FormGroup;
    /**
     * Create poll event
     */
    @Output() createPollEvent = new EventEmitter<Poll>();
    /**
     * Choices of a poll
     */
    choices: Choice[] = [];

    /**
     * Constructor which initializes create poll reactive form
     * @param fb {FormBuilder}
     */
    constructor(private fb: FormBuilder) {
        this.createPollForm = this.fb.group({
            title: new FormControl('', [
                Validators.maxLength(50),
                Validators.required
            ]),
            date: new FormControl('', [Validators.required])
        });
    }

    /**
     * @returns {AbstractControl} The title input control of the form
     */
    get title(): AbstractControl {
        return this.createPollForm.controls.title;
    }

    /**
     * @returns {AbstractControl} The date input control of the form
     */
    get date(): AbstractControl {
        return this.createPollForm.controls.date;
    }

    /**
     * Add date input value as a choice
     */
    addDateAsChoice(): void {
        const choice: Choice = {
            date: this.date.value,
            votes: 0
        };
        this.choices.push(choice);
    }

    /**
     * Remove a date from the choices
     *
     * @param index {number} Index of the choice to remove from the array
     */
    deleteDateAsChoice(index: number): void {
        this.choices.splice(index, 1);
    }

    /**
     * Emit event to create poll to parent component and reset form
     */
    createPoll(): void {
        const data: Poll = {
            title: this.title.value,
            choices: this.choices,
            usersVoted: []
        };
        this.createPollEvent.emit(data);
        this.createPollForm.reset();
    }
}
