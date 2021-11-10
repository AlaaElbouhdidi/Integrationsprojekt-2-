import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AlertService } from '@integrationsprojekt2/services'

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
     ],
    declarations: [AlertComponent],
    providers: [AlertService],
    exports: [AlertComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AlertModule {}
