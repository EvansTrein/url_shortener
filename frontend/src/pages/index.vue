<template>
  <main class="main__wrap">
    <div class="main__input-wrap">
      <input class="main__input" type="text" v-model="urlStore.currentUrl" required />
      <label class="main__input-label">URL</label>
      <button class="main__clear-btn" @click="clear">clear</button>
    </div>
    <div class="main__date">
      <label class="main__date-wrap">
        <input type="checkbox" v-model="isExpiresAt" />
        <svg viewBox="0 0 64 64" height="2em" width="2em">
          <path
            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
            pathLength="575.0541381835938"
            class="main__date-path"
          ></path>
        </svg>
      </label>
      <p>Expires At</p>
      <input class="main__date-val" type="date" v-model="currentDate" />
    </div>
    <div class="main__btns">
      <btn class="main__btns-item" @click="save" text="Save url" />
      <btn class="main__btns-item" @click="redirect" text="Redirect" />
      <btn class="main__btns-item" @click="info" text="Info" />
      <btn class="main__btns-item" @click="deleteUrl" text="Delete" />
      <btn class="main__btns-item" @click="analytic" text="Analytic" />
    </div>
    <Info />
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

const today = new Date();
today.setHours(today.getHours() + 24);
const todayStr = today.toISOString().split('T')[0];
const currentDate = ref<string>(todayStr);

const isExpiresAt = ref<boolean>(false);

function clear() {
  urlStore.currentUrl = '';
  urlStore.infoUrl = null;
  urlStore.infoAnalytic = null;
}

function save() {
  const expiresAt = isExpiresAt.value ? currentDate.value : undefined;
  urlStore.shorten(urlStore.currentUrl, expiresAt);
  isExpiresAt.value = false;
  currentDate.value = todayStr;
}

function redirect() {
  urlStore.redirect(urlStore.currentUrl);
}

function info() {
  urlStore.info(urlStore.currentUrl);
}

function deleteUrl() {
  urlStore.deleteUrl(urlStore.currentUrl);
}

function analytic() {
  urlStore.analytic(urlStore.currentUrl);
}
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
}

.main__input-wrap {
  display: flex;
  flex-direction: column;
  gap: 7px;
  position: relative;
  min-width: 450px;
  margin-top: 100px;
}

.main__input {
  width: 100%;
  height: 45px;
  border: none;
  outline: none;
  padding: 0px 7px;
  border-radius: var(--border-radius-m);
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
  flex-wrap: wrap;
  justify-content: center;

  &-item {
    border: 2px solid black;
    text-transform: uppercase;
  }
}

.main__date {
  display: flex;
  align-items: center;
  gap: 2rem;

  p {
    font-size: 20px;
    text-transform: uppercase;
  }

  &-val {
    background-color: transparent;
    border-bottom: 2px solid black;
    color: white;
    font-size: 20px;
  }

  &-path {
    fill: none;
    stroke: white;
    stroke-width: 6;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: stroke-dasharray 0.5s ease, stroke-dashoffset 0.5s ease;
    stroke-dasharray: 241 9999999;
    stroke-dashoffset: 0;
  }
}

.main__date-wrap {
  cursor: pointer;
  // @include m.debug1;

  & input {
    display: none;
  }

  & svg {
    overflow: visible;
  }

  & input:checked ~ svg .main__date-path {
    stroke-dasharray: 70.5096664428711 9999999;
    stroke-dashoffset: -262.2723388671875;
  }
}

.main__clear-btn {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  font-size: 20px;
  color: #333;
  cursor: pointer;
  padding: 0 6px;
  background: none;
  z-index: 1;
  border: 1px solid #333;
  border-radius: var(--border-radius-s);
  transition: var(--transition-fast);

  &:hover {
    background-color: #252525;
    color: #860202;
  }
}

.main__loader {
  position: absolute;
  z-index: 10;
  top: 50px;
  // inset: 50px 0 auto 0;
  // margin: 0 auto;
  // @include m.debug;
}
</style>
