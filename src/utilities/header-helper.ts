import { config } from '../config';

export function setAuthInitialHeader(): Record<string, string> {
  const header: Record<string, string> = {}
  header['X-Client-Code-Version'] = config.clientCodeVersion;
  header['X-Client-Type'] = config.clientType;
  header['X-Client-Version'] = config.clientVersion;
  header['X-Client-Device-Unique-Id'] = config.uniqueId;
  header['Content-Type'] = 'application/json';
  return header;
}