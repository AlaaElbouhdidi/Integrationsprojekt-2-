import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GroupComponent } from './group.component';
import {GroupStatisticsComponent} from "../../../../group-statistics/src/lib/group-statistics/group-statistics.component";
import {
    redirectUnauthorizedTo,
    canActivate
} from '@angular/fire/compat/auth-guard';
import { GroupPollsEventsModule } from '@group-polls-events';
import {
    GroupPollsEventsComponent
} from '../../../../group-polls-events/src/lib/group-polls-events/group-polls-events.component';
import {GroupStatisticsModule} from "@mate-team/group-statistics";

const redirectUnauthenticatedToHome = () => redirectUnauthorizedTo(['/']);

const route = {
    path: 'group/:id',
    component: GroupComponent,
    ...canActivate(redirectUnauthenticatedToHome),
    children: [
        // components get replaced by each individual group nav component (events, chat, statistics, members)
        {
            path: 'events',
            component: GroupPollsEventsComponent
        },
        {
            path: 'chat',
            component: GroupComponent
        },
        {
            path: 'statistics',
            component: GroupStatisticsComponent
        },
        {
            path: 'members',
            component: GroupComponent
        }
    ]
};

const routes = [route];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        GroupPollsEventsModule,
        GroupStatisticsModule
    ],
    exports: [RouterModule]
})
export class GroupRoutingModule {}
