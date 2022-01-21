import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import {
    redirectUnauthorizedTo,
    canActivate
} from '@angular/fire/compat/auth-guard';

/**
 * Redirect unauthenticated user to landing page
 */
const redirectUnauthenticatedToHome = () => redirectUnauthorizedTo(['/']);

/**
 * Profile route
 */
const route = {
    path: 'profile',
    component: ProfileComponent,
    ...canActivate(redirectUnauthenticatedToHome)
};

/**
 * Routes
 */
const routes = [route];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule {}
