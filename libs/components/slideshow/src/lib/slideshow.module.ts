import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowComponent } from './slideshow/slideshow.component';

@NgModule({
    imports: [CommonModule],
    declarations: [SlideshowComponent],
    exports: [SlideshowComponent]
})
export class SlideshowModule {}
