import { InjectionToken, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

/**
 * External url provider
 */
const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

/**
 * App routes
 */
const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('@landingpage').then((m) => m.LandingpageModule)
    },
    {
        path: 'register',
        loadChildren: () => import('@register').then((m) => m.RegisterModule)
    },
    {
        path: 'login',
        loadChildren: () => import('@login').then((m) => m.LoginModule)
    },
    {
        path: 'newgroup',
        loadChildren: () => import('@newgroup').then((m) => m.NewgroupModule)
    },
    {
        path: 'auth/handler',
        loadChildren: () =>
            import('@auth-handler').then((m) => m.AuthHandlerModule)
    },
    {
        path: 'externalRedirect',
        canActivate: [externalUrlProvider],
        // We need a component here because we cannot define the route otherwise
        component: AppComponent
    },
    {
        path: 'profile',
        loadChildren: () => import('@profile').then((m) => m.ProfileModule)
    },
    {
        path: 'imprint',
        loadChildren: () => import('@imprint').then((m) => m.ImprintModule)
    },
    {
        path: 'privacy',
        loadChildren: () => import('@privacy').then((m) => m.PrivacyModule)
    },
    {
        path: 'group/:id',
        loadChildren: () => import('@group').then((m) => m.GroupModule)
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    providers: [
        {
            provide: externalUrlProvider,
            useValue: (route: ActivatedRouteSnapshot) => {
                const externalUrl = route.paramMap.get('externalUrl');
                if (externalUrl) window.open(externalUrl, '_self');
            }
        }
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
