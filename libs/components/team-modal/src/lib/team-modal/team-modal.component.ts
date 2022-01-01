import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'mate-team-team-modal',
    templateUrl: './team-modal.component.html',
    styleUrls: ['./team-modal.component.scss']
})
export class TeamModalComponent implements OnInit {
    @Output() dismissModalEvent = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

}
