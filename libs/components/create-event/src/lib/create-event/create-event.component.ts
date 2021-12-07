import { Component } from '@angular/core';

@Component({
    selector: 'mate-team-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {
    public event = {
        title: '',
        description: '',
        location: '',
        start: '',
        time: ''
    };

    createEvent() {
        console.log('Creating Event: ' + this.event.description);
    }
}
