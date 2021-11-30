import { Component, OnInit } from '@angular/core';
import { AlertService, SocketService } from '@services';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'mate-team-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('alertAnimation', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(-2rem)' }),
                animate(
                    '200ms',
                    style({ opacity: 1, transform: 'translateY(0)' })
                ),
            ]),
            transition(':leave', [
                style({ transform: 'translateY(0)' }),
                animate(
                    '200ms',
                    style({ opacity: 0, transform: 'translateY(-2rem)' })
                ),
            ]),
        ]),
    ],
})
export class AppComponent implements OnInit {
    constructor(
        public alertService: AlertService,
        private socket: SocketService
    ) {}
    ngOnInit = () => {
        this.socket.listen('msgToClient').subscribe((msg) => {
            console.log(msg);
        });
    };
}
