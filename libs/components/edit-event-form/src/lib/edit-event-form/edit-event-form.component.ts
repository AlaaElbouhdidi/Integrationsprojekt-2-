import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { Event } from '@api-interfaces';

@Component({
    selector: 'mate-team-edit-event-form',
    templateUrl: './edit-event-form.component.html',
    styleUrls: ['./edit-event-form.component.scss']
})
export class EditEventFormComponent implements OnInit {
    editEventForm: FormGroup;
    @Input() event: Event = {} as Event;
    @Output() editEventEvent = new EventEmitter<Event>();

    constructor(private fb: FormBuilder) {
        this.editEventForm = this.fb.group({
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
        return this.editEventForm.controls.name;
    }

    /**
     * @returns {AbstractControl} The description input control of the form
     */
    get description(): AbstractControl {
        return this.editEventForm.controls.description;
    }

    /**
     * @returns {AbstractControl} The date input control of the form
     */
    get date(): AbstractControl {
        return this.editEventForm.controls.date;
    }

    editEvent(): void {
        const event: Event = { ...this.event };
        event.name = this.name.value;
        event.description = this.description.value;
        event.date = this.date.value;
        this.editEventEvent.emit(event);
    }

    ngOnInit(): void {
        this.name.setValue(this.event.name);
        this.description.setValue(this.event.description);
        this.date.setValue(this.event.date);
    }
}
