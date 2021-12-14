import { Component, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreatePollData } from '@api-interfaces';

@Component({
    selector: 'mate-team-group-polls-events',
    templateUrl: './group-polls-events.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./group-polls-events.component.scss']
})
export class GroupPollsEventsComponent {

    constructor(
        private modalService: NgbModal
    ) { }

    openPollModal(content: any) {
        this.modalService.open(content, { windowClass: 'dark-modal' })
    }

    closePollModal() {
        this.modalService.dismissAll();
    }

    createPoll(data: CreatePollData) {
        console.log('poll form data: ', data);
    }
}
