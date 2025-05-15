<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router';
import LoadingScreen from './components/LoadingScreen.vue';
const route = useRoute();
</script>

<template>
    <LoadingScreen />
    <RouterLink to="/home" v-if="route.path === '/'" class="name-club">Дзен-Кай</RouterLink>
    <RouterView/>
</template>

<style scoped>
.name-club {
  position: absolute;
  margin-top: 0%;
  margin-left: -9%;
  color: white;
  text-decoration: underline;
}
</style>

<style>
@import '@/assets/main.css';

#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>