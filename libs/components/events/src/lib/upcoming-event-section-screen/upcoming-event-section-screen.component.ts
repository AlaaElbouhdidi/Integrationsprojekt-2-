import { Component, Input, OnChanges } from '@angular/core';
import { Event } from '@api-interfaces';
import { ChunkerService } from '@services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventModalDialogComponent } from '../event-modal-dialog/event-modal-dialog.component';

@Component({
    selector: 'mate-team-upcoming-event-section-screen',
    templateUrl: './upcoming-event-section-screen.component.html',
    styleUrls: ['./upcoming-event-section-screen.component.scss'],
})
export class UpcomingEventSectionScreenComponent implements OnChanges {
    @Input()
    events: Event[] | undefined;
    buckets: Event[][] | undefined;

    constructor(
        private modalService: NgbModal,
        private chunkerService: ChunkerService
    ) {}
    ngOnChanges(): void {
        if (this.events === undefined) {
            return;
        }
        this.buckets = this.chunkerService.chunk(this.events, 4);
    }

    clicked(e: Event): void {
        const ref = this.modalService.open(EventModalDialogComponent);
        ref.componentInstance.event = e;
    }
}
