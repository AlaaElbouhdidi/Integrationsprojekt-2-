import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Poll } from '@api-interfaces';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { AlertService, AuthService } from '@services';

/**
 * Poll item component
 */
@Component({
    selector: 'mate-team-poll-item',
    templateUrl: './poll-item.component.html',
    styleUrls: ['./poll-item.component.scss'],
    animations: [
        trigger('flipPollItem', [
            transition('open => closed', [
                animate('0.5s', keyframes([
                    style({transform: 'rotateX(180deg)'}),
                    style({transform: 'rotateX(0)'})
                ]))
            ]),
            transition('closed => open', [
                animate('0.5s', keyframes([
                    style({transform: 'rotateX(180deg)'}),
                    style({transform: 'rotateX(0)'})
                ]))
            ]),
        ]),
    ]
})
export class PollItemComponent implements OnChanges {
    /**
     * Vote event
     */
    @Output() voteEvent = new EventEmitter<Poll>();
    /**
     * Delete poll event
     */
    @Output() deletePollEvent = new EventEmitter<string>();
    /**
     * Poll
     */
    @Input() poll: Poll = {} as Poll;
    /**
     * Determines if user is admin
     */
    @Input() isAdmin = false;
    /**
     * Determines if user has voted
     */
    userVoted = false;
    /**
     * Determines if results are shown
     */
    showResults = false;

    /**
     * Constructor of poll item
     * @param authService {AuthService}
     * @param alertService {AlertService}
     */
    constructor(
        private authService: AuthService,
        private alertService: AlertService
    ) { }

    /**
     * Changes value of showResults variable
     */
    flipPollItem(): void {
        this.showResults = !this.showResults;
    }

    /**
     * Calculates the percentage of the given votes
     *
     * @param votes {number} The votes to calculate the percentage for
     * @returns {number} Percentage
     */
    calcBarWidth(votes: number): number {
        const voteSum = this.poll.choices.reduce((accumulator, currentVal) => accumulator + currentVal.votes, 0);
        return (votes * 100) / voteSum;
    }

    /**
     * Check if a user has already voted on a given poll
     *
     * @param poll {Poll} The poll to check if the user has voted on
     * @returns {boolean} Indicates if user has voted or not
     */
    checkIfUserVoted(poll: Poll): boolean {
        if (poll.choices.length === 0) {
            return false;
        }
        const user = this.authService.getCurrentUser();
        return poll.usersVoted.some((e) => user.uid === e);
    }

    /**
     * Emit the event to delete poll to the parent component
     */
    deletePoll(): void {
        this.deletePollEvent.emit(this.poll.id);
    }

    /**
     * Register a vote on a poll and send an event to the parent component
     */
    vote(): void {
        const checkedInput = document.querySelector('input[name=choice]:checked') as HTMLInputElement;
        if (!checkedInput) {
            this.alertService.addAlert({
                type: 'error',
                message: 'Please select a date in order to vote'
            });
            return;
        }
        const checkedInputValue = Number(checkedInput.value);
        const poll = this.poll;
        poll.choices[checkedInputValue].votes++;
        this.voteEvent.emit(poll);
    }

    /**
     * Check if user voted on a given poll if input changes
     */
    ngOnChanges(): void {
        this.userVoted = this.checkIfUserVoted(this.poll);
        this.showResults = this.userVoted;
    }
}
