import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImprintComponent } from './imprint/imprint.component';
import { ImprintRoutingModule } from './imprint/imprint-routing.module';

@NgModule({
    imports: [CommonModule, ImprintRoutingModule],
    declarations: [ImprintComponent],
    exports: [ImprintComponent]
})
export class ImprintModule {}
