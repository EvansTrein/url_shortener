import { defineStore } from 'pinia';
import type { IUrl } from './types';
import { UrlService } from './service';

export const useUrlStore = defineStore('reteStore', () => {
  const data = ref<IUrl[]>([]);
  const service = new UrlService();
  const isLoad = ref<boolean>(false);

  async function loadData(period: string) {
    isLoad.value = true;
    data.value = await service.loadData(period);
    isLoad.value = false;
  }

  return { data, loadData, isLoad };
});
