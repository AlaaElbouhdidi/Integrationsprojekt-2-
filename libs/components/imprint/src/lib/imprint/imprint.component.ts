import { Component } from '@angular/core';
import { slideAnimation } from '@animations';

/**
 * Imprint component
 */
@Component({
    selector: 'mate-team-imprint',
    templateUrl: './imprint.component.html',
    styleUrls: ['./imprint.component.scss'],
    animations: [slideAnimation]
})
export class ImprintComponent {}
