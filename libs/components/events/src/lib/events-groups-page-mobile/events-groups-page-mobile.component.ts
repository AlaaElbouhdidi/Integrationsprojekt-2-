import  {Component, Input, OnInit} from '@angular/core';
import { Group, Event } from '@api-interfaces';
import { EventModel } from '@services';
import { GroupModel } from '@services';

@Component({
    selector: 'mate-team-events-groups-page-mobile',
    templateUrl: './events-groups-page-mobile.component.html',
    styleUrls: ['./events-groups-page-mobile.component.scss']
})
export class EventsGroupsPageMobileComponent {
    @Input()
    events: Event[] | undefined;
    @Input()
    groups: Group[] | undefined;

}
