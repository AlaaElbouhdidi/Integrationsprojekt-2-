import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Choice, Poll } from '@api-interfaces';

@Component({
    selector: 'mate-team-create-poll-form',
    templateUrl: './create-poll-form.component.html',
    styleUrls: ['./create-poll-form.component.scss']
})
export class CreatePollFormComponent {
    createPollForm: FormGroup;
    @Output() createPollEvent = new EventEmitter<Poll>();
    choices: Choice[] = [];

    constructor(
        private fb: FormBuilder
    ) {
        this.createPollForm = this.fb.group({
            title: new FormControl('', [
                Validators.maxLength(50),
                Validators.required
            ]),
            date: new FormControl('', [
                Validators.required
            ])
        });
    }

    get title(): AbstractControl {
        return this.createPollForm.controls.title;
    }

    get date(): AbstractControl {
        return this.createPollForm.controls.date;
    }

    addDateAsChoice(): void {
        const choice: Choice = {
            date: this.date.value,
            votes: 0
        };
        this.choices.push(choice);
    }

    deleteDateAsChoice(index: number): void {
        this.choices.splice(index, 1);
    }

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
