import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GroupComponent } from './group.component';
import {
    redirectUnauthorizedTo,
    canActivate
} from '@angular/fire/compat/auth-guard';

const redirectUnauthenticatedToHome = () => redirectUnauthorizedTo(['/']);

const route = {
    path: 'group/:id',
    component: GroupComponent,
    ...canActivate(redirectUnauthenticatedToHome),
    children: [
        // components get replaced by each individual group nav component (events, chat, statistics, members)
        {
            path: 'events',
            component: GroupComponent
        },
        {
            path: 'chat',
            component: GroupComponent
        },
        {
            path: 'statistics',
            component: GroupComponent
        },
        {
            path: 'members',
            component: GroupComponent
        }
    ]
};

const routes = [route];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GroupRoutingModule {}
