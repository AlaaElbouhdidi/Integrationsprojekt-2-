import { Component, EventEmitter, Output } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { CreateEventFormData } from '@api-interfaces';

/**
 * Create event form component
 */
@Component({
    selector: 'mate-team-create-event-form',
    templateUrl: './create-event-form.component.html',
    styleUrls: ['./create-event-form.component.scss']
})
export class CreateEventFormComponent {
    /**
     * Create event event
     */
    @Output() createEventEvent = new EventEmitter<CreateEventFormData>();
    /**
     * Create event form group
     */
    createEventForm: FormGroup;

    /**
     * Constructor of create event form
     * @param fb {FormBuilder}
     */
    constructor(private fb: FormBuilder) {
        this.createEventForm = this.fb.group({
            name: new FormControl('', [
                Validators.maxLength(20),
                Validators.required
            ]),
            description: new FormControl('', [
                Validators.maxLength(255),
                Validators.required
            ]),
            date: new FormControl('', [Validators.required])
        });
    }

    /**
     * @returns {AbstractControl} The name input control of the form
     */
    get name(): AbstractControl {
        return this.createEventForm.controls.name;
    }

    /**
     * @returns {AbstractControl} The description input control of the form
     */
    get description(): AbstractControl {
        return this.createEventForm.controls.description;
    }

    /**
     * @returns {AbstractControl} The date input control of the form
     */
    get date(): AbstractControl {
        return this.createEventForm.controls.date;
    }

    /**
     * Emit event to create event and reset form
     */
    createEvent(): void {
        const event: CreateEventFormData = {
            name: this.name.value,
            description: this.description.value,
            date: this.date.value
        };
        this.createEventEvent.emit(event);
        this.createEventForm.reset();
    }
}
