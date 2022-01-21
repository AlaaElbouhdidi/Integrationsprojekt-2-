import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import {
    redirectLoggedInTo,
    canActivate
} from '@angular/fire/compat/auth-guard';

/**
 * Redirect authenticated user to group view
 */
const redirectAuthenticatedToHome = () => redirectLoggedInTo(['/group']);

/**
 * Register route
 */
const route = {
    path: 'register',
    component: RegisterComponent,
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
export class RegisterRoutingModule {}
