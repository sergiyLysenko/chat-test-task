import { injectable } from "tsyringe";
import { SocketEventListener } from "../objects/socket-event-listener";
import { Events, Responses, SocketConnection } from "../types";
import { RoomManager } from "../managers/room-manager";
import { Validate } from "../core/decorators/validate";
import { RoomDto } from "../dto/room.dto";

@injectable()
export class GetRoomMessagesEvent extends SocketEventListener {
  readonly eventName: Events = Events.GET_ROOM_MESSAGE;

  constructor(private readonly roomManager: RoomManager) {
    super();
  }

  onEvent(@Validate(RoomDto) data: RoomDto, socket: SocketConnection): void {
    const room = this.roomManager.getRoom(data.id);

    socket.emit(Responses.RECEIVE_ROOM_MESSAGE, room.getMessages());
  }
}
