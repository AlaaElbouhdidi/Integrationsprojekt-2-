import {Component} from '@angular/core';
import {EventService} from "@services";

@Component({
    selector: 'mate-team-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {
    public event = {
        name: '',
        description: '',
        date: '',
    };

    constructor(private eventService: EventService) {
    }

    createEvent() {
        this.eventService.createEvent(this.event);
    }




}
