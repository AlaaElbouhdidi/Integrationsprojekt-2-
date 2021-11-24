"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var AppComponent = /** @class */ (function () {
    function AppComponent(alertService) {
        this.alertService = alertService;
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'mate-team-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss'],
            animations: [
                animations_1.trigger('alertAnimation', [
                    animations_1.transition(':enter', [
                        animations_1.style({ opacity: 0, transform: 'translateY(-2rem)' }),
                        animations_1.animate('200ms', animations_1.style({ opacity: 1, transform: 'translateY(0)' })),
                    ]),
                    animations_1.transition(':leave', [
                        animations_1.style({ transform: 'translateY(0)' }),
                        animations_1.animate('200ms', animations_1.style({ opacity: 0, transform: 'translateY(-2rem)' })),
                    ]),
                ]),
            ],
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
