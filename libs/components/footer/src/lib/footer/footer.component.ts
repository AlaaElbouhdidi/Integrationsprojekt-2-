import { Component } from '@angular/core';
import { environment } from '@env';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'mate-team-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
    /**
     * Api URL
     */
    apiUrl: string = environment.apiUrl;

    /**
     * Constructor
     * @param config {NgbDropdownConfig}
     */
    constructor(config: NgbDropdownConfig) {
        config.placement = 'top';
    }
}
