<script setup>
import { onMounted, onUnmounted } from "vue";
import navigation from '../components/navigation.vue';
import vladPhoto from '@/image/влад.jpg';
import sashaPhoto from '@/image/саша.jpg';

// Меняем фон только для этой страницы
onMounted(() => {
  document.body.style.backgroundColor = "var(--background)";
});

onUnmounted(() => {
  document.body.style.backgroundColor = "";
});
</script>

<template>
  <div class="page-wrapper">
    <div class="background-effects">
      <div class="cyber-grid"></div>
      <div class="glow-circle"></div>
      <div class="glow-circle secondary"></div>
    </div>

    <div class="content">
      <header class="header">
        <h1 class="title">Наша команда</h1>
      </header>

      <div class="team-grid">
        <div class="team-member glass-bg">
          <div class="member-photo">
            <img :src="vladPhoto" alt="Владислав Петров" class="member-image">
          </div>
          <div class="member-info">
            <h2 class="member-name">Петров Владислав Юрьевич</h2>
            <p class="member-role">Разработчик сайта</p>
          </div>
        </div>

        <div class="team-member glass-bg">
          <div class="member-photo">
            <img :src="sashaPhoto" alt="Александр Капралов" class="member-image">
          </div>
          <div class="member-info">
            <h2 class="member-name">Капралов Александр Викторович</h2>
            <p class="member-role">Разработчик сайта и курсовой работы</p>
          </div>
        </div>
      </div>
    </div>

    <navigation />
  </div>
</template>

<style scoped>
.page-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #0a0a1a;
  overflow-y: auto;
  overflow-x: hidden;
}

.background-effects {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.cyber-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  background: 
    linear-gradient(90deg, rgba(64, 224, 208, 0.03) 1px, transparent 1px),
    linear-gradient(rgba(64, 224, 208, 0.03) 1px, transparent 1px);
  background-size: 30px 30px;
  transform: rotate(45deg);
  animation: moveGrid 60s linear infinite;
}

.glow-circle {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(64, 224, 208, 0.2) 0%, transparent 70%);
  filter: blur(50px);
  animation: float 10s ease-in-out infinite;
}

.glow-circle.secondary {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(147, 112, 219, 0.2) 0%, transparent 70%);
  right: 10%;
  bottom: 20%;
  animation-delay: -5s;
}

.content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.title {
  font-size: 3rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  text-shadow: 0 0 20px rgba(64, 224, 208, 0.5);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  padding: 1rem;
  max-width: 1000px;
  margin: 0 auto;
}

.team-member {
  padding: 2.5rem;
  border-radius: var(--border-radius-lg);
  text-align: center;
  transition: transform var(--transition-normal);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(64, 224, 208, 0.2);
  backdrop-filter: blur(10px);
}

.team-member:hover {
  transform: translateY(-5px);
  border-color: rgba(64, 224, 208, 0.4);
  box-shadow: 0 10px 30px rgba(64, 224, 208, 0.2);
}

.member-photo {
  width: 180px;
  height: 180px;
  margin: 0 auto 2rem;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(64, 224, 208, 0.3);
  position: relative;
  background: linear-gradient(45deg, rgba(64, 224, 208, 0.1), rgba(147, 112, 219, 0.1));
}

.member-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.team-member:hover .member-image {
  transform: scale(1.05);
}

.member-info {
  color: white;
}

.member-name {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--primary);
  text-shadow: 0 0 10px rgba(64, 224, 208, 0.3);
  font-weight: 700;
  letter-spacing: 0.05em;
}

.member-role {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  position: relative;
  padding-bottom: 1rem;
}

.member-role::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--primary), transparent);
}

@keyframes moveGrid {
  from {
    transform: rotate(45deg) translateY(0);
  }
  to {
    transform: rotate(45deg) translateY(-50%);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .team-grid {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .member-photo {
    width: 150px;
    height: 150px;
  }

  .member-name {
    font-size: 1.5rem;
  }

  .member-role {
    font-size: 1rem;
  }
}
</style>