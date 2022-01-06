import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GroupStatisticsComponent } from './group-statistics.component';
import {
    redirectUnauthorizedTo,
    canActivate
} from '@angular/fire/compat/auth-guard';

const redirectUnauthenticatedToHome = () => redirectUnauthorizedTo(['/']);

const route = {
    path: 'group-statistics',
    component: GroupStatisticsComponent,
    ...canActivate(redirectUnauthenticatedToHome)
};

const routes = [route];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GroupStatisticsRoutingModule {}
