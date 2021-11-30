import { Logger } from '@nestjs/common';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { environment } from '@env';
import { Message } from '@api-interfaces';

@WebSocketGateway({
    cors: { origin: [environment.clientUrl, 'https://hoppscotch.io'] },
})
export class AppGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer()
    server: Server;
    private logger: Logger = new Logger('AppGateway');

    afterInit() {
        this.logger.log('Initialized');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, payload: Message) {
        this.logger.log(`Client : ${client.id}`);
        this.server.emit('msgToClient', payload);
    }
}
