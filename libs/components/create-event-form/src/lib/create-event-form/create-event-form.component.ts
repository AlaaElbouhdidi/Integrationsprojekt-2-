import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateEventFormData } from '@api-interfaces';

@Component({
    selector: 'mate-team-create-event-form',
    templateUrl: './create-event-form.component.html',
    styleUrls: ['./create-event-form.component.scss']
})
export class CreateEventFormComponent {
    @Output() createEventEvent = new EventEmitter<CreateEventFormData>();
    createEventForm: FormGroup;

    constructor(
        private fb: FormBuilder
    ) {
        this.createEventForm = this.fb.group({
            name: new FormControl('', [
                Validators.maxLength(20),
                Validators.required
            ]),
            description: new FormControl('', [
                Validators.maxLength(255),
                Validators.required
            ]),
            date: new FormControl('', [
                Validators.required
            ])
        });
    }

    get name(): AbstractControl {
        return this.createEventForm.controls.name;
    }

    get description(): AbstractControl {
        return this.createEventForm.controls.description;
    }

    get date(): AbstractControl {
        return this.createEventForm.controls.date;
    }

    createEvent(): void {
        const event: CreateEventFormData = {
            name: this.name.value,
            description: this.description.value,
            date: this.date.value,
        }
        this.createEventEvent.emit(event);
        this.createEventForm.reset();
    }
}
