import { Message } from "../types";
import { IsString } from "class-validator";

export class MessageDto implements Message {
  @IsString()
  roomID!: string;

  @IsString()
  author!: string;

  @IsString()
  date!: Date;

  @IsString()
  message!: string;

  constructor(obj: any) {
    Object.assign(this, obj);
  }
}
