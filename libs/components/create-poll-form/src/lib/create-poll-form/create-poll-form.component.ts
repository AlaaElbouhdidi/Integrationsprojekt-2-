import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreatePollData } from '@api-interfaces';

@Component({
    selector: 'mate-team-create-poll-form',
    templateUrl: './create-poll-form.component.html',
    styleUrls: ['./create-poll-form.component.scss']
})
export class CreatePollFormComponent {
    createPollForm: FormGroup;
    @Output() createPollEvent = new EventEmitter<CreatePollData>();
    choices: string[] = [];

    constructor(
        private fb: FormBuilder
    ) {
        this.createPollForm = this.fb.group({
            title: new FormControl('', [
                Validators.maxLength(100),
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
        this.choices.push(this.date.value);
    }

    deleteDateAsChoice(index: number): void {
        this.choices.splice(index, 1);
    }

    createPoll(): void {
        const data: CreatePollData = {
            title: this.title.value,
            choices: this.choices
        }
        this.createPollEvent.emit(data);
        this.createPollForm.reset();
    }
}
