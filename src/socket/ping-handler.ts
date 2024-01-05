import { config } from '../config';

// 15초마다 보냄 | sendbird 연결에서 쓰이지 않음
export function addPingHandler() {
  const pingHandler = async () => {
    console.log('[ + ] Send Ping...');
    setTimeout(pingHandler, config.pingInterval);
  }
  pingHandler();
}