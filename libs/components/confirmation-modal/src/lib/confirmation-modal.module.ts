import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
    ],
    declarations: [
      ConfirmationModalComponent
    ],
    exports: [ConfirmationModalComponent]
})
export class ConfirmationModalModule {}
