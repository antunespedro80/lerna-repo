import { Injectable } from '@nestjs/common';
import { SocketsDTO, SocketsEventsDTO } from '../dto/sockets.dto';
import { SocketsService } from './sockets.service';

@Injectable()
export class ChatSocketsService {
    constructor(private readonly socketsService: SocketsService) {}

    send(data: SocketsDTO<string>) {
        this.socketsService.send(SocketsEventsDTO.MESSAGE, data);
    }
}
