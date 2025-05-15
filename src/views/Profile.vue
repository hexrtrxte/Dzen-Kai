<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import navigation from '../components/navigation.vue';

const router = useRouter();
const user = ref(null);
const bookings = ref([]);
const discount = ref(null);

// Получаем активные бронирования (только предстоящие)
const activeBookings = computed(() => {
  const now = new Date();
  return bookings.value
    .filter(booking => {
      const [hours, minutes] = booking.time.split(':');
      const bookingDate = new Date(booking.date);
      bookingDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      return bookingDate > now;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date + 'T' + a.time);
      const dateB = new Date(b.date + 'T' + b.time);
      return dateA - dateB;
    });
});

// Проверяем авторизацию
onMounted(() => {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    router.push('/');
    return;
  }

  user.value = JSON.parse(currentUser);
  
  // Загружаем бронирования пользователя
  const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  bookings.value = allBookings.filter(booking => 
    booking.userId === user.value.id || 
    booking.phone === user.value.phone
  );

  // Загружаем скидку пользователя
  const discounts = JSON.parse(localStorage.getItem('discounts') || '[]');
  discount.value = discounts.find(d => d.phone === user.value.phone);
});

// Отмена бронирования
const cancelBooking = (bookingToCancel) => {
  const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  const updatedBookings = allBookings.filter(booking => 
    !(booking.date === bookingToCancel.date && 
      booking.time === bookingToCancel.time && 
      booking.pc === bookingToCancel.pc &&
      (booking.userId === user.value.id || booking.phone === user.value.phone))
  );
  
  localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  bookings.value = updatedBookings.filter(booking => 
    booking.userId === user.value.id || 
    booking.phone === user.value.phone
  );
};

// Форматирование даты
const formatDate = (dateStr) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateStr).toLocaleDateString('ru-RU', options);
};

// Форматирование времени
const formatTime = (time) => {
  return time;
};
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
        <h1 class="title">Личный кабинет</h1>
      </header>

      <div class="profile-container">
        <!-- Информация о пользователе -->
        <div class="profile-section glass-bg">
          <h2 class="section-title">Профиль</h2>
          <div class="user-info">
            <div class="info-item">
              <span class="label">Имя:</span>
              <span class="value">{{ user?.name }}</span>
            </div>
            <div class="info-item">
              <span class="label">Телефон:</span>
              <span class="value">{{ user?.phone }}</span>
            </div>
          </div>
        </div>

        <!-- Активная скидка -->
        <div class="profile-section glass-bg" v-if="discount">
          <h2 class="section-title">Активная скидка</h2>
          <div class="discount-info">
            <div class="discount-badge">10%</div>
            <div class="discount-details">
              <p>Учебное заведение: {{ discount.school }}</p>
              <p>Действует до: {{ formatDate(discount.expiresAt) }}</p>
            </div>
          </div>
        </div>

        <!-- Активные бронирования -->
        <div class="profile-section glass-bg">
          <h2 class="section-title">Мои бронирования</h2>
          <div class="bookings-grid" v-if="activeBookings.length">
            <div v-for="booking in activeBookings" 
                 :key="booking.date + booking.time + booking.pc"
                 class="booking-card">
              <div class="booking-header">
                <span class="booking-tariff">{{ booking.tariff }}</span>
                <button class="cancel-btn" @click="cancelBooking(booking)">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <div class="booking-details">
                <div class="detail-item">
                  <i class="fas fa-calendar"></i>
                  <span>{{ formatDate(booking.date) }}</span>
                </div>
                <div class="detail-item">
                  <i class="fas fa-clock"></i>
                  <span>{{ formatTime(booking.time) }}</span>
                </div>
                <div class="detail-item">
                  <i class="fas fa-desktop"></i>
                  <span>PC {{ booking.pc }}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="no-bookings">
            У вас пока нет активных бронирований
          </div>
        </div>
      </div>
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

.profile-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.profile-section {
  padding: 2rem;
  border-radius: 12px;
}

.section-title {
  color: #40E0D0;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 10px rgba(64, 224, 208, 0.3);
}

/* Стили для информации о пользователе */
.user-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.label {
  color: rgba(255, 255, 255, 0.7);
  min-width: 100px;
}

.value {
  color: white;
  font-weight: 500;
}

/* Стили для скидки */
.discount-info {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.discount-badge {
  background: linear-gradient(45deg, rgba(64, 224, 208, 0.2), rgba(147, 112, 219, 0.2));
  border: 1px solid rgba(64, 224, 208, 0.3);
  padding: 1rem 1.5rem;
  border-radius: 8px;
  color: #40E0D0;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(64, 224, 208, 0.3);
}

.discount-details {
  color: white;
}

.discount-details p {
  margin: 0.5rem 0;
}

/* Стили для бронирований */
.bookings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.booking-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(64, 224, 208, 0.2);
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.booking-card:hover {
  transform: translateY(-5px);
  border-color: rgba(64, 224, 208, 0.4);
  box-shadow: 0 5px 15px rgba(64, 224, 208, 0.1);
}

.booking-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.booking-tariff {
  color: #40E0D0;
  font-size: 1.2rem;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(64, 224, 208, 0.3);
}

.cancel-btn {
  background: none;
  border: none;
  color: rgba(255, 68, 68, 0.8);
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  color: #ff4444;
  transform: scale(1.1);
}

.booking-details {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
}

.detail-item i {
  color: #40E0D0;
  width: 20px;
  text-align: center;
}

.no-bookings {
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  padding: 2rem;
  font-style: italic;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .profile-section {
    padding: 1.5rem;
  }

  .discount-info {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .bookings-grid {
    grid-template-columns: 1fr;
  }
}
</style> 