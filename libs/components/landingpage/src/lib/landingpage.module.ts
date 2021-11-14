import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LandingpageRoutingModule } from './landingpage/landingpage-routing.module';

@NgModule({
    declarations: [LandingpageComponent],
    imports: [CommonModule, LandingpageRoutingModule],
    exports: [LandingpageComponent],
})
export class LandingpageModule {}
