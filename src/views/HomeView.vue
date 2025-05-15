<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router';


import { ref } from 'vue';
import navigation from '../components/navigation.vue';

const showLoginModal = ref(false);
const showRegisterModal = ref(false);

const loginData = ref({
  username: '',
  password: ''
});

const registerData = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const toggleLoginModal = () => {
  showLoginModal.value = !showLoginModal.value;
};

const toggleRegisterModal = () => {
  showRegisterModal.value = !showRegisterModal.value;
};

const login = () => {
  if (loginData.value.username && loginData.value.password) {
    alert(`Вход выполнен: ${loginData.value.username}`);
    toggleLoginModal();
  } else {
    alert('Введите логин и пароль');
  }
};

const register = () => {
  if (
    registerData.value.username &&
    registerData.value.email &&
    registerData.value.password &&
    registerData.value.password === registerData.value.confirmPassword
  ) {
    alert(`Регистрация успешна: ${registerData.value.username}`);
    toggleRegisterModal();
  } else {
    alert('Заполните все поля и убедитесь, что пароли совпадают');
  }
};


import { onMounted, onBeforeUnmount } from 'vue';
import image1 from "@/image/slider/1.jpg"
import image2 from "@/image/slider/2.jpg"
import image3 from "@/image/slider/3.jpg"

const slides = ref([
  { image: image1, alt: 'Image 1', text: 'Slide 1 Text' },
  { image: image2, alt: 'Image 2', text: 'Slide 2 Text' },
  { image: image3, alt: 'Image 3', text: 'Slide 3 Text' }
]);

const currentIndex = ref(0);
let autoplayInterval = null;

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length;
};

const startAutoplay = () => {
  if (!autoplayInterval) { // Проверяем, что интервал еще не запущен
    autoplayInterval = setInterval(() => {
      nextSlide();
    }, 3000);
  }
};

const stopAutoplay = () => {
  clearInterval(autoplayInterval);
  autoplayInterval = null; // Сбрасываем значение интервала
};

onMounted(() => {
  startAutoplay();
});

onBeforeUnmount(() => {
  stopAutoplay();
});
</script>

<template>
  <div class="page-wrapper">
    <!-- Фоновый слайдер -->
    <div class="background-slider" @mouseenter="stopAutoplay" @mouseleave="startAutoplay">
    <div class="slides" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div v-for="(slide, index) in slides" :key="index" class="slide">
        <img :src="slide.image" :alt="slide.alt">
        </div>
      </div>
      <div class="overlay"></div>
  </div>

    <!-- Основной контент -->
    <div class="content">
      <header class="header">
        <div class="logo">
          <h1 class="logo-text">
            <span>ДЗЕН</span>
            <span class="divider">-</span>
            <span>КАЙ</span>
          </h1>
  </div>
      </header>

      <div class="hero-content">
        <h2 class="hero-title">Киберспортивный клуб нового поколения</h2>
        <div class="hero-features">
          <div class="feature">
            <span class="feature-number">120+</span>
            <span class="feature-text">Мощных компьютеров</span>
    </div>
          <div class="feature">
            <span class="feature-number">24/7</span>
            <span class="feature-text">Работаем круглосуточно</span>
  </div>
          <div class="feature">
            <span class="feature-number">2K</span>
            <span class="feature-text">Довольных клиентов</span>
    </div>
  </div>
        <RouterLink to="/pricelist" class="cta-button">
          Забронировать компьютер
        </RouterLink>
  </div>
    </div>

    <navigation />
  </div>
</template>


<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

  body {
  margin: 0;
  padding: 0;
  background-color: #0a0a1a;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  position: fixed;
  }
</style>

<style scoped>
.page-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.background-slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.slides {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.slide {
  min-width: 100%;
  height: 100%;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: brightness(0.6) contrast(1.1) saturate(1.2);
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
}

.header {
  padding: 2vh 0;
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
  font-size: min(3.5rem, 5vh);
  font-weight: 800;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0;
  white-space: nowrap;
  text-shadow: 0 0 15px rgba(64, 224, 208, 0.6);
}

.divider {
  color: #9370DB;
  text-shadow: 0 0 15px rgba(147, 112, 219, 0.8);
}

.hero-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5vh;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-title {
  font-size: min(3rem, 6vh);
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  line-height: 1.2;
  text-shadow: 0 0 20px rgba(64, 224, 208, 0.4);
}

.hero-features {
  display: flex;
  justify-content: center;
  gap: 5vw;
  flex-wrap: wrap;
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1vh;
}

.feature-number {
  font-size: min(2.5rem, 5vh);
  font-weight: 800;
  color: #40E0D0;
  text-shadow: 0 0 15px rgba(64, 224, 208, 0.6);
}

.feature-text {
  font-size: min(1rem, 2vh);
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.cta-button {
  display: inline-block;
  min-width: 300px;
  max-width: 90%;
  background: linear-gradient(45deg, #40E0D0, #9370DB);
  color: white;
  font-size: min(1.2rem, 2.5vh);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 1.2rem 3rem;
  border-radius: 8px;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 0 30px rgba(64, 224, 208, 0.3);
  position: relative;
  overflow: hidden;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 40px rgba(64, 224, 208, 0.4);
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: 0.5s;
}

.cta-button:hover::before {
  left: 100%;
}

@media (max-width: 1024px) {
  .hero-title {
    font-size: min(2.5rem, 5vh);
  }

  .feature-number {
    font-size: min(2rem, 4vh);
  }
}

@media (max-width: 768px) {
  .content {
    padding: 2vh 3vw;
  }

  .logo {
    padding: 1vh 2rem;
  }

  .logo-text {
    font-size: min(2rem, 4vh);
  }

  .hero-title {
    font-size: min(2rem, 4vh);
  }

  .hero-features {
    gap: 4vh 3vw;
  }

  .feature-number {
    font-size: min(1.8rem, 3.5vh);
  }

  .cta-button {
    min-width: 250px;
    font-size: min(1rem, 2vh);
    padding: 1rem 2rem;
  }
}

@media (max-width: 480px) {
  .logo {
    padding: 0.8vh 1.5rem;
  }

  .logo-text {
    font-size: min(1.5rem, 3vh);
  }

  .hero-title {
    font-size: min(1.5rem, 3vh);
  }

  .feature-number {
    font-size: min(1.5rem, 3vh);
  }

  .feature-text {
    font-size: min(0.8rem, 1.8vh);
  }

  .cta-button {
    width: 90%;
    min-width: unset;
    font-size: min(0.9rem, 1.8vh);
    padding: 0.8rem 1.5rem;
  }
}
</style>

