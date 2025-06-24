import { randomBytes } from 'crypto';
const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const BASE = ALPHABET.length;

export function generateRandomStr(length: number): string {
  let result = '';
  const bytes = randomBytes(length);

  for (let i = 0; i < length; i++) {
    result += ALPHABET[bytes[i] % BASE];
  }

  return result;
}

export function isValidUrl(url: string): boolean {
  const urlRegex = /^https?:\/\/(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(:[0-9]+)?(\/[^\s?]*)?(\?[^\s]*)?(#.*)?$/;
  return urlRegex.test(url);
}
