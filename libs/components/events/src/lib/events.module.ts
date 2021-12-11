import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventGroupRoutingModule } from './event-group-routing.module';
import { UpcomingEventSectionMobileComponent } from './upcoming-event-section-mobile/upcoming-event-section-mobile.component';
import { EventItemMobileComponent } from './event-item-mobile/event-item-mobile.component';
import { EventItemScreenComponent } from './event-item-screen/event-item-screen.component';
import { EventModalDialogComponent } from './event-modal-dialog/event-modal-dialog.component';
import { EventsGroupItemScreenComponent } from './events-group-item-screen/events-group-item-screen.component';
import { EventsGroupsPageComponent } from './events-groups-page/events-groups-page.component';
import { EventsGroupsPageMobileComponent } from './events-groups-page-mobile/events-groups-page-mobile.component';
import { EventsGroupsPageScreenComponent } from './events-groups-page-screen/events-groups-page-screen.component';
import { GroupsModule } from '@groups';
import { UpcomingEventSectionScreenComponent } from './upcoming-event-section-screen/upcoming-event-section-screen.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// import {AngularFireModule} from "@angular/fire/compat";
// import {environment} from "@env";
import { LoaderModule } from '@loader';
import { EventService, GroupService } from '@services';

@NgModule({
    imports: [
        CommonModule,
        EventGroupRoutingModule,
        GroupsModule,
        HttpClientModule,
        FormsModule,
        LoaderModule
    ],
    declarations: [
        EventItemMobileComponent,
        EventItemScreenComponent,
        EventModalDialogComponent,
        EventsGroupItemScreenComponent,
        EventsGroupsPageComponent,
        EventsGroupsPageMobileComponent,
        EventsGroupsPageScreenComponent,
        UpcomingEventSectionMobileComponent,
        UpcomingEventSectionScreenComponent
    ],
    providers: [EventService, GroupService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [EventGroupRoutingModule]
})
export class EventsModule {}
