import { Directive, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { isNil } from 'ramda';

/**
 * External url directive
 */
@Directive({
    selector: 'a[mate-team-external-url]'
})
export class ExternalUrlDirective {
    /**
     * Constructor of external url directive
     * @param el {ElementRef}
     * @param router {Router}
     */
    constructor(private el: ElementRef, private router: Router) {}

    /**
     * Clicked
     *
     * @param event {Event} The event
     */
    @HostListener('click', ['$event'])
    clicked(event: Event) {
        const url = this.el.nativeElement.href;
        if (isNil(url)) {
            return;
        }

        this.router.navigate(['/externalRedirect', { externalUrl: url }], {
            skipLocationChange: true
        });

        event.preventDefault();
    }
}
