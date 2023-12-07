import { IsString } from "class-validator";

export class JoinRoomDto {
  @IsString()
  roomID!: string;

  constructor(obj: any) {
    Object.assign(this, obj);
  }
}
