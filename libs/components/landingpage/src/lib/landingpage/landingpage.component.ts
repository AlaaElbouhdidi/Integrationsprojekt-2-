import { Component } from '@angular/core';
import { AuthService } from '@services';
import { Router } from '@angular/router';

@Component({
    selector: 'mate-team-landingpage',
    templateUrl: './landingpage.component.html',
    styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent {
    loggedIn = false;
    constructor(authService: AuthService, routerService: Router) {
        authService.authState$.subscribe((x) => {
            if (x !== null) {
                this.loggedIn = true;
                routerService.navigate(['/events']);
            }
        });
    }
}
