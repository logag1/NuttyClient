import { NuttyClient } from './api';
import readline from 'readline';

/**
 * @param client - NuttyClient
 * 
 * 1. requestPasscode
 * 2. verifyPhone (to send passcode)
 * 3. verifyBirth (birth check)
 * 4. getSessionToken (used in ?)
 */
export async function register(client: NuttyClient) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  await client.requestCode();

  await new Promise((resolve) => {
    rl.question('인증번호 4자리를 입력해주세요 >> ', async (code) => {
      const res = await client.verifyPhone(code);
      resolve(res);
      if (!res.isRegistered) {
        console.log('인증번호 입력을 감지하지 못했어요. 인증에 실패했습니다');
        return { success: false }
      }
    });
  });

  await client.verifyBirth();
  await client.setSessionToken();

  return { success: true, client }
}