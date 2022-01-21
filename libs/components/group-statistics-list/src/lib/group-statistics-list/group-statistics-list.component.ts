import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AlertService, EventService } from '@services';
import { Event } from '@api-interfaces';
import { Team } from '@api-interfaces';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { slideAnimation, itemAnimation } from '@animations';

/**
 * Group statistics list component
 */
@Component({
    selector: 'mate-team-group-statistics-list',
    templateUrl: './group-statistics-list.component.html',
    styleUrls: ['./group-statistics-list.component.scss'],
    animations: [slideAnimation, itemAnimation],
    encapsulation: ViewEncapsulation.None
})
export class GroupStatisticsListComponent implements OnInit {
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
    public currentEventID: string | undefined = '';

    /**
     * temporary selected winning team
     */
    public winningTeam!: Team;

    /**
     * Modal reference
     */
    modalRef: NgbModalRef | undefined;

    /**
     * Constructor of group statistics list
     * @param eventService {EventService} The event service to handle events
     * @param modalService {NgbModal}
     * @param alertService {AlertService}
     */
    constructor(
        public eventService: EventService,
        private modalService: NgbModal,
        private alertService: AlertService
    ) {}

    /**
     * Gets all teams of specified event
     *
     * @param eventID {string | undefined} ID of the current selected event
     */
    getTeamsOfEvent(eventID: string | undefined): void {
        this.currentEventID = eventID;
        this.eventService
            .getTeamsOfEvent(eventID)
            .subscribe((teams) => this.teamsOfEvent.push(...teams));
    }

    /**
     * Sets local variable winningTeam.id to ID of selected Winner
     *
     * @param winnerID {string | undefined} ID of the winning team
     */
    setWinner(winnerID: string | undefined): void {
        this.winningTeam.id = winnerID;
    }

    /**
     * Sets a team as winner
     *
     * @param team {Team} the team which has been selected as winner
     */
    async setWinningTeam(team: Team): Promise<void> {
        if (!team.id) {
            this.alertService.addAlert({
                type: 'error',
                message: 'Please select a valid team'
            });
            return;
        }
        await this.eventService.setWinningTeam(this.currentEventID, team.name);
        this.closeModal();
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

    /**
     * Get finished events of group
     */
    ngOnInit(): void {
        this.eventService
            .getDoneEventsOfGroup()
            .subscribe((events) => (this.events = events));
    }
}
