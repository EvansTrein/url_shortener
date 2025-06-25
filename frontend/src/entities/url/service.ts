import type { IUrl } from './types';

const BASE_URL = 'http://localhost:3000';

export class UrlService {
  constructor() {}

  public async loadData(period: string): Promise<IUrl[]> {
    try {
      const response = await fetch(`${BASE_URL}/api/rate?period=${period}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const rates: IUrl[] = data.map((item: { timestamp: number; price: number }) => ({
				timestamp: item.timestamp,
				price: item.price,
			}));

      return rates;
    } catch (error) {
      console.error('Error loading rates:', error);
      return [];
    }
  }
}
