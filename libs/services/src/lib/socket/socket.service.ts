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
        this.socket = io(environment.apiUrl);
        this.socket.connect();
        console.log(this.socket);
    }
    listen = (event: string) =>
        new Observable((subscriber) => {
            this.socket.on(event, (data) => subscriber.next(data));
        });

    emit = (event: string, data: unknown) => {
        this.socket.emit(event, data);
    };
}
