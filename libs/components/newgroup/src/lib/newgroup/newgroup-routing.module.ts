import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewgroupComponent } from './newgroup.component';
import {
    AngularFireAuthGuard,
    emailVerified
} from '@angular/fire/compat/auth-guard';
import { map, pipe } from 'rxjs';

/**
 * Redirect unverified user to group view
 */
const redirectUnverifiedUser = () =>
    pipe(
        emailVerified,
        map((emailVerified) => {
            if (emailVerified) {
                return true;
            } else {
                return ['group'];
            }
        })
    );

/**
 * Routes
 */
const routes: Routes = [
    {
        path: '',
        component: NewgroupComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnverifiedUser }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NewgroupRoutingModule {}
