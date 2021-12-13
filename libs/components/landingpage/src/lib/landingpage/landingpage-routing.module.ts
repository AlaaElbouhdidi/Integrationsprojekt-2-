import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingpageComponent } from './landingpage.component';
import {
    canActivate,
    redirectLoggedInTo
} from '@angular/fire/compat/auth-guard';

const redirectUnauthenticatedToHome = () => redirectLoggedInTo(['/events']);

const route = {
    path: '',
    component: LandingpageComponent,
    ...canActivate(redirectUnauthenticatedToHome)
};

const routes = [route];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LandingpageRoutingModule {}
