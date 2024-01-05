import { AuthClient } from "./auth-client";
import { AuthInfo } from '../types';
import { FriendClient } from "./friend-client";
import { PhoneVerifyRes, BirthVerifyRes, FriendListRes, FriendRes } from "../types";

interface ClientInstence {
  /**
   * @extends AuthClient
   */
  requestCode(): Promise<void>;
  verifyPhone(code: string): Promise<PhoneVerifyRes>;
  verifyBirth(): Promise<BirthVerifyRes>;
  setSessionToken(): Promise<{ sessionToken: string }>
  refreshAccessToken(refreshToken: string): Promise<{ accessToken: string }>

  /**
   * @extends FriendClient
   */
  getFriends(friendId: string): Promise<FriendListRes | FriendRes>
}

export class NuttyClient implements ClientInstence {
  private _authClient = new AuthClient(this._info);
  private _friendClient!: FriendClient;

  constructor(
    private readonly _info: AuthInfo,
    private _tempToken: string | null = null,
    private _accessToken: string | null = null,
    private _refreshToken: string | null = null,
    private _sessionToken: string | null = null
  ) { }

  /**
   * @description 인증번호 요청
   */
  async requestCode() {
    return await this._authClient.requestCode();
  }

  /**
   * @description 모바일 인증 후 tempToken 지정
   */
  async verifyPhone(code: string): Promise<PhoneVerifyRes> {
    const res = await this._authClient.verifyPhone(code);
    this._tempToken = res.tempToken;
    return res;
  }

  /** 
   * @description 생일 인증 후 accessToken 지정
   */
  async verifyBirth(): Promise<BirthVerifyRes> {
    if (!this._tempToken) throw new Error('Temp Token이 지정되지 않았습니다');
    const res = await this._authClient.verifyBirth(this._tempToken);
    this._accessToken = res.accessToken;
    this._refreshToken = res.refreshToken;
    return res;
  }

  /** 
   * @description 생일 인증 후 sessionToken 지정
   */
  async setSessionToken(): Promise<{ sessionToken: string }> {
    if (!this._accessToken) throw new Error('Access Token이 지정되지 않았습니다');
    const res = await this._authClient.setSessionToken(this._accessToken);
    this._sessionToken = res.sessionToken;
    return res;
  }

  /**
   * @description refresh token으로 accessToken 재발급
   */
  async refreshAccessToken(): Promise<{ accessToken: string }> {
    if (!this._refreshToken) throw new Error('Refresh Token이 지정되지 않았습니다');
    const res = await this._authClient.refreshAccessToken(this._refreshToken);
    this._accessToken = res.accessToken;
    return res;
  }

  /**
   * @description AI들의 정보를 가져옴
   * @param friendId - 빈 string: 모든 AI 정보, friendId: 해당 AI 정보
   */
  async getFriends(friendId = ''): Promise<FriendListRes | FriendRes> {
    if (!this._accessToken) throw new Error('Access Token이 지정되지 않았습니다');
    this._friendClient = new FriendClient('');
    return this._friendClient.getFriends(friendId);
  }
}