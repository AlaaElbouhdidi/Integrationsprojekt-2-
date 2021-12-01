import { Logger, UnauthorizedException } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { environment } from '@env';
import * as admin from 'firebase-admin';
import { FirebaseService } from '../../firebase/service/firebase.service';

@WebSocketGateway({
    cors: { origin: [environment.apiUrl] },
})
export class AppGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer()
    server: Server;
    private logger: Logger = new Logger('AppGateway');
    constructor(private firebaseService: FirebaseService) {}

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

    @SubscribeMessage('msgToServer')
    handleMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() payload: unknown
    ) {
        this.logger.log(`Client : ${client.id}`);
        this.logger.log(payload);
        this.server.emit('msgToClient', payload);
    }
}
