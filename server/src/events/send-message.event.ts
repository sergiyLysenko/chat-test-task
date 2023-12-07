import { injectable } from "tsyringe";
import { SocketEventListener } from "../objects/socket-event-listener";
import { Events, Responses, SocketConnection } from "../types";
import { RoomManager } from "../managers/room-manager";
import { MessageDto } from "../dto/message.dto";
import { Validate } from "../core/decorators/validate";

@injectable()
export class SendMessageEvent extends SocketEventListener {
  readonly eventName: Events = Events.SEND_MESSAGE;

  constructor(private readonly roomManager: RoomManager) {
    super();
  }

  onEvent(
    @Validate(MessageDto) data: MessageDto,
    socket: SocketConnection
  ): void {
    const room = this.roomManager.getRoom(data.roomID);

    if (!data.message) {
      throw new Error("Message cannot be empty");
    }

    room.pushMessage(data);

    socket.to(room.getId()).emit(Responses.RECEIVE_MESSAGE, data);
    socket.emit(Responses.RECEIVE_MESSAGE, data);
  }
}
