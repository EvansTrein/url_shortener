import type { IAnalytic, IUrl } from './types';

const BASE_URL = 'http://localhost:3000';

export class UrlService {
  constructor() {}

  public async shorten(originalUrl: string, expiresAt?: string): Promise<string> {
    try {
      const response = await fetch(`${BASE_URL}/shorten`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originalUrl,
          ...(expiresAt && { expiresAt }),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('HTTP error:', errorData);
        alert(`HTTP error! status: ${response.status}`);
        return '';
      }

      const data = await response.json();

      return data.shortUrl;
    } catch (error) {
      console.error('Error in shorten request:', error);
      alert('Error in shorten request');
      return '';
    }
  }

  public async redirect(shortUrl: string): Promise<void> {
    try {
      const response = await fetch(shortUrl);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('HTTP error:', errorData);
        alert(`HTTP error! status: ${response.status}`);
        return;
      }

      const data = await response.json();

      const originalUrl = data.originalUrl;

      window.open(originalUrl, '_blank');
    } catch (error) {
      console.error('Error when following a short link:', error);
      alert('Failed to follow the link');
    }
  }

  public async info(shortUrl: string): Promise<IUrl | null> {
    try {
      const url = shortUrl.split('/').pop();

      if (!shortUrl) {
        console.warn('Short URL is missing in the path');
        return null;
      }

      const response = await fetch(`${BASE_URL}/info/${url}`);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('HTTP error:', errorData);
        alert(`Error: ${errorData.status}`);
        return null;
      }

      const data = await response.json();

      const urlInfo: IUrl = {
        originalUrl: data.originalUrl,
        shortUrl: data.shortUrl,
        expiresAt: new Date(data.expiresAt),
        createdAt: new Date(data.createdAt),
        clickCount: data.clickCount,
      };

      return urlInfo;
    } catch (error) {
      console.error('Failed to fetch URL info:', error);
      alert('Failed to load information about the URL');
      return null;
    }
  }

  public async deleteUrl(shortUrl: string): Promise<void> {
    try {
      const url = shortUrl.split('/').pop();

      if (!shortUrl) {
        console.warn('Short URL is missing in the path');
        return;
      }

      const response = await fetch(`${BASE_URL}/delete/${url}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.error('HTTP error:', response.status);
        alert(`Error deleting URL: HTTP ${response.status}`);
        return;
      }

      alert('URL successfully deleted');
    } catch (error) {
      console.error('Failed to delete URL:', error);
      alert('An error occurred while deleting the URL');
    }
  }

  public async analytic(shortUrl: string): Promise<IAnalytic | null> {
    try {
      const url = shortUrl.split('/').pop();

      if (!shortUrl) {
        console.warn('Short URL is missing in the path');
        return null;
      }

      const response = await fetch(`${BASE_URL}/analytics/${url}`);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('HTTP error:', errorData);
        alert(`Error fetching analytics: ${errorData.message || 'Unknown error'}`);
        return null;
      }

      const data = await response.json();

      const urlAnalytic: IAnalytic = {
        totalRedirects: data.totalRedirects,
        lastIps: data.lastIps,
      };

      return urlAnalytic;
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      alert('Failed to load analytics data');
      return null;
    }
  }
}
