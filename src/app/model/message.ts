import { PositionType } from './team';

export class Message {
  id!: string;
  sender!: string;
  messageType: MessageType;
  content!: string;
  sendDate: Date;
  scrimsId!: string;
  positionType!: PositionType;

  constructor(messageType: MessageType) {
    this.sendDate = new Date();
    this.messageType = messageType;
  }
}

export enum MessageType {
  INVITE_TO_JOIN_TEAM = 'INVITE_TO_JOIN_TEAM',
  REQUEST_TO_JOIN_TEAM = 'REQUEST_TO_JOIN_TEAM',
  INVITE_TO_SCRIMS = 'INVITE_TO_SCRIMS',
  SYSTEM_ALERT = 'SYSTEM_ALERT',
}
