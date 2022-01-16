import { Component, OnInit } from '@angular/core';
import {EventService} from "@services";
import {Event} from "@api-interfaces";
import {Team} from "@api-interfaces";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'mate-team-group-statistics-list',
  templateUrl: './group-statistics-list.component.html',
  styleUrls: ['./group-statistics-list.component.scss']
})
export class GroupStatisticsListComponent implements OnInit {

    public events: Event[] = [];

    public teamsOfEvent: Team[] = [];

    public winningTeam: string | undefined = '';

    /**
     * Modal reference
     */
    modalRef: NgbModalRef | undefined;


    constructor(public eventService: EventService, private modalService: NgbModal) {
        this.eventService.getDoneEventsOfGroup().subscribe(events => this.events.push(...events));
    }

    ngOnInit(): void {
        console.log('GroupStatisticsListComponent loaded');
        console.log(this.events);
    }

    getTeamsOfEvent(eventID: string | undefined) {
        this.eventService.getTeamsOfEvent(eventID).subscribe(teams => this.teamsOfEvent.push(...teams));
    }

    setWinner(winnderID: string | undefined) {
        this.winningTeam = winnderID;
    }

    setWinningTeam() {
        console.log('Setting winning Team: ' + this.winningTeam)
    }

    /**
     * Opens a modal
     *
     * @param content {unknown} The modal reference
     */
    openModal(content: unknown): void {
        this.modalRef = this.modalService.open(content, {
            windowClass: 'dark-modal'
        });
    }

    /**
     * Closes a modal
     */
    closeModal(): void {
        this.modalRef?.dismiss();
        this.teamsOfEvent = [];
    }

}
