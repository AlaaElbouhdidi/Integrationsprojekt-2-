import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('@landingpage').then((m) => m.LandingpageModule),
    },
    {
        path: 'register',
        loadChildren: () => import('@register').then((m) => m.RegisterModule),
    },
    {
        path: 'login',
        loadChildren: () => import('@login').then((m) => m.LoginModule),
    },
    {
        path: 'newgroup',
        loadChildren: () => import('@newgroup').then((m) => m.NewgroupModule),
    },
    {
        path: 'auth/handler',
        loadChildren: () =>
            import('@auth-handler').then((m) => m.AuthHandlerModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
