import { Events, SocketConnection } from "../types";

export abstract class SocketEventListener {
  public abstract readonly eventName: Events;

  abstract onEvent(data: any, socket: SocketConnection): void;
}
