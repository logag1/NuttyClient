/**
 * @author Syail
 */

import * as EncHex from 'crypto-js/enc-hex';
import HmacSHA512 from 'crypto-js/hmac-sha512';

const PHONE_CODE_SECRET_KEY = 'WHtEMrintmJ933QHEraAE06RBZLPVm06tiAwa9UB';

export function generateSignature(phoneNumber: string, code: string) {
  const body = {
    phoneNumber,
    countryCode: '82',
    code
  }
  const bodyStr = JSON.stringify(body);
  const signature = EncHex.stringify(
    HmacSHA512(
      bodyStr
        .split('')
        .reverse()
        .map((c) => String.fromCharCode(c.charCodeAt(0) + 1))
        .join(''),
      PHONE_CODE_SECRET_KEY.split('')
        .reverse()
        .map((c, i) => (i % 2 === 0 ? String.fromCharCode(c.charCodeAt(0) + 1) : c + String.fromCharCode(i + 40)))
        .join('')
    )
  );

  return signature
}

console.log(generateSignature('01028523402', 'VeKHeoyaWlo'));