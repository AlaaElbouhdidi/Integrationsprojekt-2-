import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [CommonModule, RouterModule, NgbModule],
    declarations: [FooterComponent],
    exports: [FooterComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FooterModule {}
