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
import { ServicesModule } from '@services';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';
import { StylesModule } from '@styles';

@NgModule({
    exports: [
        CommonModule,
        ServicesModule,
        HeaderModule,
        LoaderModule,
        RegisterModule,
        RegisterFormModule,
        AlertModule,
        LoginModule,
        LandingpageModule,
        FooterModule,
        AngularFireFunctionsModule,
        StylesModule
    ],
})
export class CoreModule {}
