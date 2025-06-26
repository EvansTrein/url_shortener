<template>
  <section class="info__wrap">
    <div v-if="urlStore.infoUrl" class="info__url">
      <p><strong>Original URL:</strong> {{ urlStore.infoUrl.originalUrl }}</p>
      <p><strong>Short URL:</strong> {{ urlStore.infoUrl.shortUrl }}</p>
      <p><strong>Expires At:</strong> {{ new Date(urlStore.infoUrl.expiresAt).toLocaleString() }}</p>
      <p><strong>Created At:</strong> {{ new Date(urlStore.infoUrl.createdAt).toLocaleString() }}</p>
      <p><strong>Click Count:</strong> {{ urlStore.infoUrl.clickCount }}</p>
    </div>

    <div v-if="urlStore.infoAnalytic" class="info__analytic">
      <p><strong>Total Redirects:</strong> {{ urlStore.infoAnalytic.totalRedirects }}</p>
      <p><strong>Last IPs:</strong></p>
      <ul>
        <li v-for="(ip, index) in urlStore.infoAnalytic.lastIps" :key="index">{{ ip }}</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useUrlStore } from '../entities/url/store';

const urlStore = useUrlStore();
</script>

<style scoped lang="scss">
.info__wrap {
  display: flex;
	flex-direction: column;
	gap: 1rem;
}

.info__url,
.info__analytic {
  display: flex;
  flex-direction: column;
  min-width: 350px;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: var(--primary-color);
  padding: 1rem;
  border-radius: var(--border-radius-l);
  color: #000;
	animation: fadeIn var(--transition-slow) ease forwards;
}

.info__analytic ul {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	justify-content: center;
  align-items: center;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
