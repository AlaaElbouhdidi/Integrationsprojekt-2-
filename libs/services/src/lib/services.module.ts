import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { AlertService } from './alert/alert.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { IconService } from './icon/icon.service';
import { PollService } from './poll/poll.service';
import { GroupService } from './group/group.service';
import { EventService } from './event/event.service';
import { TeamService } from './team/team.service';
import { UserService } from './user/user.service';

@NgModule({
    imports: [CommonModule, AngularFireAuthModule],
    providers: [
        AuthService,
        AlertService,
        IconService,
        PollService,
        GroupService,
        EventService,
        TeamService,
        UserService,
        AngularFireAuth
    ],
    exports: [AngularFireAuthModule]
})
export class ServicesModule {}
