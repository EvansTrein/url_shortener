export interface IUrl {
  id: number;
  originalUrl: string;
  shortUrl: string;
  expiresAt: Date;
  createdAt: Date;
  clickCount: number;
}
