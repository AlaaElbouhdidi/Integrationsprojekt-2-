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
import { AuthHandlerModule } from '@auth-handler';
import { SlideshowModule } from '@slideshow';
import { CreateEventModule } from '@create-event';

@NgModule({
    exports: [
        CommonModule,
        ServicesModule,
        HeaderModule,
        LoaderModule,
        RegisterModule,
        SlideshowModule,
        RegisterFormModule,
        AlertModule,
        LoginModule,
        LandingpageModule,
        FooterModule,
        AuthHandlerModule,
        AngularFireFunctionsModule,
        StylesModule,
        CreateEventModule,
    ],
})
export class CoreModule {}
