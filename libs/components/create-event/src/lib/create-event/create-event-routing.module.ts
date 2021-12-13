import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
    redirectUnauthorizedTo,
    canActivate
} from '@angular/fire/compat/auth-guard';
import {CreateEventComponent} from "./create-event.component";

const redirectUnauthenticatedToHome = () => redirectUnauthorizedTo(['/']);

const route = {
    path: 'create-event',
    component: CreateEventComponent,
    ...canActivate(redirectUnauthenticatedToHome)
};

const routes = [route];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CreateEventRoutingModule {}
