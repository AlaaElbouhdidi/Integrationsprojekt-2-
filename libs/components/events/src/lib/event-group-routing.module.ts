import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    redirectLoggedInTo,
    canActivate, redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { EventsGroupsPageComponent } from './events-groups-page/events-groups-page.component';

const redirectAuthenticatedToHome = () => redirectUnauthorizedTo(['/']);

const routes: Routes = [
    {
        path: '',
        component: EventsGroupsPageComponent,
        ...canActivate(redirectAuthenticatedToHome),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EventGroupRoutingModule {}
