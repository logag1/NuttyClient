import axios from 'axios';
import { setAuthInitialHeader } from '../utilities';
import { config } from '../config';

export class FriendClient {
  constructor(
    private _accessToken: string
  ) { }

  async getFriends(friendId = '') {
    const res = await axios({
      method: 'GET',
      url: `https://api-messenger.pingpong.us/friends/${friendId}`,
      headers: {
        ...setAuthInitialHeader(),
        'Authorization': `Bearer ${this._accessToken}`,
      }
    });

    return res.data;
  }
}