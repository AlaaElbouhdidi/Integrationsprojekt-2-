import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { EventModel } from '../shared/models/EventModel';
import {ChunkerUtils} from "../shared/utils/ChunkerUtils";
import {GroupModalDialogComponent} from "../group-modal-dialog/group-modal-dialog.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EventModalDialogComponent} from "../event-modal-dialog/event-modal-dialog.component";

@Component({
  selector: 'mate-team-integrationsprojekt2-upcoming-event-section-screen',
  templateUrl: './upcoming-event-section-screen.component.html',
  styleUrls: ['./upcoming-event-section-screen.component.scss']
})
export class UpcomingEventSectionScreenComponent implements OnChanges {
    @Input()
    events: EventModel[] | undefined;
    buckets: EventModel[][] | undefined;

    constructor(private modalService: NgbModal) { }
    ngOnChanges(changes: SimpleChanges): void {
        if(this.events === undefined){
            return;
        }
        this.buckets = ChunkerUtils.Chunk(this.events, 4);
    }

    clicked(e: EventModel): void {
        const ref = this.modalService.open(EventModalDialogComponent);
        ref.componentInstance.event = e;
    }
}
