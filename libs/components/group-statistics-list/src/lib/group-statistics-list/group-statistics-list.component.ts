import { Component } from '@angular/core';
import {EventService} from "@services";
import {Event} from "@api-interfaces";
import {Team} from "@api-interfaces";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'mate-team-group-statistics-list',
  templateUrl: './group-statistics-list.component.html',
  styleUrls: ['./group-statistics-list.component.scss']
})
export class GroupStatisticsListComponent {

    /**
     * Array of all events marked as done
     */
    public events: Event[] = [];

    /**
     * Array of all teams of currently selected event
     */
    public teamsOfEvent: Team[] = [];

    /**
     * temporary ID of current event
     */
    public currentEventID : string | undefined = '';

    /**
     * temporary selected winning team
     */
    public winningTeam!: Team;

    /**
     * Modal reference
     */
    modalRef: NgbModalRef | undefined;

    constructor(public eventService: EventService, private modalService: NgbModal) {
        this.eventService.getDoneEventsOfGroup().subscribe(events => this.events.push(...events));
        console.log('Render events');
    }

    /**
     * Gets all teams of specified event
     *
     * @param eventID {string | undefined} ID of the current selected event
     */
    getTeamsOfEvent(eventID: string | undefined) {
        this.currentEventID = eventID;
        this.eventService.getTeamsOfEvent(eventID).subscribe(teams => this.teamsOfEvent.push(...teams));
    }

    /**
     * Sets local variable winningTeam.id to ID of selected Winner
     *
     * @param winnerID {string | undefined} ID of the winning team
     */
    setWinner(winnerID: string | undefined) {
        this.winningTeam.id = winnerID;
    }

    /**
     * Sets a team as winner
     *
     * @param team {Team} the team which has been selected as winner
     */
    setWinningTeam(team: Team) {
        if(team.id == '') {
            alert('Please select valid Team');
        } else {
            this.eventService.setWinningTeam(this.currentEventID, team.name);
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
