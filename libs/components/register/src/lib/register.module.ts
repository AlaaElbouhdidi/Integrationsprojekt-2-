import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register/register-routing.module';
import { RegisterComponent } from './register/register.component';
import { RegisterFormModule } from '@register-form';
import { AlertModule } from '@alert';
import { BgAnimationModule } from '@bg-animation';

@NgModule({
    declarations: [RegisterComponent],
    imports: [
        CommonModule,
        AlertModule,
        RegisterRoutingModule,
        RegisterFormModule,
        BgAnimationModule
    ],
    exports: [RegisterComponent],
})
export class RegisterModule {}
