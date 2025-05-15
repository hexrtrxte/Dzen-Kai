.about-content {
  display: flex;
  align-items: center;
  gap: 3rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.about-image {
  flex: 0 0 45%;
  height: 500px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
}

.about-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.about-text {
  flex: 1;
  padding: 2rem;
  background: rgba(13, 13, 13, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid rgba(0, 255, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
}

.about-text h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #00ffff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.about-text p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #ffffff;
  margin-bottom: 1rem;
}

@media (max-width: 1024px) {
  .about-content {
    flex-direction: column;
    gap: 2rem;
  }

  .about-image {
    flex: 0 0 auto;
    width: 100%;
    height: 400px;
  }

  .about-text {
    width: 100%;
  }
}

<template>
  <div class="page-wrapper">
    <div class="background-effects">
      <div class="cyber-grid"></div>
      <div class="glow-circle"></div>
      <div class="glow-circle secondary"></div>
    </div>

    <div class="content">
      <header class="header">
        <h1 class="title">О нас</h1>
      </header>

      <div class="about-content">
        <div class="about-image">
          <img src="@/assets/about-image.jpg" alt="Компьютерный клуб Дзен-Кай" />
        </div>
        
        <div class="about-text">
          <h2>Добро пожаловать в Дзен-Кай</h2>
          <p>
            Мы - современный компьютерный клуб, предоставляющий высококачественные услуги для геймеров всех уровней.
            Наше оборудование включает мощные игровые компьютеры с последними процессорами и видеокартами.
          </p>
          <p>
            В нашем клубе вы найдете комфортную атмосферу для игр и общения. Мы регулярно проводим турниры
            и мероприятия для нашего игрового сообщества.
          </p>
          <p>
            Наша цель - создать идеальное место для геймеров, где каждый может насладиться
            любимыми играми на профессиональном оборудовании.
          </p>
          <p>
            Присоединяйтесь к нашему сообществу и станьте частью уникальной киберспортивной атмосферы Дзен-Кай!
          </p>
        </div>
      </div>
    </div>

    <navigation />
  </div>
</template> 