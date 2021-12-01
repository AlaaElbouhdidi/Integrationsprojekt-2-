import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LandingpageRoutingModule } from './landingpage/landingpage-routing.module';
import { SlideshowModule } from '@slideshow';

@NgModule({
    declarations: [LandingpageComponent],
    imports: [CommonModule, LandingpageRoutingModule, SlideshowModule],
    exports: [LandingpageComponent],
})
export class LandingpageModule {}
