import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import {
    redirectLoggedInTo,
} from '@angular/fire/compat/auth-guard';

const redirectAuthenticatedToHome = () => redirectLoggedInTo(['/']);

const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [redirectAuthenticatedToHome()]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegisterRoutingModule {}
