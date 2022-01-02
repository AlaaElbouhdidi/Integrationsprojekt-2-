import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Participant } from '@api-interfaces';

@Component({
    selector: 'mate-team-event-participants-list',
    templateUrl: './event-participants-list.component.html',
    styleUrls: ['./event-participants-list.component.scss']
})
export class EventParticipantsListComponent implements OnInit {
    @Output() addToTeamEvent = new EventEmitter<Participant>();
    @Input() participants: Participant[] = [];
    filteredParticipants: Participant[] = [];
    searchInput = '';

    addToTeam(participant: Participant): void {
        this.addToTeamEvent.emit(participant);
    }

    filterList(): void {
        const input = this.searchInput.toLowerCase();
        this.filteredParticipants = this.participants.filter(participant => {
            const participantName = participant.displayName.toLowerCase();
            return participantName.indexOf(input) > -1;
        });
    }

    ngOnInit(): void {
        this.filteredParticipants = this.participants;
    }
}
