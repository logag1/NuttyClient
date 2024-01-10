import axios from 'axios';
import { setAuthInitialHeader, generateSignature } from '../utilities';
import { config } from '../config';
import { AuthInfo } from '../types';

export class AuthClient {
  constructor(
    public _info: AuthInfo
  ) { }

  get baseApiUrl() {
    return 'https://api-messenger.pingpong.us';
  }

  async requestCode() {
    const res = await axios({
      method: 'POST',
      url: `${this.baseApiUrl}/phone/code`,
      data: {
        phoneNumber: this._info.phoneNum,
        countryCode: this._info.countryCode,
        code: 'VeKHeoyaWlo' // include in SMS code
      },
      headers: {
        ...setAuthInitialHeader(),
        'X-Nutty-Signature': generateSignature(this._info.phoneNum, 'VeKHeoyaWlo')
      }
    });

    return res.data;
  }

  /**
   * @description GET Temp Token
   */
  async verifyPhone(code: string) {
    const res = await axios({
      method: 'POST',
      url: `${this.baseApiUrl}/phone/verify`,
      data: {
        code: code,
        phoneNumber: this._info.phoneNum,
        countryCode: this._info.countryCode
      },
      headers: setAuthInitialHeader()
    });

    return res.data;
  }

  /**
   * @description GET Access, Refresh Token
   */
  async verifyBirth(tempToken: string) {
    const res = await axios({
      method: 'POST',
      url: `${this.baseApiUrl}/user/verify`,
      data: { birthdate: "2000-09-12" },
      headers: {
        ...setAuthInitialHeader(),
        'Authorization': `Bearer ${tempToken}`
      }
    });

    return res.data;
  }

  async setSessionToken(accessToken: string) {
    const res = await axios({
      method: 'POST',
      url: `${this.baseApiUrl}/user/messenger/session`,
      headers: {
        ...setAuthInitialHeader(),
        'Authorization': `Bearer ${accessToken}`
      }
    });

    return res.data;
  }

  async refreshAccessToken(refreshToken: string) {
    const res = await axios({
      method: 'PUT',
      url: `${this.baseApiUrl}/user/authentication/refresh`,
      data: { refreshToken },
      headers: setAuthInitialHeader()
    });

    return res.data;
  }
}