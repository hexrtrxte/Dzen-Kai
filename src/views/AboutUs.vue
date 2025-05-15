<template>
  <div class="about-container">
    <div class="cyber-grid"></div>
    
    <div class="content">
      <h1 class="title">О нас</h1>
      
      <div class="info-sections">
        <div class="info-card">
          <div class="card-icon">
            <i class="fas fa-gamepad"></i>
          </div>
          <h2>Современное оборудование</h2>
          <p>Мы предоставляем доступ к высококлассным игровым компьютерам с последними моделями видеокарт и процессоров, обеспечивая максимальную производительность в любой игре.</p>
        </div>

        <div class="info-card">
          <div class="card-icon">
            <i class="fas fa-users"></i>
          </div>
          <h2>Сообщество</h2>
          <p>ДЗЕН-КАЙ - это не просто компьютерный клуб, это место встречи единомышленников, где каждый найдет новых друзей и сможет развиваться в киберспорте.</p>
        </div>

        <div class="info-card">
          <div class="card-icon">
            <i class="fas fa-trophy"></i>
          </div>
          <h2>Турниры</h2>
          <p>Мы регулярно проводим турниры по популярным дисциплинам с призовыми фондами, давая возможность каждому проявить себя в соревновательной среде.</p>
        </div>
      </div>

      <div class="features">
        <h2 class="features-title">Наши преимущества</h2>
        <ul class="features-list">
          <li><i class="fas fa-check"></i> Мощные игровые компьютеры</li>
          <li><i class="fas fa-check"></i> Комфортные игровые кресла</li>
          <li><i class="fas fa-check"></i> Высокоскоростной интернет</li>
          <li><i class="fas fa-check"></i> Современная система вентиляции</li>
          <li><i class="fas fa-check"></i> Уютная атмосфера</li>
          <li><i class="fas fa-check"></i> Доступные цены</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional script needed for now
</script>

<style scoped>
.about-container {
  position: fixed;
  min-height: 100vh;
  width: 100vw;
  overflow-y: auto;
  overflow-x: hidden;
  background: rgb(10, 10, 26);
  padding: 0;
  display: flex;
  justify-content: center;
}

.cyber-grid {
  position: fixed;
  top: -50%;
  left: -50%;
  width: 300vw;
  height: 300vh;
  background: 
    linear-gradient(rgba(64, 224, 208, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(64, 224, 208, 0.05) 1px, transparent 1px);
  background-size: 30px 30px;
  transform: perspective(500px) rotateX(45deg);
  animation: gridMove 30s linear infinite;
  pointer-events: none;
  z-index: 1;
}

.content {
  position: relative;
  z-index: 2;
  width: min(1400px, 100%);
  margin: 0 auto;
  padding: max(16px, min(5vw, 48px));
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: max(24px, min(5vh, 48px));
}

.title {
  font-size: clamp(28px, 5vw, 56px);
  color: #40E0D0;
  text-align: center;
  text-shadow: 0 0 20px rgba(64, 224, 208, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
  padding-top: max(24px, min(5vh, 48px));
}

.info-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: max(16px, min(3vw, 32px));
  width: 100%;
}

.info-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(64, 224, 208, 0.2);
  border-radius: 15px;
  padding: max(16px, min(3vw, 32px));
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: max(16px, min(2vh, 24px));
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(64, 224, 208, 0.2);
  border-color: rgba(64, 224, 208, 0.4);
}

.card-icon {
  font-size: clamp(32px, 4vw, 48px);
  color: #40E0D0;
  text-shadow: 0 0 15px rgba(64, 224, 208, 0.5);
  margin: 0;
}

.info-card h2 {
  color: #fff;
  font-size: clamp(20px, 3vw, 28px);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-card p {
  color: #ccc;
  line-height: 1.6;
  font-size: clamp(14px, 2vw, 16px);
  margin: 0;
}

.features {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(64, 224, 208, 0.2);
  border-radius: 15px;
  padding: max(20px, min(4vw, 40px));
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: max(20px, min(3vh, 32px));
}

.features-title {
  color: #fff;
  font-size: clamp(24px, 4vw, 40px);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 0 0 15px rgba(64, 224, 208, 0.4);
  margin: 0;
}

.features-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
  gap: max(12px, min(2vw, 20px));
  list-style: none;
  padding: 0;
  margin: 0;
}

.features-list li {
  color: #ccc;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: clamp(14px, 2vw, 18px);
  padding: 8px;
  transition: all 0.3s ease;
}

.features-list li:hover {
  background: rgba(64, 224, 208, 0.1);
  border-radius: 8px;
}

.features-list i {
  color: #40E0D0;
  text-shadow: 0 0 10px rgba(64, 224, 208, 0.3);
  font-size: 1.2em;
}

@keyframes gridMove {
  0% {
    transform: perspective(500px) rotateX(45deg) translateY(0);
  }
  100% {
    transform: perspective(500px) rotateX(45deg) translateY(30px);
  }
}

@media (max-width: 768px) {
  .content {
    padding: 16px;
  }

  .info-sections {
    grid-template-columns: 1fr;
  }

  .features-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 24px;
  }

  .info-card h2 {
    font-size: 20px;
  }

  .info-card p {
    font-size: 14px;
  }

  .features-title {
    font-size: 22px;
  }

  .features-list li {
    font-size: 14px;
  }
}
</style> 