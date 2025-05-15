<script setup>
import { onMounted, onUnmounted } from "vue";

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

<div class="title">
    <h1>Наши плюсы</h1>
</div>

<div class="mini-title">
    <p>Мы усердно работаем каждый день, для вашего комфорта.</p>
</div>

<div class="quality">
    <img src="../image/Advantages/image 1.png" class="quality-photo">
    <h2 class="quality-text">Качество</h2>
    <p class="quality-minitext1">Каждый из наших работников прошёл</p>
    <p class="quality-minitext2">специальный курс для поступления к нам.</p>
</div>

<div class="support">
    <img src="../image/Advantages/image 2.png" class="support-photo">
    <h2 class="support-text">Поддержка</h2>
    <p class="support-minitext1">Отвечаем за 5 минут и гарантируем помощь.</p>
</div>

<div class="price">
    <img src="../image/Advantages/image 3.png" class="price-photo">
    <h2 class="price-text">Цена</h2>
    <p class="price-minitext1">Наши цены максимально комфортные и</p>
    <p class="price-minitext2">доступные для всех посетителей.</p>
</div>
</template>

<style>
.back-icon {
  position: absolute;
  width: 40px;
  height: 50px;
  margin-top: -350px;
  margin-left: -800px;
}

.price-minitext2 {
    position: absolute;
    margin-top: 245px;
    margin-left: 385px;
}

.price-minitext1 {
    position: absolute;
    margin-top: 215px;
    margin-left: 360px;
}

.price-text {
    position: absolute;
    margin-top: 140px;
    margin-left: 460px;
    font-size: 30px;
}

.price-photo {
    position: absolute;
    width: 185px;
    height: 347px;
    margin-top: -200px;
    margin-left: 400px;
}

.support-minitext1 {
    position: absolute;
    margin-top: 215px;
    margin-left: -110px;
}

.support-text {
    position: absolute;
    margin-top: 145px;
    margin-left: -30px;
    font-size: 30px;
}

.support-photo {
    position: absolute;
    width: 259px;
    height: 347px;
    margin-top: -200px;
    margin-left: -80px;
}

.quality-minitext2 {
    position: absolute;
    margin-top: 250px;
    margin-left: -622px;
}

.quality-minitext1 {
    position: absolute;
    margin-top: 220px;
    margin-left: -610px;
}


.quality-text {
    position: absolute;
    margin-top: 150px;
    margin-left: -540px;
    font-size: 30px;
}

.quality-photo {
    position: absolute;
    width: 185px;
    height: 347px;
    margin-top: -200px;
    margin-left: -550px;
}

.mini-title {
    position: absolute;
    margin-top: -280px;
    margin-left: -250px;
    font-size: 20px;
}

.title {
    position: absolute;
    justify-content: center;
    align-items: center;
    margin-top: -350px;
    margin-left: -90px;
}
</style>