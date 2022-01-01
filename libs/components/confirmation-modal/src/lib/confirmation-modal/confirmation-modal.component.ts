import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Confirmation modal component
 */
@Component({
    selector: 'mate-team-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
    /**
     * Title of the modal
     */
    @Input() title = '';
    /**
     * Text of the modal
     */
    @Input() text = '';
    /**
     * Close modal event
     */
    @Output() closeModalEvent = new EventEmitter<boolean>();
    /**
     * Dismiss modal event
     */
    @Output() dismissModalEvent = new EventEmitter();
}
