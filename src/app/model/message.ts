export class Message {
  sender: string;
  messageType: MessageType;
  content: string;

  constructor(sender: string, messageType: MessageType, content: string) {
    this.sender = sender;
    this.messageType = messageType;
    this.content = content;
  }
}

export enum MessageType {
  INVITE_TO_JOIN_TEAM = 'INVITE_TO_JOIN_TEAM',
  REQUEST_TO_JOIN_TEAM = 'REQUEST_TO_JOIN_TEAM',
  INVITE_TO_SCRIMS = 'INVITE_TO_SCRIMS',
  SYSTEM_ALERT = 'SYSTEM_ALERT',
}
