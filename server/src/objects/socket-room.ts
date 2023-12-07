import { Message } from "../types";

export class SocketRoom {
  private readonly messages: Message[] = [];

  constructor(private readonly name: string, private readonly id: string) {}

  getId = () => this.id;
  getName = () => this.name;

  getMessages = () => this.messages;

  pushMessage = (msg: Message) => {
    if (!msg.message.trim()) {
      throw new Error("Message cannot be empty");
    }

    this.messages.push(msg);
  };
}
