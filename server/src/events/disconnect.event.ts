import { injectable } from "tsyringe";
import { SocketEventListener } from "../objects/socket-event-listener";
import { Events, JsonObject, SocketConnection } from "../types";

@injectable()
export class DisconnectEvent extends SocketEventListener {
  readonly eventName: Events = Events.DISCONNECT;

  onEvent(data: JsonObject, socket: SocketConnection): void {
    console.log(data);
  }
}
