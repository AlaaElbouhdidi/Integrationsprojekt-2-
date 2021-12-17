import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Poll } from '@api-interfaces';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { AlertService, AuthService } from '@services';

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
    @Output() voteEvent = new EventEmitter<Poll>();
    @Output() deletePollEvent = new EventEmitter<string>();
    @Input() poll: Poll = {} as Poll;
    @Input() isAdmin = false;
    userVoted = false;
    showResults = false;

    constructor(
        private authService: AuthService,
        private alertService: AlertService
    ) { }

    flipPollItem(): void {
        this.showResults = !this.showResults;
    }

    calcBarWidth(votes: number): number {
        const voteSum = this.poll.choices.reduce((accumulator, currentVal) => accumulator + currentVal.votes, 0);
        return (votes * 100) / voteSum;
    }

    checkIfUserVoted(poll: Poll): boolean {
        if (poll.choices.length === 0) {
            return false;
        }
        const user = this.authService.getCurrentUser();
        return poll.usersVoted.some((e) => user.uid === e);
    }

    deletePoll(): void {
        this.deletePollEvent.emit(this.poll.id);
    }

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
        for(let i = 0; i < poll.choices.length; i++) {
            if (i === checkedInputValue) {
                poll.choices[i].votes++;
            }
        }
        this.voteEvent.emit(poll);
    }

    ngOnChanges(): void {
        this.userVoted = this.checkIfUserVoted(this.poll);
        this.showResults = this.userVoted;
    }
}
