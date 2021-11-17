import { Component, Input } from '@angular/core';
import { Event } from '@api-interfaces';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'mate-team-integrationsprojekt2-event-modal-dialog',
    templateUrl: './event-modal-dialog.component.html',
    styleUrls: ['./event-modal-dialog.component.scss'],
})
export class EventModalDialogComponent {
    @Input() event: Event | undefined = undefined;

    constructor(public activeModal: NgbActiveModal) {}
}
