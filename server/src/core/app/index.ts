import { container, InjectionToken, singleton } from "tsyringe";
import express, { Express } from "express";
import { Server as SocketServer } from "socket.io";
import { createServer, Server as HttpServer } from "http";
import {
  DefaultEventsMap,
  EventsMap,
  StrictEventEmitter,
} from "socket.io/dist/typed-events";
import { ServerReservedEventsMap } from "socket.io/dist/namespace";
import { SocketEventListener } from "../../objects/socket-event-listener";
import { Responses } from "../../types";
import { validate } from "class-validator";
import { VALIDATE_METADATA_KEY } from "../decorators/validate";

export type ConnectionListenerParams<
  EMap extends EventsMap = DefaultEventsMap
> = Parameters<
  StrictEventEmitter<
    EMap,
    EMap,
    ServerReservedEventsMap<EMap, EMap, EMap, any>
  >["on"]
>;

@singleton()
export class App {
  private readonly expressInstance: Express;
  private readonly httpInstance: HttpServer;
  private readonly socketInstance: SocketServer;

  private readonly conListeners: InjectionToken<SocketEventListener>[] = [];

  constructor() {
    this.expressInstance = express();
    this.httpInstance = createServer(this.expressInstance);
    this.socketInstance = new SocketServer(this.httpInstance, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });
  }

  registerConnectionListener = <
    T extends InjectionToken<SocketEventListener> = InjectionToken<SocketEventListener>
  >(
    ...events: (T | T[])[]
  ) =>
    events.forEach((event) =>
      this.conListeners.push(...(Array.isArray(event) ? event : [event]))
    );

  startListener = () => {
    const listenerInstances = this.conListeners.map((listener) =>
      container.resolve(listener)
    );

    this.socketInstance.on("connection", (socket) => {
      listenerInstances.forEach((listener) => {
        socket.on(listener.eventName, async (data) => {
          try {
            const validateMetadata = Reflect.getMetadata(
              VALIDATE_METADATA_KEY,
              listener,
              listener.onEvent.name
            );

            if (validateMetadata) {
              const validateInstance = new validateMetadata.classType(data);
              const errors = await validate(validateInstance, {
                whitelist: true,
              });

              if (errors.length) {
                throw new Error("Data did not pass Validation");
              }
            }

            listener.onEvent(data, socket);
          } catch (e: unknown) {
            const error = e as Error;

            socket.emit(Responses.ERROR, {
              error: {
                type: listener.eventName,
                message: error.message,
              },
            });
          }
        });
      });
    });

    this.httpInstance.listen(3001, () => {
      console.log("SERVER RUNNING");
    });
  };
}
