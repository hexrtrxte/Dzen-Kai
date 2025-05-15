<script setup>
import { onMounted, onUnmounted } from "vue";
import navigation from '../components/navigation.vue';

onMounted(() => {
  document.body.style.backgroundColor = "var(--background)";
  
  // Загрузка API Яндекс Карт
  const script = document.createElement('script');
  script.src = 'https://api-maps.yandex.ru/2.1/?apikey=ваш_API_ключ&lang=ru_RU';
  script.async = true;
  document.head.appendChild(script);

  script.onload = () => {
    ymaps.ready(() => {
      const map = new ymaps.Map('map', {
        center: [56.634407, 47.919967], // Координаты Йошкар-Ола, ул. Маяковского 75
        zoom: 17
      });

      const placemark = new ymaps.Placemark([56.634407, 47.919967], {
        balloonContent: 'Компьютерный клуб "Дзен-Кай"<br>ул. Маяковского 75'
      }, {
        preset: 'islands#blueComputer'
      });

      map.geoObjects.add(placemark);
      map.controls.remove('searchControl');
      map.controls.remove('trafficControl');
      map.controls.remove('typeSelector');
      map.controls.remove('fullscreenControl');
      map.controls.remove('rulerControl');
    });
  };
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
      <div class="header">
        <div class="logo">
          <h1 class="logo-text">Как нас найти</h1>
        </div>
      </div>

      <div class="map-section">
        <div class="map-container glass-bg">
          <div id="map" class="map"></div>
          <div class="address-info">
            <h2>Наш адрес:</h2>
            <p>г. Йошкар-Ола, ул. Маяковского 75</p>
            <p>Телефон: +7 (902) 102-26-10</p>
            <p>Режим работы: 24/7</p>
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

.content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  text-align: center;
  margin-bottom: 4rem;
  padding-top: 2rem;
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
  margin: 0;
  white-space: nowrap;
  text-shadow: 0 0 15px rgba(64, 224, 208, 0.6);
}

.map-section {
  flex: 1;
  display: flex;
  align-items: center;
  margin-top: 2rem;
}

.map-container {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  padding: 2rem;
  border-radius: 20px;
  background: rgba(13, 13, 13, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(64, 224, 208, 0.2);
}

.map {
  width: 100%;
  height: 600px;
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid rgba(64, 224, 208, 0.2);
  box-shadow: 0 0 20px rgba(64, 224, 208, 0.1);
}

.address-info {
  color: white;
  padding: 1.5rem;
  background: rgba(10, 10, 26, 0.8);
  border-radius: 15px;
  border: 1px solid rgba(64, 224, 208, 0.2);
  height: fit-content;
}

.address-info h2 {
  font-size: 1.5rem;
  color: #40E0D0;
  margin: 0 0 1.5rem 0;
  text-shadow: 0 0 10px rgba(64, 224, 208, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.address-info p {
  font-size: 1rem;
  margin: 0 0 1rem 0;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.05em;
  line-height: 1.5;
}

.address-info p:last-child {
  margin-bottom: 0;
}

@media (max-width: 1024px) {
  .map-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .map {
    height: 400px;
  }

  .logo-text {
    font-size: min(2.5rem, 4vh);
  }
}

@media (max-width: 768px) {
  .content {
    padding: 1rem;
  }

  .header {
    margin-bottom: 2rem;
  }

  .logo {
    padding: 1vh 2rem;
  }

  .map-container {
    padding: 1rem;
  }

  .map {
    height: 300px;
  }

  .address-info {
    padding: 1rem;
  }

  .address-info h2 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .address-info p {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .header {
    margin-bottom: 1.5rem;
  }

  .logo {
    padding: 0.8vh 1.5rem;
  }

  .logo-text {
    font-size: min(1.8rem, 3vh);
  }
}
</style> 