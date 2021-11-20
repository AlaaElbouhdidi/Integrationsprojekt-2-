import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthHandlerComponent } from './auth-handler.component';

const routes: Routes = [
    {
        path: 'auth/handler',
        component: AuthHandlerComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthHandlerRoutingModule {}
