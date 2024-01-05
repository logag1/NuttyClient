export interface AuthInfo {
  phoneNum: string;
  countryCode: string;
}

export interface PhoneVerifyRes {
  isRegistered: boolean;
  tempToken: string;
}

export interface BirthVerifyRes {
  accessToken: string;
  refreshToken: string;
}