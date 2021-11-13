import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [LandingpageComponent],
    imports: [CommonModule, RouterModule],
    exports: [LandingpageComponent],
})
export class LandingpageModule {}
