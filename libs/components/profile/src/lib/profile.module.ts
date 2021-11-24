import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ProfileRoutingModule } from './profile/profile-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule
    ],
    declarations: [
      ProfileComponent
    ],
    exports: [ProfileComponent]
})
export class ProfileModule {}
