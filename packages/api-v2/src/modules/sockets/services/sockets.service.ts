import { Injectable } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';
import { SocketsDTO, SocketsEventsDTO } from '../dto/sockets.dto';
import { TokenService } from '@app/modules/sockets/services/token.service';

@Injectable()
export class SocketsService {
    private socket: Socket;

    constructor(private readonly tokenService: TokenService) {
        this.initialize();
    }

    async initialize() {
        this.socket = io('http://127.0.0.1:8443', {
            secure: false,
            query: {
                token: this.tokenService.createToken(),
            },
        });

        this.socket.on('connect', () => console.log('connected successfully!'));

        this.socket.io.on('error', () => console.log('error when trying to connect!'));

        this.socket.io.on('reconnect_attempt', () => {
            const token = this.tokenService.createToken();

            this.socket.io.opts.query = {
                token,
            };
        });
    }

    send(event: SocketsEventsDTO, data: SocketsDTO<string>) {
        this.socket.emit(event, data);
    }
}
