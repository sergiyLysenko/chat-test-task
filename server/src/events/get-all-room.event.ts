import { injectable } from "tsyringe";
import { SocketEventListener } from "../objects/socket-event-listener";
import { Events, JsonObject, Responses, SocketConnection } from "../types";
import { RoomManager } from "../managers/room-manager";
import { RoomDto } from "../dto/room.dto";

@injectable()
export class GetAllRoomEvent extends SocketEventListener {
  readonly eventName: Events = Events.GET_ALL_ROOMS;

  constructor(private readonly roomManager: RoomManager) {
    super();
  }

  onEvent(data: JsonObject, socket: SocketConnection): void {
    socket.emit(
      Responses.ALL_ROOMS,
      this.roomManager.getAllRooms().map(
        (room): RoomDto => ({
          name: room.getName(),
          id: room.getId(),
        })
      )
    );
  }
}
