import { Component, Input } from '@angular/core';
import { Group } from '@api-interfaces';

@Component({
    selector: 'mate-team-group-item-mobile',
    templateUrl: './group-item-mobile.component.html',
    styleUrls: ['./group-item-mobile.component.scss'],
})
export class GroupItemMobileComponent {
    /**
     * Group that is displayed
     */
    @Input()
    group: Group | undefined;
}
