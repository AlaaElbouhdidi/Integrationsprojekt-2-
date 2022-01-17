import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Participant } from '@api-interfaces';
import { AlertService, UserService } from '@services';

/**
 * Event participants list component
 */
@Component({
    selector: 'mate-team-event-participants-list',
    templateUrl: './event-participants-list.component.html',
    styleUrls: ['./event-participants-list.component.scss']
})
export class EventParticipantsListComponent implements OnInit {
    /**
     * Add to team event
     */
    @Output() addToTeamEvent = new EventEmitter<Participant>();
    /**
     * Participants of event
     */
    @Input() participants: Participant[] = [];
    /**
     * Filtered list of participants of event
     */
    filteredParticipants: Participant[] = [];
    /**
     * Searchbar input
     */
    searchInput = '';

    constructor(
        private userService: UserService,
        private alertService: AlertService
    ) {}

    /**
     * Emit add to team event with participant data
     *
     * @param participant {Participant} The participant to add to the team
     */
    addToTeam(participant: Participant): void {
        this.addToTeamEvent.emit(participant);
    }

    /**
     * Filter event participants based on given searchbar input
     */
    filterList(): void {
        const input = this.searchInput.toLowerCase();
        this.filteredParticipants = this.participants.filter((participant) => {
            const participantName = participant.displayName.toLowerCase();
            return participantName.indexOf(input) > -1;
        });
    }

    /**
     * Set filtered participants data
     */
    ngOnInit(): void {
        this.participants.forEach(async (participant) => {
            try {
                const eventParticipant = await this.userService.getUserByUid(
                    participant.uid
                );
                if (eventParticipant.displayName && eventParticipant.photoURL) {
                    this.participants[
                        this.participants.indexOf(participant)
                    ].displayName = eventParticipant.displayName;
                    this.participants[
                        this.participants.indexOf(participant)
                    ].icon = eventParticipant.photoURL;
                }
            } catch (e) {
                this.alertService.addAlert({
                    type: 'error',
                    message: e.message
                });
            }
        });
        this.filteredParticipants = this.participants;
    }
}
