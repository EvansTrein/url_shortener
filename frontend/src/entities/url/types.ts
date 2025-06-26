export interface IUrl {
  originalUrl: string;
  shortUrl: string;
  expiresAt: Date;
  createdAt: Date;
  clickCount: number;
}

export interface IAnalytic {
  totalRedirects: number;
  lastIps: string[];
}
