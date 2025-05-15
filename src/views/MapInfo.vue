<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const name = ref("")
const mail = ref("")
const messege = ref("")

const isValidName = computed(() => /^[a-zA-Zа-яА-ЯёЁ0-9\s]+$/.test(name.value) || name.value === "");
const isValidMail = computed(() => /^[a-zA-Zа-яА-ЯёЁ0-9\s]+$/.test(mail.value) || mail.value === "");
const isValidMessege = computed(() => /^[a-zA-Zа-яА-ЯёЁ0-9\s]+$/.test(messege.value) || messege.value === "");
const isFormValid = computed(() => name.value && mail.value && messege.value && isValidName.value && isValidMail.value && isValidMessege.value);
const submitClear = () => {
    mail.value = "";
    name.value = "";
    messege.value = "";
}

const submitForm = () => {
  if (isFormValid.value) {
    console.log("Данные отправлены:", { name: name.value, mail: name.value, messege: messege.value});

    // Показываем уведомление
    showNotification.value = true;

    // Скрываем уведомление через 3 секунды
    setTimeout(() => {
      showNotification.value = false;
    }, 3000);
    mail.value = "";
    name.value = "";
    messege.value = "";
  }
};
const showNotification = ref(false);
// Меняем фон только для этой страницы
onMounted(() => {
  document.body.style.backgroundColor = "black";
  document.body.style.color = "white";
});

onUnmounted(() => {
  document.body.style.backgroundColor = "";
  document.body.style.color = "";
});
</script>

<template>

<RouterLink to="/home" class="go-home"> 
  <img src="../image/back-icon.png" class="back-icon">
</RouterLink>
    <h1 class="name-address">Адресс:</h1>
    <a href="https://yandex.ru/maps/-/CHqfM6jF" class="address">ул. Маяковского, 75, Йошкар-Ола, Респ. Марий Эл</a>
    <h1 class="title-number">Номер телефона:</h1>
    <a class="number">+ 7 (902) 102-26-10</a>
    <h1 class="mail-title">Почта:</h1>
    <p class="mail">zenkai@mail.ru</p>
    <h1 class="job-title">Режим работы:</h1>
    <p class="job">Круглосуточно</p>

    <div class="form">
        <h1 class="title-form">Можете отправить нам свои пожелания.</h1>
        <input v-model="name" class="name-input" placeholder="Имя">
        <input v-model="mail" class="mail-input" placeholder="Почта">
        <textarea v-model="messege" class="messege" placeholder="Сообщение"></textarea>
        <button class="clear" @click="submitClear">Очистить</button>
        <button @click="submitForm" class="send" :disabled="!isFormValid">Отправить</button>
    </div>

    <div v-if="showNotification" class="notification">
    ✅ Успешно отправлено!
  </div>
</template>

<style>
.back-icon {
  position: absolute;
  width: 40px;
  height: 50px;
  margin-top: -360px;
  margin-left: -800px;
}

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

.name-input::placeholder,
.mail-input::placeholder,
.messege::placeholder {
    color: #aaa;
}

.send {
    position: absolute;
    margin-top: 435px;
    margin-left: 300px;
    height: 50px;
    width: 150px;  
    padding: 12px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s; 
}

.send:hover {
    background-color: #388e3c;
}

.clear {
    position: absolute;
    margin-top: 435px;
    margin-left: 50px;
    height: 50px;
    width: 150px;
    padding: 12px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    transition: background-color 0.3s;
}

.clear:hover {
    background-color: #d32f2f;
}

.messege {
    position: absolute;
    margin-top: 300px;
    margin-left: 50px;
    width: 400px;
    height: 100px;
    border-radius: 10px;
    border: 1px solid #555;
    font-size: 14px;
}


.mail-input {
    position: absolute;
    margin-top: 200px;
    margin-left: 50px;
    width: 400px;
    height: 50px;
    border-radius: 10px;
    border: 1px solid #555;
    font-size: 14px;
}

.name-input {
    position: absolute;
    margin-top: 100px;
    margin-left: 50px;
    width: 400px;
    height: 50px;
    border-radius: 10px;
    border: 1px solid #555;
    font-size: 14px;
}

.form {
    position: absolute;
    margin-top: -200px;
    margin-left: 200px;
    width: 500px;
    height: 500px;
    background-color: #222;
    border-radius: 2%;
    box-shadow: 0px 0px 6px #999;
}

.title-form {
    position: absolute;
    font-size: 25px;
    margin-left: 15px;
    margin-top: 10px;
}

.job {
    position: absolute;
    font-size: 25px;
    margin-left: -700px;
    margin-top: 170px;
}

.job-title {
    position: absolute;
    margin-left: -700px;
    margin-top: 100px;
}

.mail {
    position: absolute;
    font-size: 25px;
    margin-left: -700px;
    margin-top: 40px;
}

.mail-title {
    position: absolute;
    margin-left: -700px;
    margin-top: -20px;
}

.title-number {
    position: absolute;
    margin-top: -150px;
    margin-left: -700px;
}

.number {
    position: absolute;
    margin-top: -80px;
    margin-left: -700px;
    font-size: 25px;
    color: white;
    transition: color 0.3s, background-color 0.3s;
}
.number:hover {
    color: white; /* оставляем текст белым */
    background-color: black; /* делаем фон черным при наведении */
}

.name-address {
    position: absolute;
    margin-top: -300px;
    margin-left: -700px;
}

.address {
    position: absolute;
    font-size: 25px;
    color: white;
    margin-top: -225px;
    margin-left: -700px;
    transition: color 0.3s, background-color 0.3s;
}
.address:hover {
    color: white; /* оставляем текст белым */
    background-color: black; /* делаем фон черным при наведении */
    text-decoration: underline;
}
</style>