import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'mate-team-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
    @Input() title = '';
    @Input() text = '';
    @Output() closeModalEvent = new EventEmitter<boolean>();
}
