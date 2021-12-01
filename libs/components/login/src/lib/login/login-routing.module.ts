import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import {
    canActivate,
    redirectLoggedInTo,
} from '@angular/fire/compat/auth-guard';

const redirectAuthenticatedToHome = () => redirectLoggedInTo(['/']);

const route = {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectAuthenticatedToHome),
};

const routes: Routes = [route];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LoginRoutingModule {}
