import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import {
    redirectLoggedInTo,
    canActivate,
} from '@angular/fire/compat/auth-guard';

const redirectAuthenticatedToHome = () => redirectLoggedInTo(['/']);

const route = {
    path: 'register',
    component: RegisterComponent,
    ...canActivate(redirectAuthenticatedToHome),
};

const routes: Routes = [route];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RegisterRoutingModule {}
