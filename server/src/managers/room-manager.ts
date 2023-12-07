import { singleton } from "tsyringe";
import { SocketRoom } from "../objects/socket-room";

@singleton()
export class RoomManager {
  private readonly rooms: SocketRoom[] = [];

  constructor() {
    this.createDefaultRoom();
  }

  createRoom = (room_name: string) => {
    this.rooms.push(
      new SocketRoom(room_name, String("room_" + this.rooms.length))
    )
  };

  getAllRooms = () => this.rooms;

  getRoom = (roomId: string) => {
    const findRoom = this.rooms.find((room) => roomId === room.getId());

    if (!findRoom) {
      throw new Error("Room was not found");
    }

    return findRoom;
  };

  private createDefaultRoom = () => {
    this.rooms.push(new SocketRoom("General Room", "room_0"));
  };
}
