import { injectable } from "tsyringe";
import { SocketEventListener } from "../objects/socket-event-listener";
import { Events, Responses, SocketConnection } from "../types";
import { RoomManager } from "../managers/room-manager";
import { Validate } from "../core/decorators/validate";
import { RoomDto } from "../dto/room.dto";

@injectable()
export class AddRoomEvent extends SocketEventListener {
  readonly eventName: Events = Events.ADD_ROOM;

  constructor(protected readonly roomManager: RoomManager) {
    super();
  }

  onEvent(@Validate(RoomDto) data: RoomDto, socket: SocketConnection): void {
    this.roomManager.createRoom(data.name);

    socket.broadcast.emit(Responses.ADDED_ROOM, data);
    socket.emit(Responses.ADDED_ROOM, data);
  }
}
