import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GroupComponent } from './group.component';
import {
    redirectUnauthorizedTo,
    canActivate
} from '@angular/fire/compat/auth-guard';
import { MembersListComponent } from '../../../../group-members/members-list/src/lib/members-list/members-list.component';
import { GroupPollsEventsModule } from '@group-polls-events';
import { GroupPollsEventsComponent } from '../../../../group-polls-events/src/lib/group-polls-events/group-polls-events.component';
import { GroupsComponent } from '@groups';
import {
    GroupStatisticsListComponent
} from "@group-statistics-list";

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
            path: 'statistics',
            component: GroupStatisticsListComponent
        },
        {
            path: 'members',
            component: MembersListComponent
        }
    ]
};
const group = {
    path: 'group',
    component: GroupsComponent,
    ...canActivate(redirectUnauthenticatedToHome)
};
const routes = [group, route];

@NgModule({
    imports: [RouterModule.forChild(routes), GroupPollsEventsModule],
    exports: [RouterModule]
})
export class GroupRoutingModule {}
