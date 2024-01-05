import SendBird, { SendBirdInstance, GroupChannel, UserMessage } from 'sendbird';
import { config } from '../config';

export class ChatManager {
  private _socket: SendBirdInstance | null;

  constructor() {
    this._socket = null;
  }

  async connect() {
    const socket = new SendBird({ appId: config.sendbirdAppId });
    socket.connect(config.userId, config.accessToken);
    this._socket = socket;
    return socket;
  }

  async getChannel(channelId: string) {
    if (!this._socket) throw new Error('Socket undefined');
    return await this._socket.GroupChannel.getChannel(channelId);
  }

  async getLastMessage(channel: GroupChannel) {
    return await (await channel).lastMessage as UserMessage;
  }
}