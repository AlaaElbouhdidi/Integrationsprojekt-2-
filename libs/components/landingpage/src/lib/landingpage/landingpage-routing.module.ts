import { NgModule } from '@angular/core';
import {
    canActivate,
    redirectLoggedInTo
} from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage.component';

const redirectAuthenticatedToGroup = () => redirectLoggedInTo(['/group']);

const route = {
    path: '',
    component: LandingpageComponent,
    ...canActivate(redirectAuthenticatedToGroup)
};
const routes: Routes = [route];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LandingpageRoutingModule {}
