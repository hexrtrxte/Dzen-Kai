<template>
  <div class="loading-screen" :class="{ 'fade-out': startFade }">
    <div class="logo-container">
      <div class="logo-text">
        <span class="text-part">ДЗЕН</span>
        <span class="divider">-</span>
        <span class="text-part">КАЙ</span>
      </div>
      <div class="cyber-lines"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const startFade = ref(false);

onMounted(() => {
  setTimeout(() => {
    startFade.value = true;
  }, 2000);
});
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--background);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 1s ease-out;
}

.loading-screen.fade-out {
  opacity: 0;
  pointer-events: none;
}

.logo-container {
  position: relative;
  padding: 2rem 4rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(64, 224, 208, 0.3);
  border-radius: 12px;
  overflow: hidden;
}

.logo-text {
  font-size: 4rem;
  font-weight: 800;
  color: white;
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: glow 2s ease-in-out infinite;
}

.text-part {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s ease forwards;
}

.text-part:nth-child(1) {
  animation-delay: 0.2s;
}

.divider {
  color: var(--primary);
  animation: pulse 2s ease-in-out infinite;
  opacity: 0;
  animation-delay: 0.4s;
  animation-fill-mode: forwards;
}

.text-part:nth-child(3) {
  animation-delay: 0.6s;
}

.cyber-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(90deg, transparent 50%, rgba(64, 224, 208, 0.1) 50%),
    linear-gradient(transparent 50%, rgba(64, 224, 208, 0.1) 50%);
  background-size: 4px 4px;
  animation: moveBackground 20s linear infinite;
  opacity: 0.3;
  pointer-events: none;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes moveBackground {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 100px 100px;
  }
}

@keyframes glow {
  0% {
    text-shadow: 0 0 10px rgba(64, 224, 208, 0.5);
  }
  50% {
    text-shadow: 0 0 20px rgba(64, 224, 208, 0.8),
                 0 0 30px rgba(64, 224, 208, 0.5);
  }
  100% {
    text-shadow: 0 0 10px rgba(64, 224, 208, 0.5);
  }
}
</style> 