import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePollFormComponent } from './create-poll-form/create-poll-form.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
      CreatePollFormComponent
    ],
    exports: [CreatePollFormComponent]
})
export class CreatePollFormModule {}
