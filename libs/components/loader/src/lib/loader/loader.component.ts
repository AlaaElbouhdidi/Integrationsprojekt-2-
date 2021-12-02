import { Component, Input } from '@angular/core';

@Component({
    selector: 'mate-team-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
    @Input() theme: 'dark' | 'light' = 'dark';
}
