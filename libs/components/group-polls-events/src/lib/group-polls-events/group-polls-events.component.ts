import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreatePollData, Poll } from '@api-interfaces';
import { PollService } from '../../../../../services/src/lib/poll/poll.service';
import { Subject, takeUntil } from 'rxjs';
import { AlertService } from '@services';

@Component({
    selector: 'mate-team-group-polls-events',
    templateUrl: './group-polls-events.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./group-polls-events.component.scss']
})
export class GroupPollsEventsComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject();
    polls: Poll[] = [];

    constructor(
        private modalService: NgbModal,
        private pollService: PollService,
        private alertService: AlertService
    ) { }

    openPollModal(content: any): void {
        this.modalService.open(content, { windowClass: 'dark-modal' })
    }

    closePollModal(): void {
        this.modalService.dismissAll();
    }

    async createPoll(data: CreatePollData): Promise<void> {
        try {
            await this.pollService.createPoll(data);
            this.alertService.addAlert({
                type: 'success',
                message: 'Poll successfully created'
            })
        } catch (e) {
            this.alertService.addAlert({
                type: 'error',
                message: e.message
            });
        }
        this.closePollModal();
    }

    ngOnInit(): void {
        this.pollService.getPolls()
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                data => this.polls = data as Poll[],
            );
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
