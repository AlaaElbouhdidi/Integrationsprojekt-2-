import { Injectable } from '@angular/core';
// import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { Event } from '@api-interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { map } from 'rxjs/operators';

interface EventDto {
    id: string;
    name: string;
    description: string;
    participants: string[];
    date: Date;
}

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private apiUrl: string;
    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    getEvents(): Observable<Event[]> {
        return this.http.get<EventDto[]>(`${this.apiUrl}/event`).pipe(
            map((x) => {
                return x.map((z) => {
                    return {
                        id: z.id,
                        name: z.name,
                        description: z.description,
                        date: z.date
                    };
                });
            })
        );
    }
}
