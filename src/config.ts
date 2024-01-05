export interface DefaultConfig {
  sendbirdAppId: string;
  clientType: string;
  clientCodeVersion: string;
  clientVersion: string;
  uniqueId: string;
  pingInterval: number;

  userId: string;
  accessToken: string;

  rudaChannelUrl: string;
  daonChannelUrl: string;
}

export const config: DefaultConfig = {
  /**
   * 고정값, 수정X
   */
  sendbirdAppId: '0CA4ED98-B6A7-4F96-8568-AA387D31F0AF',
  clientType: 'android',
  clientCodeVersion: 'v95',
  clientVersion: '1.4.5',
  uniqueId: '6f8301490a1d3183',
  pingInterval: 15000,

  /**
   * NuttyClient에서 인증 받은 후 얻을 수 있음
   */
  userId: '',
  accessToken: '',

  /**
   * friend client에서 얻을 수 있는 AI들의 채널 url
   * 바꿀 필요 없음
   */
  rudaChannelUrl: 'e4b09ce93b1d43eb80242cdfce530317_d700eb6de31f43c6a57694f0705f1b7c',
  daonChannelUrl: 'e0d70ce201544f64b1db31f58201d91a_532b0a87f3004755a7f84baa049430d8'
}