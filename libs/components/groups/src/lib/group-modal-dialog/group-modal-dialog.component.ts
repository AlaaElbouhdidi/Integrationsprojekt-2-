import { Component, Input } from '@angular/core';
import { Group } from '@api-interfaces';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupModel } from '@services';
//import { GroupModel } from '../shared/models/GroupModel';

@Component({
    selector: 'mate-team-group-modal-dialog',
    templateUrl: './group-modal-dialog.component.html',
    styleUrls: ['./group-modal-dialog.component.scss'],
})
export class GroupModalDialogComponent {
    @Input() group: Group | undefined = undefined;

    constructor(public activeModal: NgbActiveModal) {}
}
