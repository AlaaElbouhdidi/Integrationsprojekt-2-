import { Component, Input } from '@angular/core';
import { Group } from '@api-interfaces';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'mate-team-group-modal-dialog',
    templateUrl: './group-modal-dialog.component.html',
    styleUrls: ['./group-modal-dialog.component.scss']
})
export class GroupModalDialogComponent {
    /**
     * Group that is displayed
     */
    @Input() group: Group | undefined = undefined;

    /**
     * Constructor
     * @param activeModal
     */
    constructor(public activeModal: NgbActiveModal) {}
}
