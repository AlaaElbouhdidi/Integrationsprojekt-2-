import { Component } from '@angular/core';
import { slideAnimation } from '@animations';

/**
 * Landing page component
 */
@Component({
    selector: 'mate-team-landingpage',
    templateUrl: './landingpage.component.html',
    styleUrls: ['./landingpage.component.scss'],
    animations: [slideAnimation]
})
export class LandingpageComponent {}
