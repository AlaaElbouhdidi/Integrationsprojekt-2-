import { Component, Input } from '@angular/core';

/**
 * Loader component
 */
@Component({
    selector: 'mate-team-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
    /**
     * Loader theme
     */
    @Input() theme: 'dark' | 'light' = 'dark';
}
