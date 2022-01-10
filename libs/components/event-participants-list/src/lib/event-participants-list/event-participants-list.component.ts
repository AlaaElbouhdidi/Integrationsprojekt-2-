import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Participant } from '@api-interfaces';

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
        this.filteredParticipants = this.participants;
    }
}
