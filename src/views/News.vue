<script setup>
import { onMounted, onUnmounted, ref, computed } from "vue";
import navigation from '../components/navigation.vue';

const showNotification = ref(false);
const showDiscountModal = ref(false);
const school = ref("");
const phone = ref("");
const isValidSchool = computed(() => /^[a-zA-Zа-яА-ЯёЁ0-9\s]+$/.test(school.value) || school.value === "");
const isValidPhone = computed(() => /^[0-9]+$/.test(phone.value) || phone.value === "");
const isFormValid = computed(() => school.value && phone.value && isValidSchool.value && isValidPhone.value);

const submitForm = () => {
  if (isFormValid.value) {
    // Получаем текущие скидки из localStorage
    const discounts = JSON.parse(localStorage.getItem('discounts') || '[]');
    
    // Проверяем, есть ли уже скидка для этого телефона
    const existingDiscount = discounts.find(d => d.phone === phone.value);
    
    if (existingDiscount) {
      alert('Скидка для этого номера уже активирована!');
      return;
    }

    // Добавляем новую скидку
    const newDiscount = {
      id: Date.now(),
      school: school.value,
      phone: phone.value,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() // 14 дней
    };

    discounts.push(newDiscount);
    localStorage.setItem('discounts', JSON.stringify(discounts));

    console.log("Данные отправлены:", newDiscount);
    showNotification.value = true;
    setTimeout(() => {
      showNotification.value = false;
    }, 3000);
    setTimeout(() => {
      showDiscountModal.value = false;
    }, 1);
    school.value = "";
    phone.value = "";
  }
};

const toggleDiscountModal = () => {
  showDiscountModal.value = !showDiscountModal.value;
};

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
        <h1 class="title">Новости</h1>
      </header>

      <div class="news-grid">
        <div class="news-card glass-bg">
          <h2 class="news-title">Скидка 10%!</h2>
          <div class="news-divider"></div>
          <p class="news-text">Скидка всем школьникам и студентам 10%!</p>
          <button class="btn" @click="toggleDiscountModal">Читать подробнее</button>
        </div>
      </div>
    </div>

    <!-- Модальное окно -->
    <div v-if="showDiscountModal" class="modal-overlay" @click="toggleDiscountModal">
      <div class="modal-content glass-bg" @click.stop>
        <h3 class="modal-title">Получите скидку!</h3>
        <p class="modal-text">Чтобы получить скидку, необходимо ввести ваше учебное заведение и номер телефона.</p>
        <p class="modal-text">Учтите, скидка действует 2 недели!</p>
        <div class="form-group">
          <input type="text" v-model="school" placeholder="Введите название" class="form-input" :class="{ 'error': !isValidSchool }" />
        </div>
        <div class="form-group">
          <input type="text" v-model="phone" placeholder="Введите номер телефона" class="form-input" :class="{ 'error': !isValidPhone }" />
        </div>
        <div class="modal-buttons">
          <button class="btn btn-danger" @click="toggleDiscountModal">Закрыть</button>
          <button class="btn btn-success" @click="submitForm" :disabled="!isFormValid">Принять</button>
        </div>
      </div>
    </div>

    <div v-if="showNotification" class="notification">
      ✅ Успешно! Скидка действительна 2 недели.
    </div>

    <navigation />
  </div>
</template>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
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
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
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

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.news-card {
  padding: 2rem;
  border-radius: var(--border-radius-lg);
  text-align: center;
  transition: transform var(--transition-normal);
}

.news-card:hover {
  transform: translateY(-5px);
}

.news-title {
  font-size: 2rem;
  color: var(--primary);
  margin-bottom: 1rem;
  text-shadow: 0 0 10px rgba(64, 224, 208, 0.3);
}

.news-divider {
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--primary), transparent);
  margin: 1rem auto;
  width: 80%;
}

.news-text {
  color: white;
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(10, 10, 26, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  width: 90%;
  max-width: 500px;
  padding: 2rem;
  border-radius: var(--border-radius-lg);
}

.modal-title {
  font-size: 1.8rem;
  color: var(--primary);
  margin-bottom: 1rem;
  text-shadow: 0 0 10px rgba(64, 224, 208, 0.3);
}

.modal-text {
  color: white;
  margin-bottom: 1.5rem;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-danger {
  background: linear-gradient(45deg, #ff4444, #cc0000);
}

.btn-success {
  background: linear-gradient(45deg, #00C851, #007E33);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.notification {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 200, 81, 0.9);
  color: white;
  padding: 1rem 2rem;
  border-radius: var(--border-radius-md);
  z-index: 1001;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translate(-50%, 100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
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

  .news-title {
    font-size: 1.5rem;
  }

  .news-text {
    font-size: 1rem;
  }

  .modal-content {
    padding: 1.5rem;
  }

  .modal-title {
    font-size: 1.5rem;
  }
}
</style>