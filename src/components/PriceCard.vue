<script setup>
defineProps({
  title: String,
  price: Number
});
</script>

<template>
    <div class="price-card1">
      <h2>{{ title }}</h2>
      <hr class="white" />
      <p class="price">{{ price }} ₽/   час</p>
      <button class="btn">Бронь</button>
    </div>
  </template>
  

  
  <style scoped>
  .price-card1, .price-card2 {
    display: grid; /* Убираем grid */
    background-color: #222;
    color: white;
    padding: 40px;
    border-radius: 20px;
    text-align: center;
    width: 100%; /* Важно, чтобы ширина была 100% */
    /* width: 300px;  Удалите фиксированную ширину */
    height: 300px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.6);
    transition: transform 0.2s;
  }
  
  .price-card:hover {
    transform: scale(1.05);
  }
  
  .price-card h2 {
    margin: 0;
    font-size: 1.75rem;
  }
  
  .price-card hr {
    margin: 20px 0;
    border: 0.5px solid white;
  }
  .white {
    color: white;
    background-color: white;
    border-radius: 10px;
  }
  .price {
    font-size: 1.5rem;
    margin: 20px 0;
  }
  
  .btn {
    background-color: #444;
    border: none;
    color: white;
    padding: 15px;
    border-radius: 12px;
    cursor: pointer;
    width: 100%;
    font-size: 1.25rem;
  }
  
  .btn:hover {
    background-color: #555;
  }
  </style>
  
  