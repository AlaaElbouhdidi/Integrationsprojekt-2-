import { NgModule } from '@angular/core';
import {
    canActivate,
    redirectLoggedInTo
} from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage.component';

/**
 * Redirect authenticated user to group view
 */
const redirectAuthenticatedToGroup = () => redirectLoggedInTo(['/group']);

/**
 * Landing page route
 */
const route = {
    path: '',
    component: LandingpageComponent,
    ...canActivate(redirectAuthenticatedToGroup)
};

/**
 * Routes
 */
const routes: Routes = [route];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LandingpageRoutingModule {}
