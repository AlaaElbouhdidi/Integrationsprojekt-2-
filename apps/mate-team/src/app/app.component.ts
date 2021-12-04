import { Component, OnInit } from '@angular/core';
import { AlertService } from '@services';
import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';

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
    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient, public alertService: AlertService) {}
    ngOnInit() {
        console.log(this.http.get<Event[]>(this.apiUrl + '/event').subscribe());
    }
}
