<script setup>
import { ref, computed } from "vue";

// Получаем текущую дату
const today = new Date();
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());
const selectedDate = ref(null); // Выбранная дата

// Функция для получения дней в месяце
const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

// Получение первого дня месяца
const getFirstDayOfMonth = (month, year) => {
  return new Date(year, month, 1).getDay();
};

// Дни недели
const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

// Вычисляем дни в текущем месяце
const days = computed(() => {
  const daysInMonth = getDaysInMonth(currentMonth.value, currentYear.value);
  const firstDay = getFirstDayOfMonth(currentMonth.value, currentYear.value);
  
  let daysArray = [];
  
  // Добавляем пустые ячейки перед началом месяца
  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
    daysArray.push(null);
  }
  
  // Добавляем дни месяца
  for (let day = 1; day <= daysInMonth; day++) {
    daysArray.push(day);
  }
  
  return daysArray;
});

// Функции переключения месяцев
const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

// Проверка, является ли день сегодняшним
const isToday = (day) => {
  return (
    day === today.getDate() &&
    currentMonth.value === today.getMonth() &&
    currentYear.value === today.getFullYear()
  );
};

// Проверка, является ли день выбранным
const isSelected = (day) => {
  return (
    selectedDate.value &&
    selectedDate.value.day === day &&
    selectedDate.value.month === currentMonth.value &&
    selectedDate.value.year === currentYear.value
  );
};

// Функция выбора даты
const selectDate = (day) => {
  selectedDate.value = {
    day,
    month: currentMonth.value,
    year: currentYear.value,
  };
};
</script>

<template>
  <div class="calendar">
    <div class="header">
      <button @click="prevMonth">❮</button>
      <h2>{{ new Date(currentYear, currentMonth).toLocaleString("ru", { month: "long", year: "numeric" }) }}</h2>
      <button @click="nextMonth">❯</button>
    </div>
    <div class="weekdays">
      <div v-for="day in weekDays" :key="day">{{ day }}</div>
    </div>
    <div class="days">
      <div 
        v-for="(day, index) in days" 
        :key="index" 
        :class="{ today: isToday(day), selected: isSelected(day) }"
        @click="day && selectDate(day)"
      >
        {{ day || "" }}
      </div>
    </div>

    <!-- Вывод выбранной даты -->
    <div v-if="selectedDate" class="selected-date">
      Вы выбрали: {{ selectedDate.day }} {{ new Date(selectedDate.year, selectedDate.month).toLocaleString("ru", { month: "long" }) }} {{ selectedDate.year }}
    </div>
  </div>
</template>

<style scoped>
.calendar {
  width: 320px;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  color: white;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

button {
  background: transparent;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

.weekdays, .days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.weekdays div, .days div {
  padding: 10px;
  text-align: center;
  cursor: pointer;
}

.days div:hover {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
}

.today {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
}

.selected {
  background: rgba(0, 150, 255, 0.5);
  border-radius: 5px;
}

/* Выбранная дата */
.selected-date {
  margin-top: 15px;
  font-size: 16px;
}
</style>
