import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import {
    canActivate,
    redirectLoggedInTo
} from '@angular/fire/compat/auth-guard';

/**
 * Redirect authenticated user to group view
 */
const redirectAuthenticatedToHome = () => redirectLoggedInTo(['/group']);

/**
 * Login route
 */
const route = {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectAuthenticatedToHome)
};

/**
 * Routes
 */
const routes: Routes = [route];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule {}
