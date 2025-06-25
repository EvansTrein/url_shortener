<template>
  <main class="main__wrap">
    <div class="main__input-wrap">
      <input class="main__input" type="text" v-model="currentUrl" required />
      <label class="main__input-label">URL</label>
    </div>
    <div class="main__btns">
      <btn class="main__btns-item" @click="onSubmit" text="Save url" />
      <btn class="main__btns-item" @click="onSubmit" text="Redirect" />
      <btn class="main__btns-item" @click="onSubmit" text="Info" />
      <btn class="main__btns-item" @click="onSubmit" text="Delete" />
    </div>
    <div class="main__loader" v-if="urlStore.isLoad">
      <loader />
    </div>
  </main>
</template>

<script setup lang="ts">
import btn from '../shared/button.vue';
import loader from '../shared/loader.vue';
import { useUrlStore } from '../entities/url/store';

const urlStore = useUrlStore();

const currentUrl = ref<string>('');

const onSubmit = () => {
  alert(currentUrl.value);
};
</script>

<style lang="scss">
@use '~/assets/styles/vars' as v;
@use '~/assets/styles/mixins' as m;

.main__wrap {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  position: relative;
  @include m.center80w;
  // @include m.debug1;
}

.main__input-wrap {
  display: flex;
  flex-direction: column;
  gap: 7px;
  position: relative;
  min-width: 400px;
	margin-top: 100px;
}

.main__input {
  width: 100%;
  height: 45px;
  border: none;
  outline: none;
  padding: 0px 7px;
  border-radius: 6px;
  font-size: 15px;
  background-color: var(--primary-color);
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 1), -1px -1px 6px rgb(0, 0, 0);

  &-label {
    font-size: 15px;
    padding-left: 10px;
    position: absolute;
    top: 13px;
    transition: var(--transition-fast);
    pointer-events: none;
    color: #000;
  }

  &:focus {
    border: 2px solid transparent;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1), -1px -1px 6px rgba(255, 255, 255, 0.4),
      inset 3px 3px 10px rgba(0, 0, 0, 1), inset -1px -1px 6px rgba(255, 255, 255, 0.4);
  }

  &:valid ~ .main__input-label,
  &:focus ~ .main__input-label {
    transition: var(--transition-fast);
    padding-left: 2px;
    transform: translateY(-35px);
  }

  &:valid,
  &:focus {
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 1), -1px -1px 6px rgba(255, 255, 255, 0.4),
      inset 3px 3px 10px rgba(0, 0, 0, 1), inset -1px -1px 6px rgba(255, 255, 255, 0.4);
  }
}

.main__btns {
  display: flex;
  gap: 1rem;

  &-item {
    border: 2px solid black;
    text-transform: uppercase;
  }
}

.main__loader {
  position: absolute;
  z-index: 10;
  // inset: 50px 0 auto 0;
  // margin: 0 auto;
  // @include m.debug;
}
</style>
