import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AlertService } from '@services';

@NgModule({
    imports: [CommonModule, FontAwesomeModule],
    declarations: [AlertComponent],
    providers: [AlertService],
    exports: [AlertComponent],
})
export class AlertModule {}
