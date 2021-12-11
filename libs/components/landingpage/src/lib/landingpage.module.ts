import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LandingpageRoutingModule } from './landingpage/landingpage-routing.module';
import { SlideshowModule } from '@slideshow';
import { EventsModule } from '@events';

@NgModule({
    declarations: [LandingpageComponent],
    imports: [
        CommonModule,
        LandingpageRoutingModule,
        EventsModule,
        SlideshowModule
    ],
    exports: [LandingpageComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LandingpageModule {}
