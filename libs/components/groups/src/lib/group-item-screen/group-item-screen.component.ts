import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Group } from '@api-interfaces';

@Component({
    selector: 'mate-team-group-item-screen',
    templateUrl: './group-item-screen.component.html',
    styleUrls: ['./group-item-screen.component.scss'],
})
export class GroupItemScreenComponent {
    /**
     * Group that is displayed.
     */
    @Input()
    group: Group | undefined;
    /**
     * This is emitted iff the user clicks on the open button.
     */
    @Output()
    clicked: EventEmitter<void> = new EventEmitter();
}
