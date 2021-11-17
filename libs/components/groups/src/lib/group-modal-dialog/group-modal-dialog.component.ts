import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupModel } from '../shared/models/GroupModel';

@Component({
    selector: 'mate-team-group-modal-dialog',
    templateUrl: './group-modal-dialog.component.html',
    styleUrls: ['./group-modal-dialog.component.scss'],
})
export class GroupModalDialogComponent {
    @Input() group: GroupModel | undefined = undefined;

    constructor(public activeModal: NgbActiveModal) {}
}
