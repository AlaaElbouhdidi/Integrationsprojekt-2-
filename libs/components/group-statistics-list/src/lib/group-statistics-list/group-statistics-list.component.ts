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

    public currentEventID : string | undefined = '';

    public winningTeam!: Team;

    /**
     * Modal reference
     */
    modalRef: NgbModalRef | undefined;

    constructor(public eventService: EventService, private modalService: NgbModal) {
        this.eventService.getDoneEventsOfGroup().subscribe(events => this.events.push(...events));
        console.log('Render events');
    }

    ngOnInit(): void {
        console.log('GroupStatisticsListComponent loaded');
        console.log(this.events);
    }

    getTeamsOfEvent(eventID: string | undefined) {
        this.currentEventID = eventID;
        this.eventService.getTeamsOfEvent(eventID).subscribe(teams => this.teamsOfEvent.push(...teams));
    }

    setWinner(winnderID: string | undefined) {
        this.winningTeam.id = winnderID;
        console.log(winnderID);
    }

    setWinningTeam(team: Team) {
        if(team.id == '') {
            alert('Please select valid Team');
        } else {
            this.eventService.setWinningTeam(team.id, this.currentEventID, team.name);
        }
    }

    /**
     * Opens a modal
     *
     * @param content {unknown} The modal reference
     */
    openModal(content: unknown): void {
        this.teamsOfEvent = [];
        this.modalRef = this.modalService.open(content, {
            windowClass: 'dark-modal'
        });
    }

    /**
     * Closes a modal
     */
    closeModal(): void {
        this.modalRef?.dismiss();
    }

}
