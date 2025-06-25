<template>
  <div class="ring">
    <span>Powered by Evans Tein's</span>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.ring {
  width: 180px;
  height: 180px;
  border: 5px solid #0ff;
  box-shadow: 0 0 25px #0ff, 0 0 60px #0ff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  animation: spin 10s linear infinite;
  position: relative;
	background-color: rgba(60, 60, 60, 0.7);

  &::before {
    content: '';
    width: 180px;
    height: 180px;
    border: 5px dashed rgb(0, 0, 0);
    border-radius: 50%;
    position: absolute;
    opacity: 0.2;
    animation: pulse 3s ease-in-out infinite;
  }

  span {
    color: rgb(255, 255, 255);
		padding: 10px;
    font-size: 1.5rem;
    text-shadow: 0 0 5px #0ff, 0 0 10px #0ff;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
	0%, 100% {
		transform: scale(1);
		opacity: 0.2;
	}

	50% {
		transform: scale(1.1);
		opacity: 0.4;
	}
}
</style>
