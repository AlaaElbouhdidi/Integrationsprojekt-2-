import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventComponent } from './create-event/create-event.component';
import { FormsModule } from '@angular/forms';
import {CreateEventRoutingModule} from "./create-event/create-event-routing.module";

@NgModule({
    imports: [CommonModule, FormsModule, CreateEventRoutingModule],
    declarations: [CreateEventComponent],
    exports: [CreateEventComponent]
})
export class CreateEventModule {}
