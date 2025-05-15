<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import Calendar from "../components/calendar.vue";

// Меняем фон только для этой страницы
onMounted(() => {
  document.body.style.backgroundColor = "black";
  document.body.style.color = "white";
});

onUnmounted(() => {
  document.body.style.backgroundColor = "";
  document.body.style.color = "";
});

// Поля ввода
const name = ref("");
const phone = ref("");

// Проверка имени (только буквы)
const isValidName = computed(() => /^[a-zA-Zа-яА-ЯёЁ]+$/.test(name.value) || name.value === "");

// Проверка номера (только цифры)
const isValidPhone = computed(() => /^[0-9]+$/.test(phone.value) || phone.value === "");

// Форма активна только при правильном вводе
const isFormValid = computed(() => name.value && phone.value && isValidName.value && isValidPhone.value);

// Уведомление о успешной отправке
const showNotification = ref(false);

// Функция отправки данных
const submitForm = () => {
  if (isFormValid.value) {
    console.log("Данные отправлены:", { name: name.value, phone: phone.value });

    // Показываем уведомление
    showNotification.value = true;

    // Скрываем уведомление через 3 секунды
    setTimeout(() => {
      showNotification.value = false;
    }, 3000);

    // Очистка полей после отправки
    name.value = "";
    phone.value = "";
  }
};
</script>

<template>
  <body>
  <!-- Заголовок -->
  <h1 class="title">Забронировать компьютер</h1>
  <p class="title-mini">Оставьте свои контакты, и мы перезвоним вам в течение 5 минут.</p>
  <RouterLink to="/home" class="go-home"> 
    <img src="../image/back-icon.png" class="back-icon">
  </RouterLink>
  <!-- Форма -->
  <div class="form-container">
    <input 
      type="text" 
      placeholder="Имя" 
      v-model="name" 
      class="input-field" 
      :class="{ 'error': !isValidName }"
    />
    <input 
      type="text" 
      placeholder="Телефон" 
      v-model="phone" 
      class="input-field" 
      :class="{ 'error': !isValidPhone }"
    />
    <div class="ps">
    <p>Если вам не позвонили,</p>
    <p>подождите еще немного!</p>
    </div>
    <button 
      class="send-btn" 
      @click="submitForm" 
      :disabled="!isFormValid"
    >
      Отправить
    </button>
  </div>

  <!-- Календарь -->
  <Calendar class="calendar"/>

  <div class="pc">

    <h1 class="title-pc">Кайфуля</h1>
    <p class="title-char1">Монитор: 27" 144 Hz</p>
    <p class="title-char2">Процессор: і5 9400F</p>
    <p class="title-char3">Видеокарта: GTX 1660 Super 668</p>
    <p class="title-char4">Оперативная память: 16 ГБ</p>
    <p class="title-char5">Наушники: ARTCORE</p>
    <p class="title-char6">Клавиатура: Cooler Master</p>
    <p class="title-char7">Мышь: A4Tech Bloody J905</p>
  </div>

  <div v-if="showDiscountModal" class="modal-overlay" @click="toggleDiscountModal">
  <div class="modal-content" @click.stop>
    <h3>Получите скидку!</h3>
    <p>Чтобы получить скидку, необходимо ввести ваше учебное заведение и номер телефона.</p>
    <p>Учтите, скидка действует 2 недели!</p>
    <input type="text" v-model="school" placeholder="Введите название" class="input-field" :class="{ 'error': !isValidSchool }" />
    <input type="text" v-model="phone" placeholder="Введите номер телефона" class="input-field" :class="{ 'error': !isValidPhone }" />
    <div class="modal-buttons">
      <button class="close-btn" @click="toggleDiscountModal">Закрыть</button>
      <button class="accept-btn" @click="submitForm" :disabled="!isFormValid">Принять</button>
    </div>
  </div>
</div>

  <!-- Уведомление -->
  <div v-if="showNotification" class="notification">
    ✅ Успешно! Вам перезвонят.
  </div>
<RouterView/>
</body>
</template>

<style scoped>

.q {
  position: absolute;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 10%;
  background-color: white;
}

.title-char7 {
  position: absolute;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 100%;
  margin-top: 70%;
  margin-left: 9%; 
}

.title-char6 {
  position: absolute;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 100%;
  margin-top: 60%;
  margin-left: 9%; 
}

.title-char5 {
  position: absolute;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 100%;
  margin-top: 50%;
  margin-left: 9%; 
}

.title-char4 {
  position: absolute;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 100%;
  margin-top: 40%;
  margin-left: 9%; 
}

.title-char3 {
  position: absolute;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 100%;
  margin-top: 30%;
  margin-left: 9%; 
}

.title-char2 {
  position: absolute;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 100%;
  margin-top: 20%;
  margin-left: 9%; 
}

.title-char1 {
  position: absolute;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 100%;
  margin-top: 10%;
  margin-left: 9%; 
}

.title-pc {
  position: absolute;
  justify-content: center;
  align-items: center;
  font-size: 150%;
  margin-left: 37%;
}

.pc {
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 32%;
  margin-left: 25%;
  margin-top: -9%;
  border-radius: 7%;
  background: rgba(255, 255, 255, 0.1);
}

.back-icon {
  position: absolute;
  width: 40px;
  height: 50px;
  margin-top: -350px;
  margin-left: -800px;
}

body {
  display: flex;
flex-flow: row;
justify-content: center;
background: rgba(0, 0, 0, 0.04);
}

/* Заголовки */
.title {
    position: absolute;
    font-size: 28px;
    margin-top: -350px;
    margin-left: -170px;
}

.title-mini {
    position: absolute;
    font-size: 16px;
    text-align: center;
    margin-bottom: 20px;
    color: white;
    margin-top: -280px;
    margin-left: -220px;
}

/* Контейнер формы */
.form-container {
    position: absolute;
    margin-top: -30px;
    margin-left: -250px;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

/* Поля ввода */
.input-field {
    width: 250px;
    padding: 10px;
    color: white;
    background-color: transparent;
    border: 1px solid white;
    border-radius: 5px;
    outline: none;
    transition: 0.3s;
}

.input-field::placeholder {
    color: rgba(255, 255, 255, 0.5);
}

.input-field:focus {
    border-color: #00bfff;
    background-color: rgba(255, 255, 255, 0.05);
}

/* Ошибка ввода */
.error {
    border-color: red;
    color: red;
}

/* Кнопка */
.send-btn {
    width: 100%;
    padding: 10px;
    background: #007BFF;
    border: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
}

.send-btn:disabled {
    background: gray;
    cursor: not-allowed;
}

.send-btn:hover:not(:disabled) {
    background: #0056b3;
}

/* Календарь */
.calendar {
    position: absolute;
    margin-top: 20px;
    margin-left: 200px;
    transform: translate(-50%, -50%);
}

/* Уведомление */
.notification {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 255, 0, 0.8);
    color: white;
    padding: 10px 20px;
    border-radius: 10px;
    font-size: 18px;
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
}

.notification.fade-out {
    opacity: 0;
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>