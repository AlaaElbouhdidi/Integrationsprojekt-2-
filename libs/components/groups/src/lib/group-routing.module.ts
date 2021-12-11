import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import {
// canActivate,
// redirectUnauthorizedTo
// } from '@angular/fire/compat/auth-guard';

// const redirectAuthenticatedToHome = () => redirectUnauthorizedTo(['/']);

const routes: Routes = [
    // {
    //     path: '',
    //     component: GroupDetailViewComponent,
    //     ...canActivate(redirectAuthenticatedToHome),
    // },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GroupRoutingModule {}
