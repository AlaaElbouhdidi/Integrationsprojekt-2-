import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Group } from '@api-interfaces';

@Component({
    selector: 'mate-team-group-item-screen',
    templateUrl: './group-item-screen.component.html',
    styleUrls: ['./group-item-screen.component.scss'],
})
export class GroupItemScreenComponent {
    @Input()
    group: Group | undefined;
    @Output()
    clicked: EventEmitter<void> = new EventEmitter();
}
