import fs from 'fs';
import { NuttyClient } from "./src/api";
import { ChatManager } from "./src/socket";
import { register } from './src/auth';
import { delay, getTime } from "./src/utilities";
import { UserMessage } from "sendbird";
import { config } from './src/config';

// sendbird에 직접 연결하는 방식에선 쓰이지 않음
const client = new NuttyClient({
  phoneNum: '',
  countryCode: '82',
});
const chatManager = new ChatManager();

let rudaChat = '';
let daonChat = '';

function _Log(content: string) {
  console.log(content);
  fs.appendFileSync('./logs.log', `${content}\n`, 'utf8');
}

async function sendToRuda(text: string) {
  const rudaChannel = await chatManager.getChannel(config.rudaChannelUrl);

  await rudaChannel.sendUserMessage(text, async (sentMessage, error) => {
    _Log(`[${getTime(new Date)}] 다온/나 => 이루다 | ${text}`);

    daonChat = '';
    await delay(3000);

    const message = await chatManager.getLastMessage(rudaChannel) as UserMessage;

    if (!message) return console.log('Err 메시지가 없어요');
    // 내가 아닌 경우만 이루다 챗 저장
    if (message.sender?.nickname !== '성이름') rudaChat = message.message as string;

    sendToDaon(); // 저장된 메시지로 보내기에 파라미터 필요X
  });
}

async function sendToDaon() {
  const daonChannel = await chatManager.getChannel(config.daonChannelUrl);

  await daonChannel.sendUserMessage(rudaChat, async (sentMessage, error) => {
    _Log(`[${getTime(new Date)}] 이루다 => 다온 | ${rudaChat}`);

    rudaChat = '';
    await delay(3000);

    const message = await chatManager.getLastMessage(daonChannel) as UserMessage;

    if (!message) return _Log('Err 메시지가 없어요');
    if (message.sender?.nickname !== '성이름') daonChat = message.message as string;

    sendToRuda(message.message as string);
  });
};


(async () => {
  //const registerRes = await register(client);
  //if (!registerRes.success) throw new Error('계정 로그인을 실패했어요');
  //console.log(registerRes);

  chatManager.connect();

  // 이루다 => 다온 시작할 메시지
  sendToRuda('ㅋㅋㅋㅋ');

})();


