import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Socket, io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    socket: Socket;
    constructor() {
        this.socket = io(environment.wsHost, { path: environment.apiPath});
    }
    listen = (event: string) =>
        new Observable((subscriber) => {
            this.socket.on(event, (data) => subscriber.next(data));
        });
}
