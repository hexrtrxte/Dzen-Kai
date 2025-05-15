<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { RouterLink } from 'vue-router';
import navigation from '../components/navigation.vue';

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
      <div class="overlay"></div>
    </div>

    <div class="content">
      <header class="header">
        <div class="logo">
          <h1 class="logo-text">О нас</h1>
        </div>
      </header>

      <div class="about-section">
        <div class="about-content">
          <div class="text-content">
            <h2 class="about-title">Дзен-Кай - идеальное место для каждого</h2>
            <p class="description">
              Для профессионального игрока или ребёнка, неважно,
              здесь каждый найдёт развлечение по душе.
              Отметь свой праздник вместе с нами и нашей командой.
            </p>
          </div>

          <div class="features-box">
            <h3 class="features-title">Для тебя:</h3>
            <ul class="features-list">
              <li>фастфуд Street Eat</li>
              <li>Neon Loft</li>
              <li>Отдельные ВИП комнаты</li>
              <li>Авторская кухня от Бренд Повара</li>
              <li>Оригинальные аниматоры с шоу программой и дискотекой</li>
            </ul>
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
  overflow: hidden;
  background: #0a0a1a;
}

.background-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.cyber-grid {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 300vw;
  height: 300vh;
  background: 
    linear-gradient(rgba(64, 224, 208, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(64, 224, 208, 0.03) 1px, transparent 1px);
  background-size: 30px 30px;
  transform: perspective(500px) rotateX(45deg);
  animation: gridMove 30s linear infinite;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(10, 10, 26, 0.8) 0%,
    rgba(10, 10, 26, 0.6) 50%,
    rgba(10, 10, 26, 0.8) 100%
  );
  z-index: 2;
}

.content {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 3;
  display: flex;
  flex-direction: column;
  padding: 2vh 5vw;
  overflow-y: auto;
}

.header {
  padding: 2vh 0;
  margin-bottom: 4rem;
}

.logo {
  background: rgba(10, 10, 26, 0.7);
  border: 2px solid rgba(64, 224, 208, 0.4);
  border-radius: 8px;
  padding: 1.5vh 3rem;
  width: fit-content;
  margin: 0 auto;
  box-shadow: 0 0 40px rgba(64, 224, 208, 0.15);
}

.logo-text {
  font-size: min(3rem, 5vh);
  font-weight: 800;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin: 0;
  text-shadow: 0 0 15px rgba(64, 224, 208, 0.6);
}

.about-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  background: rgba(10, 10, 26, 0.7);
  border: 1px solid rgba(64, 224, 208, 0.2);
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 0 40px rgba(64, 224, 208, 0.1);
}

.text-content {
  color: white;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.about-title {
  font-size: min(2.5rem, 4vh);
  font-weight: 700;
  color: white;
  margin: 0 0 2rem 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  line-height: 1.2;
  text-shadow: 0 0 20px rgba(64, 224, 208, 0.4);
}

.description {
  font-size: min(1.2rem, 2.2vh);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.features-box {
  background: rgba(64, 224, 208, 0.05);
  border: 1px solid rgba(64, 224, 208, 0.2);
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 0 30px rgba(64, 224, 208, 0.1);
}

.features-title {
  font-size: min(1.8rem, 3vh);
  color: #40E0D0;
  margin: 0 0 2rem 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 0 0 15px rgba(64, 224, 208, 0.4);
  text-align: center;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.features-list li {
  font-size: min(1.1rem, 2vh);
  color: rgba(255, 255, 255, 0.9);
  padding: 1rem 1.5rem;
  position: relative;
  transition: all 0.3s ease;
  background: rgba(10, 10, 26, 0.5);
  border-radius: 8px;
  border: 1px solid rgba(64, 224, 208, 0.1);
  display: flex;
  align-items: center;
}

.features-list li::before {
  content: '▸';
  color: #40E0D0;
  margin-right: 0.8rem;
  font-size: 1.2em;
  text-shadow: 0 0 10px rgba(64, 224, 208, 0.4);
}

.features-list li:hover {
  transform: translateY(-2px);
  background: rgba(64, 224, 208, 0.1);
  border-color: rgba(64, 224, 208, 0.3);
  box-shadow: 0 5px 15px rgba(64, 224, 208, 0.1);
}

@keyframes gridMove {
  0% {
    transform: perspective(500px) rotateX(45deg) translateY(0);
  }
  100% {
    transform: perspective(500px) rotateX(45deg) translateY(30px);
  }
}

@media (max-width: 1024px) {
  .about-content {
    gap: 3rem;
    padding: 2rem;
  }

  .features-list {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

@media (max-width: 768px) {
  .content {
    padding: 2vh 3vw;
  }

  .header {
    margin-bottom: 3rem;
  }

  .logo {
    padding: 1vh 2rem;
  }

  .logo-text {
    font-size: min(2rem, 4vh);
  }

  .about-title {
    font-size: min(2rem, 3.5vh);
  }

  .features-box {
    padding: 2rem;
  }
}

@media (max-width: 480px) {
  .about-content {
    padding: 1.5rem;
  }

  .features-box {
    padding: 1.5rem;
  }

  .logo {
    padding: 0.8vh 1.5rem;
  }

  .logo-text {
    font-size: min(1.5rem, 3vh);
  }

  .about-title {
    font-size: min(1.5rem, 3vh);
    margin-bottom: 1.5rem;
  }

  .description {
    font-size: min(1rem, 2vh);
  }

  .features-title {
    font-size: min(1.4rem, 2.5vh);
    margin-bottom: 1.5rem;
  }

  .features-list {
    gap: 1rem;
  }

  .features-list li {
    font-size: min(0.9rem, 1.8vh);
    padding: 0.8rem 1.2rem;
  }
}
</style>

