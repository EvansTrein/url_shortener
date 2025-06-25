<template>
  <button class="button">{{ text }}</button>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>

<style scoped lang="scss">
@use '~/assets/styles/mixins' as m;
.button {
  cursor: pointer;
  background-color: var(--primary-color);
  border-radius: var(--border-radius-s);
  color: #fff;
  transition: var(--transition-fast);
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
	padding: 2px 2px;
  width: 100px;
	font-weight: bold;
}

@media (hover: hover) {
  button:hover {
    background-color: var(--primary-dark-color);
    color: black;
		border: 2px solid white;
  }
}
</style>
