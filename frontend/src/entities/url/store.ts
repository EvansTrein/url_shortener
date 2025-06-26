import { defineStore } from 'pinia';
import type { IAnalytic, IUrl } from './types';
import { UrlService } from './service';

export const useUrlStore = defineStore('reteStore', () => {
  const currentUrl = ref<string>('');
  const infoUrl = ref<IUrl | null>(null);
  const infoAnalytic = ref<IAnalytic | null>(null);
  const service = new UrlService();
  const isLoad = ref<boolean>(false);

  async function shorten(originalUrl: string, expiresAt?: string) {
    isLoad.value = true;
    currentUrl.value = await service.shorten(originalUrl, expiresAt);
    isLoad.value = false;
  }

  async function redirect(shortUrl: string) {
    isLoad.value = true;
    await service.redirect(shortUrl);
    isLoad.value = false;
  }

  async function info(shortUrl: string) {
    isLoad.value = true;
    infoUrl.value = await service.info(shortUrl);
    isLoad.value = false;
  }

  async function deleteUrl(shortUrl: string) {
    isLoad.value = true;
    await service.deleteUrl(shortUrl);
    isLoad.value = false;
  }

  async function analytic(shortUrl: string) {
    isLoad.value = true;
    infoAnalytic.value = await service.analytic(shortUrl);
    isLoad.value = false;
  }

  return { shorten, isLoad, currentUrl, redirect, info, deleteUrl, analytic, infoUrl, infoAnalytic };
});
