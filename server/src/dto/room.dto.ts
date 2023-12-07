import { IsString } from "class-validator";

export class RoomDto {
  @IsString()
  name!: string;

  @IsString()
  id!: string;

  constructor(obj: any) {
    Object.assign(this, obj);
  }
}
