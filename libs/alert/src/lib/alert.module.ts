import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ServicesModule } from '@integrationsprojekt2/services'

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        ServicesModule
     ],
    declarations: [AlertComponent],
    exports: [AlertComponent],
})
export class AlertModule {}
