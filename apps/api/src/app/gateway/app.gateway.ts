import { Logger } from '@nestjs/common';
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
        this.server.emit('msgToServer', 'Mate-Team');
    }

    @SubscribeMessage('msgToServer')
    handleMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() payload: unknown
    ) {
        this.logger.log(`Client : ${client.id}`);
        this.logger.log(payload)
        this.server.emit('msgToClient', payload);
    }
}
