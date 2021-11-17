import { Component, Input } from '@angular/core';
import { Event, Group } from '@api-interfaces';

@Component({
    selector: 'mate-team-events-groups-page-screen',
    templateUrl: './events-groups-page-screen.component.html',
    styleUrls: ['./events-groups-page-screen.component.scss'],
})
export class EventsGroupsPageScreenComponent {
    @Input()
    events: Event[] | undefined;
    @Input()
    groups: Group[] | undefined;
}
