import {Component, Input, OnInit} from '@angular/core';
import {GroupModel} from "../shared/models/GroupModel";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {EventModel} from "../shared/models/EventModel";

@Component({
  selector: 'mate-team-integrationsprojekt2-event-modal-dialog',
  templateUrl: './event-modal-dialog.component.html',
  styleUrls: ['./event-modal-dialog.component.scss']
})
export class EventModalDialogComponent {
    @Input() event: EventModel | undefined = undefined;

    constructor(public activeModal: NgbActiveModal) { }
}
