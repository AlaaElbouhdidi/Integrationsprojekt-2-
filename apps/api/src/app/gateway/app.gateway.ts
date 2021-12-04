import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Logger, UnauthorizedException } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { environment } from '@env';
import { FirebaseService } from '../../firebase/service/firebase.service';
import { EventService } from '../../event/service/event.service';
import * as admin from 'firebase-admin';

@WebSocketGateway({
    cors: { origin: [environment.clientUrl] },
})
export class AppGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer()
    server: Server;
    private logger: Logger = new Logger('AppGateway');
    constructor(
        private eventService: EventService,
        private firebaseService: FirebaseService
    ) {}

    afterInit() {
        this.logger.log('Initialized');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    private disconnect(socket: Socket) {
        socket.emit('Error', new UnauthorizedException());
        socket.disconnect();
        this.logger.error(`Disconnected client: ${socket.id}`);
    }

    async handleConnection(socket: Socket) {
        try {
            this.logger.log(`Client connected: ${socket.id}`);
            const token: string = socket.handshake.headers.authorization;
            if (token == 'undefined') {
                this.logger.error(`Not signed in`);
                throw new UnauthorizedException();
            }
            const user: admin.auth.DecodedIdToken = await this.firebaseService
                .getAuth()
                .verifyIdToken(token, true);
            this.logger.log(user);
        } catch (err) {
            this.logger.error(err.message);
            this.disconnect(socket);
        }
    }
    // @SubscribeMessage('event')
    // async handleEvents(@ConnectedSocket() socket: Socket) {
    //     const events = await this.eventService.findAll()
    //     this.logger.log(`Client ${socket.id} requested events`)
    //     this.server.emit('event', events)
    // }
}
