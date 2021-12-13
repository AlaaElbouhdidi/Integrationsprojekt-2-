import { Component, Input, OnChanges } from '@angular/core';
import { Event } from '@api-interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventModalDialogComponent } from '../event-modal-dialog/event-modal-dialog.component';

@Component({
    selector: 'mate-team-upcoming-event-section-screen',
    templateUrl: './upcoming-event-section-screen.component.html',
    styleUrls: ['./upcoming-event-section-screen.component.scss']
})
export class UpcomingEventSectionScreenComponent implements OnChanges {
    /**
     * Events that are displayed
     */
    @Input() events: Event[] | undefined;
    /**
     * Contains buckets of size 2
     * In every bucket events are stored
     */
    buckets: Event[][] | undefined;

    /**
     * Constructor gets the NgbModal and ChunkerService.
     * @param modalService
     * @param chunkerService
     */
    constructor(private modalService: NgbModal) {}

    /**
     * It defines the buckets based on the defined events.
     */
    ngOnChanges(): void {
        if (this.events === undefined) {
            return;
        }
    }

    /**
     * Is called iff the user clicks on open.
     * It opens the EventModalDialogComponent in a modal dialog.
     * @param e
     */
    clicked(e: Event): void {
        const ref = this.modalService.open(EventModalDialogComponent);
        ref.componentInstance.event = e;
    }
}
