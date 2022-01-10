import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BgAnimationComponent } from './bg-animation/bg-animation.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
      BgAnimationComponent
    ],
    exports: [BgAnimationComponent]
})
export class BgAnimationModule {}
