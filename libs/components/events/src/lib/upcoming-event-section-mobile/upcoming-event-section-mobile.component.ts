import { Component, Input, OnChanges } from '@angular/core';
import { Event } from '@api-interfaces';
// import { ChunkerService } from '@services';

@Component({
    selector: 'mate-team-upcoming-event-section-mobile',
    templateUrl: './upcoming-event-section-mobile.component.html',
    styleUrls: ['./upcoming-event-section-mobile.component.scss'],
})
export class UpcomingEventSectionMobileComponent implements OnChanges {
    /**
     * Events that are displayed
     */
    @Input() events: Event[] | undefined;
    /**
     * Contains buckets of size 2
     * In every bucket the events are stored
     */
    buckets: Event[][] | undefined;
    /**
     * Updates the buckets based on the defined events
     */
    ngOnChanges(): void {
        if (this.events === undefined) {
            return;
        }
    }
}
