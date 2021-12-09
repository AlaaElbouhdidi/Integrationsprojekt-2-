import { Component, OnInit } from '@angular/core';
import { AlertService } from '@services';
import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { map, Observable } from 'rxjs';
import { Event } from '@api-interfaces';

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
                )
            ]),
            transition(':leave', [
                style({ transform: 'translateY(0)' }),
                animate(
                    '200ms',
                    style({ opacity: 0, transform: 'translateY(-2rem)' })
                )
            ])
        ])
    ]
})
export class AppComponent implements OnInit {
    apiUrl = environment.apiUrl;
    events$: Observable<Event[]> = this.getEvents();
    constructor(private http: HttpClient, public alertService: AlertService) {}
    ngOnInit() {
        this.events$
            .pipe(
                map((events: Event[]) =>
                    events.forEach((event: Event) => {
                        console.log(event);
                    })
                )
            )
            .subscribe();
    }
    getEvents() {
        return (this.events$ = this.http.get<Event[]>(`${this.apiUrl}/event`));
    }
}
