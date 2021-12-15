import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { AlertService } from './alert/alert.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { IconService } from './icon/icon.service';
import { PollService } from './poll/poll.service';
import { GroupService } from './group/group.service';

@NgModule({
    imports: [CommonModule, AngularFireAuthModule],
    providers: [
        AuthService,
        AlertService,
        IconService,
        PollService,
        GroupService,
        AngularFireAuth
    ],
    exports: [AngularFireAuthModule]
})
export class ServicesModule {}
