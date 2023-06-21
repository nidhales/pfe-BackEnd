import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  connectedClients: Set<WebSocket> = new Set();

  handleConnection(client: WebSocket) {
    this.connectedClients.add(client);

    client.send('Welcome to the chat!');
  }

  handleDisconnect(client: WebSocket) {
    this.connectedClients.delete(client);
  }

  handleMessage(client: WebSocket, message: string) {
    this.connectedClients.forEach((connectedClient) => {
      if (connectedClient !== client) {
        connectedClient.send(message);
      }
    });
  }
}
