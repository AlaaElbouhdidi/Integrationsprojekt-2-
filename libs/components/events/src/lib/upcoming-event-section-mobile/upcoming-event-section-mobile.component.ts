import { Component, Input, OnChanges } from '@angular/core';
import { Event } from '@api-interfaces';
import { ChunkerService } from '@services';

@Component({
    selector: 'mate-team-upcoming-event-section-mobile',
    templateUrl: './upcoming-event-section-mobile.component.html',
    styleUrls: ['./upcoming-event-section-mobile.component.scss'],
})
export class UpcomingEventSectionMobileComponent implements OnChanges {
    constructor(private chunkerService: ChunkerService) {}
    @Input()
    events: Event[] | undefined;
    buckets: Event[][] | undefined;
    ngOnChanges(): void {
        if (this.events === undefined) {
            return;
        }
        this.buckets = this.chunkerService.chunk(this.events, 2);
    }
}
