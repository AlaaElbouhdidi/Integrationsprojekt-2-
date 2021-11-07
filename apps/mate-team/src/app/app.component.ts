import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@integrationsprojekt2/api-interfaces';
import { environment } from '../environments/environment';

@Component({
    selector: 'integrationsprojekt2-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    apiUrl: string = environment.apiUrl;
    hello$ = this.http.get<Message>(this.apiUrl);
    constructor(private http: HttpClient) {}
}
