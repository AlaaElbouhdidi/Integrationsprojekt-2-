import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {EventModel} from '../shared/models/EventModel';
import {EventClientService} from "../shared/clients/event-client.service";
import {ChunkerUtils} from "../shared/utils/ChunkerUtils";

@Component({
    selector: 'app-upcoming-event-section-mobile',
    templateUrl: './upcoming-event-section-mobile.component.html',
    styleUrls: ['./upcoming-event-section-mobile.component.scss']
})
export class UpcomingEventSectionMobileComponent implements OnChanges {
    @Input()
    events: EventModel[] | undefined;
    buckets: EventModel[][] | undefined;
    ngOnChanges(changes: SimpleChanges): void {
        if(this.events === undefined){
            return;
        }
        this.buckets = ChunkerUtils.Chunk(this.events, 2);
    }
}
