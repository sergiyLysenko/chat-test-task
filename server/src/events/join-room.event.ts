import { injectable } from "tsyringe";
import { SocketEventListener } from "../objects/socket-event-listener";
import { Events, Responses, SocketConnection } from "../types";
import { JoinRoomDto } from "../dto/join-room.dto";
import { Validate } from "../core/decorators/validate";

@injectable()
export class JoinRoomEvent extends SocketEventListener {
  eventName: Events = Events.JOIN_ROOM;

  onEvent(
    @Validate(JoinRoomDto) data: JoinRoomDto,
    socket: SocketConnection
  ): void {
    socket.join(data.roomID);
    socket.emit(Responses.JOINED_ROOM, { roomID: data.roomID });
    console.log(`User with ID: ${socket.id} joined room: ${data.roomID}`);
  }
}
