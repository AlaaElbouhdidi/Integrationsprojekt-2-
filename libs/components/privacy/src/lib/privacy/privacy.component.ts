import { Component } from '@angular/core';
import { slideAnimation } from '@animations';

/**
 * Privacy component
 */
@Component({
    selector: 'mate-team-privacy',
    templateUrl: './privacy.component.html',
    styleUrls: ['./privacy.component.scss'],
    animations: [slideAnimation]
})
export class PrivacyComponent {}
