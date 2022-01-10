import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventGroupRoutingModule } from './event-group-routing.module';
import { EventItemScreenComponent } from './event-item-screen/event-item-screen.component';
import { EventModalDialogComponent } from './event-modal-dialog/event-modal-dialog.component';
import { EventsGroupItemScreenComponent } from './events-group-item-screen/events-group-item-screen.component';
import { EventsGroupsPageComponent } from './events-groups-page/events-groups-page.component';
import { EventsGroupsPageScreenComponent } from './events-groups-page-screen/events-groups-page-screen.component';
import { GroupsModule } from '@groups';
import { UpcomingEventSectionScreenComponent } from './upcoming-event-section-screen/upcoming-event-section-screen.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
        EventItemScreenComponent,
        EventModalDialogComponent,
        EventsGroupItemScreenComponent,
        EventsGroupsPageComponent,
        EventsGroupsPageScreenComponent,
        UpcomingEventSectionScreenComponent
    ],
    providers: [EventService, GroupService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [EventGroupRoutingModule]
})
export class EventsModule {}
