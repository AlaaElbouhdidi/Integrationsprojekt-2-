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
import { ProfileModule } from '@profile';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
    faUser,
    faDragon,
    faFrog,
    faFish,
    faSpider,
    faChessKing,
    faDog,
    faCat,
    faHippo,
    faOtter
} from '@fortawesome/free-solid-svg-icons';

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
        ProfileModule,
        LoginModule,
        LandingpageModule,
        FooterModule,
        AuthHandlerModule,
        AngularFireFunctionsModule,
        FontAwesomeModule,
        StylesModule
    ],
})
export class CoreModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(
            faUser,
            faDragon,
            faFrog,
            faFish,
            faSpider,
            faChessKing,
            faDog,
            faCat,
            faOtter,
            faHippo
        );
    }
}
