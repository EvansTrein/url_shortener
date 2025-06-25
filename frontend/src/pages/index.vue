<template>
  <main class="main__wrap">
    
    <loader class="main__loader" v-if="rateStore.isLoad" />
  </main>
</template>

<script setup lang="ts">
import btn from '../shared/button.vue';
import loader from '../shared/loader.vue';
import { useRateStore } from '../store';

const rateStore = useRateStore();

const activeBtn = ref<string>('Day');

const setActiveBtn = (btnName: string) => {
  rateStore.loadData(btnName.toLowerCase());
  activeBtn.value = btnName;
};
</script>

<style lang="scss">
@use '~/assets/styles/vars' as v;
@use '~/assets/styles/mixins' as m;

.main__wrap {
  position: relative;
  height: 100vh;
  @include m.center80w;
  // @include m.debug1;
}

.main__loader {
  position: absolute;
  z-index: 10;
  top: -50%;
  margin: 0 auto;
  transform: translate(-50%, -50%);
  // @include m.debug;
}
</style>
