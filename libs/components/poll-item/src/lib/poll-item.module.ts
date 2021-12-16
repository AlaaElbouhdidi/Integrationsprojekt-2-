import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollItemComponent } from './poll-item/poll-item.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
      PollItemComponent
    ],
    exports: [PollItemComponent]
})
export class PollItemModule {}
