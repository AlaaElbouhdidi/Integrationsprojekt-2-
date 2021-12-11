import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import {
    redirectUnauthorizedTo,
    canActivate
} from '@angular/fire/compat/auth-guard';

const redirectUnauthenticatedToHome = () => redirectUnauthorizedTo(['/']);

const route = {
    path: 'profile',
    component: ProfileComponent,
    ...canActivate(redirectUnauthenticatedToHome)
};

const routes = [route];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule {}
