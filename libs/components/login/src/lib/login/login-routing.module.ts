import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import {
    redirectLoggedInTo,
    canActivate,
} from '@angular/fire/compat/auth-guard';

const redirectAuthenticatedToHome = () => redirectLoggedInTo(['/']);

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        ...canActivate(redirectAuthenticatedToHome),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LoginRoutingModule {}
