import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from '@header';
import { LoaderModule } from '@loader';
import { RegisterModule } from '@register';
import { RegisterFormModule } from '@register-form';
import { AlertModule } from '@alert';
import { LoginModule } from '@login';
import { LandingpageModule } from '@landingpage';
import { FooterModule } from '@footer';

@NgModule({
    exports: [
        CommonModule,
        HeaderModule,
        LoaderModule,
        RegisterModule,
        RegisterFormModule,
        AlertModule,
        LoginModule,
        LandingpageModule,
        FooterModule,
    ],
})
export class CoreModule {}
