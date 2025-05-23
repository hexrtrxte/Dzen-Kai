<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import navigation from '../components/navigation.vue';

const showBookingModal = ref(false);
const selectedTariff = ref(null);
const selectedDate = ref(new Date().toISOString().split('T')[0]); // Текущая дата
const selectedTime = ref('');
const selectedPC = ref(null);

// Имитация занятых компьютеров (в будущем будет браться из localStorage или БД)
const bookedPCs = ref([
  {
    date: '2024-03-20',
    time: '14:00',
    pc: 1
  },
  {
    date: '2024-03-20',
    time: '15:00',
    pc: 2
  }
]);

// Список компьютеров
const computers = [
  { id: 1, name: 'PC 1' },
  { id: 2, name: 'PC 2' },
  { id: 3, name: 'PC 3' },
  { id: 4, name: 'PC 4' },
  { id: 5, name: 'PC 5' }
];

// Доступное время для бронирования
const timeSlots = [
  '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', 
  '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
];

const openBookingModal = (tariff) => {
  selectedTariff.value = tariff;
  showBookingModal.value = true;
};

const isTimeSlotAvailable = (time, pc) => {
  return !bookedPCs.value.some(booking => 
    booking.date === selectedDate.value && 
    booking.time === time && 
    booking.pc === pc
  );
};

const handleBooking = () => {
  if (!selectedDate.value || !selectedTime.value || !selectedPC.value) {
    alert('Пожалуйста, выберите дату, время и компьютер');
    return;
  }

  // Сохраняем бронирование
  const newBooking = {
    date: selectedDate.value,
    time: selectedTime.value,
    pc: selectedPC.value,
    tariff: selectedTariff.value
  };

  // Добавляем в localStorage
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  bookings.push(newBooking);
  localStorage.setItem('bookings', JSON.stringify(bookings));

  // Обновляем список занятых компьютеров
  bookedPCs.value.push(newBooking);

  // Закрываем модальное окно и сбрасываем выбранные значения
  showBookingModal.value = false;
  selectedDate.value = new Date().toISOString().split('T')[0];
  selectedTime.value = '';
  selectedPC.value = null;
};

// Меняем фон только для этой страницы
onMounted(() => {
  document.body.style.backgroundColor = "var(--background)";
  // Загружаем существующие бронирования из localStorage
  const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  bookedPCs.value = savedBookings;
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
        <h1 class="title">Прайс-лист</h1>
      </header>

      <div class="price-grid">
        <!-- Верхний ряд - стандартные тарифы -->
        <div class="price-card glass-bg">
          <h2 class="price-title">КАЙФУЛЯ</h2>
          <div class="price-amount">100 ₽/час</div>
          <button class="btn" @click="openBookingModal('КАЙФУЛЯ')">Бронь</button>
        </div>

        <div class="price-card glass-bg">
          <h2 class="price-title">СИГМА</h2>
          <div class="price-amount">200 ₽/час</div>
          <button class="btn" @click="openBookingModal('СИГМА')">Бронь</button>
        </div>

        <div class="price-card glass-bg">
          <h2 class="price-title">МЕГАХАРОШ</h2>
          <div class="price-amount">300 ₽/час</div>
          <button class="btn" @click="openBookingModal('МЕГАХАРОШ')">Бронь</button>
        </div>

        <!-- Нижний ряд - VIP тарифы -->
        <div class="price-card glass-bg">
          <h2 class="price-title">ВИП-КАЙФУЛЯ</h2>
          <div class="price-amount">250 ₽/час</div>
          <button class="btn" @click="openBookingModal('ВИП-КАЙФУЛЯ')">Бронь</button>
        </div>

        <div class="price-card glass-bg">
          <h2 class="price-title">ВИП-СИГМА</h2>
          <div class="price-amount">350 ₽/час</div>
          <button class="btn" @click="openBookingModal('ВИП-СИГМА')">Бронь</button>
        </div>

        <div class="price-card glass-bg">
          <h2 class="price-title">ВИП-МЕГАХАРОШ</h2>
          <div class="price-amount">450 ₽/час</div>
          <button class="btn" @click="openBookingModal('ВИП-МЕГАХАРОШ')">Бронь</button>
        </div>
      </div>
    </div>

    <!-- Модальное окно бронирования -->
    <div v-if="showBookingModal" class="modal-overlay" @click="showBookingModal = false">
      <div class="modal-content glass-bg" @click.stop>
        <div class="modal-header">
          <h2>Бронирование {{ selectedTariff }}</h2>
          <button class="close-btn" @click="showBookingModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="booking-form">
          <!-- Выбор даты -->
          <div class="form-group">
            <label>Выберите дату:</label>
            <input type="date" 
                   v-model="selectedDate" 
                   :min="new Date().toISOString().split('T')[0]"
                   class="form-input">
          </div>

          <!-- Выбор компьютера -->
          <div class="form-group">
            <label>Выберите компьютер:</label>
            <div class="pc-grid">
              <button v-for="pc in computers" 
                      :key="pc.id"
                      class="pc-btn"
                      :class="{ 
                        'selected': selectedPC === pc.id,
                        'booked': !isTimeSlotAvailable(selectedTime, pc.id)
                      }"
                      @click="selectedPC = pc.id"
                      :disabled="!isTimeSlotAvailable(selectedTime, pc.id)">
                {{ pc.name }}
              </button>
            </div>
          </div>

          <!-- Выбор времени -->
          <div class="form-group">
            <label>Выберите время:</label>
            <div class="time-grid">
              <button v-for="time in timeSlots"
                      :key="time"
                      class="time-btn"
                      :class="{ 
                        'selected': selectedTime === time,
                        'booked': !isTimeSlotAvailable(time, selectedPC)
                      }"
                      @click="selectedTime = time"
                      :disabled="!isTimeSlotAvailable(time, selectedPC)">
                {{ time }}
              </button>
            </div>
          </div>

          <button class="submit-btn" 
                  @click="handleBooking"
                  :disabled="!selectedDate || !selectedTime || !selectedPC">
            Подтвердить бронирование
          </button>
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
  margin-bottom: 4rem;
}

.title {
  font-size: 3rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  text-shadow: 0 0 20px rgba(64, 224, 208, 0.5);
}

.price-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 2rem;
  width: 100%;
}

.price-card {
  background: rgba(13, 13, 13, 0.7);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  border: 1px solid rgba(64, 224, 208, 0.1);
}

.price-title {
  font-size: 1.5rem;
  color: #40E0D0;
  margin: 0;
}

.price-amount {
  font-size: 2rem;
  color: white;
  font-weight: bold;
}

.btn {
  background: linear-gradient(45deg, #40E0D0, #9370DB);
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(64, 224, 208, 0.3);
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

@media (max-width: 1024px) {
  .price-grid {
    gap: 1.5rem;
  }
  
  .price-card {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .page-wrapper {
    padding: 1rem;
  }

  .price-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .title {
    font-size: 2rem;
  }

  .price-title {
    font-size: 1.3rem;
  }

  .price-amount {
    font-size: 1.8rem;
  }
}

@media (max-width: 480px) {
  .price-grid {
    grid-template-columns: 1fr;
  }

  .price-card {
    padding: 1.2rem;
  }

  .btn {
    padding: 0.7rem 1.5rem;
    font-size: 1rem;
  }
}

/* Модальное окно */
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
  max-width: 600px;
  padding: 2rem;
  border-radius: 12px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.modal-header h2 {
  color: #40E0D0;
  font-size: 1.8rem;
  text-shadow: 0 0 10px rgba(64, 224, 208, 0.3);
}

.close-btn {
  background: none;
  border: none;
  color: #40E0D0;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  transform: rotate(90deg);
}

/* Форма бронирования */
.booking-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: white;
  font-size: 1.1rem;
}

.form-input {
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(64, 224, 208, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 1rem;
}

.form-input:focus {
  outline: none;
  border-color: rgba(64, 224, 208, 0.5);
}

/* Сетка компьютеров */
.pc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 0.5rem;
}

.pc-btn {
  padding: 0.8rem;
  background: rgba(64, 224, 208, 0.1);
  border: 1px solid rgba(64, 224, 208, 0.2);
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pc-btn:hover:not(:disabled) {
  background: rgba(64, 224, 208, 0.2);
  transform: translateY(-2px);
}

.pc-btn.selected {
  background: rgba(64, 224, 208, 0.3);
  border-color: rgba(64, 224, 208, 0.5);
}

.pc-btn.booked {
  background: rgba(255, 0, 0, 0.1);
  border-color: rgba(255, 0, 0, 0.2);
  cursor: not-allowed;
}

/* Сетка времени */
.time-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 0.5rem;
}

.time-btn {
  padding: 0.8rem;
  background: rgba(64, 224, 208, 0.1);
  border: 1px solid rgba(64, 224, 208, 0.2);
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.time-btn:hover:not(:disabled) {
  background: rgba(64, 224, 208, 0.2);
  transform: translateY(-2px);
}

.time-btn.selected {
  background: rgba(64, 224, 208, 0.3);
  border-color: rgba(64, 224, 208, 0.5);
}

.time-btn.booked {
  background: rgba(255, 0, 0, 0.1);
  border-color: rgba(255, 0, 0, 0.2);
  cursor: not-allowed;
}

.submit-btn {
  padding: 1rem;
  background: linear-gradient(45deg, rgba(64, 224, 208, 0.2), rgba(147, 112, 219, 0.2));
  border: 1px solid rgba(64, 224, 208, 0.3);
  border-radius: 8px;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  background: linear-gradient(45deg, rgba(64, 224, 208, 0.3), rgba(147, 112, 219, 0.3));
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
