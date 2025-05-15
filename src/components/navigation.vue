<script setup>
import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';

const isOpen = ref(false);
const showLoginModal = ref(false);
const showRegisterModal = ref(false);
const isLoggedIn = ref(false);
const currentUser = ref(null);

// Уведомления
const notification = ref({
  show: false,
  message: '',
  type: 'success' // success, error
});

const showNotification = (message, type = 'success') => {
  notification.value = {
    show: true,
    message,
    type
  };
  setTimeout(() => {
    notification.value.show = false;
  }, 3000);
};

// Формы
const loginForm = ref({
  phone: '',
  code: ''
});

const registerForm = ref({
  name: '',
  phone: '',
  password: ''
});

const toggleNav = () => {
  isOpen.value = !isOpen.value;
};

const closeNav = () => {
  isOpen.value = false;
};

const openLoginModal = () => {
  showLoginModal.value = true;
  closeNav();
};

const openRegisterModal = () => {
  showRegisterModal.value = true;
  closeNav();
};

const closeModals = () => {
  showLoginModal.value = false;
  showRegisterModal.value = false;
};

// Регистрация
const handleRegister = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  if (users.some(user => user.phone === registerForm.value.phone)) {
    showNotification('Пользователь с таким телефоном уже существует', 'error');
    return;
  }

  users.push({
    id: Date.now(),
    ...registerForm.value
  });

  localStorage.setItem('users', JSON.stringify(users));
  showNotification('Регистрация успешна!');
  closeModals();
  registerForm.value = { name: '', phone: '', password: '' };
};

// Вход
const handleLogin = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.phone === loginForm.value.phone && u.password === loginForm.value.code);

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    isLoggedIn.value = true;
    currentUser.value = user;
    showNotification('Вход выполнен успешно!');
    closeModals();
    loginForm.value = { phone: '', code: '' };
  } else {
    showNotification('Неверный телефон или пароль', 'error');
  }
};

// Выход
const handleLogout = () => {
  localStorage.removeItem('currentUser');
  isLoggedIn.value = false;
  currentUser.value = null;
  showNotification('Вы вышли из аккаунта');
};

// Проверка авторизации при загрузке
onMounted(() => {
  const user = localStorage.getItem('currentUser');
  if (user) {
    isLoggedIn.value = true;
    currentUser.value = JSON.parse(user);
  }
});
</script>

<template>
  <div class="nav-container" :class="{ 'open': isOpen }">
    <button class="toggle-btn" @click="toggleNav">
      <div class="burger-icon" :class="{ 'open': isOpen }">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>

    <div class="nav-content">
      <div class="nav-header">
        <div class="nav-logo">
        </div>
      </div>

      <nav class="nav-menu">
        <RouterLink to="/" class="nav-link" @click="closeNav">
          <i class="fas fa-home nav-icon"></i>
          <span class="nav-text">Главная</span>
        </RouterLink>
        <RouterLink to="/pricelist" class="nav-link" @click="closeNav">
          <i class="fas fa-tags nav-icon"></i>
          <span class="nav-text">Прайс-лист</span>
        </RouterLink>
        <RouterLink to="/o-nas" class="nav-link" @click="closeNav">
          <i class="fas fa-info-circle nav-icon"></i>
          <span class="nav-text">О нас</span>
        </RouterLink>
        <RouterLink to="/news" class="nav-link" @click="closeNav">
          <i class="fas fa-newspaper nav-icon"></i>
          <span class="nav-text">Новости</span>
        </RouterLink>
        <RouterLink to="/team" class="nav-link" @click="closeNav">
          <i class="fas fa-users nav-icon"></i>
          <span class="nav-text">Команда</span>
        </RouterLink>
        <RouterLink to="/map" class="nav-link" @click="closeNav">
          <i class="fas fa-map-marker-alt nav-icon"></i>
          <span class="nav-text">Карта</span>
        </RouterLink>
        <RouterLink v-if="isLoggedIn" to="/profile" class="nav-link" @click="closeNav">
          <i class="fas fa-user nav-icon"></i>
          <span class="nav-text">Личный кабинет</span>
        </RouterLink>
      </nav>

      <div class="auth-buttons">
        <template v-if="!isLoggedIn">
          <button class="auth-btn login-btn" @click="openLoginModal">
            <i class="fas fa-sign-in-alt"></i>
            <span>Вход</span>
          </button>
          <button class="auth-btn register-btn" @click="openRegisterModal">
            <i class="fas fa-user-plus"></i>
            <span>Регистрация</span>
          </button>
        </template>
        <template v-else>
          <div class="user-info">
            <span>{{ currentUser.name }}</span>
          </div>
          <button class="auth-btn logout-btn" @click="handleLogout">
            <i class="fas fa-sign-out-alt"></i>
            <span>Выход</span>
          </button>
        </template>
      </div>

      <div class="nav-footer">
        <div class="social-links">
          <a href="https://vk.com/jh1mera" target="_blank" class="social-link">
            <i class="fab fa-vk"></i>
            <span>VK</span>
          </a>
          <a href="https://t.me/yakoncheniyu" target="_blank" class="social-link">
            <i class="fab fa-telegram"></i>
            <span>TG</span>
          </a>
          <a href="https://discord.gg/R9BaJVT27Q" target="_blank" class="social-link">
            <i class="fab fa-discord"></i>
            <span>DS</span>
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Уведомление -->
  <transition name="notification-fade">
    <div v-if="notification.show" 
         class="custom-notification" 
         :class="notification.type">
      <div class="notification-content">
        <i class="fas" :class="notification.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'"></i>
        <span>{{ notification.message }}</span>
      </div>
    </div>
  </transition>

  <div class="modal" v-if="showLoginModal" @click.self="closeModals">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Вход</h2>
        <button class="close-btn" @click="closeModals">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <form class="auth-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <input type="tel" v-model="loginForm.phone" placeholder="Телефон" class="form-input" required>
        </div>
        <div class="form-group">
          <input type="password" v-model="loginForm.code" placeholder="Пароль" class="form-input" required>
        </div>
        <button type="submit" class="submit-btn">Войти</button>
        <div class="forgot-password">
          <a href="#" @click.prevent>Забыли пароль?</a>
        </div>
      </form>
    </div>
  </div>

  <div class="modal" v-if="showRegisterModal" @click.self="closeModals">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Регистрация</h2>
        <button class="close-btn" @click="closeModals">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <form class="auth-form" @submit.prevent="handleRegister">
        <div class="form-group">
          <input type="text" v-model="registerForm.name" placeholder="Имя" class="form-input" required>
        </div>
        <div class="form-group">
          <input type="tel" v-model="registerForm.phone" placeholder="Телефон" class="form-input" required>
        </div>
        <div class="form-group">
          <input type="password" v-model="registerForm.password" placeholder="Пароль" class="form-input" required>
        </div>
        <button type="submit" class="submit-btn">Зарегистрироваться</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #0a0a1a;
  overflow-x: hidden;
  min-height: 100vh;
}

.nav-container {
  position: fixed;
  left: -300px;
  top: 0;
  height: 100vh;
  width: 300px;
  background: rgba(10, 10, 26, 0.95);
  backdrop-filter: blur(10px);
  transition: left 0.3s ease;
  z-index: 1000;
  border-right: 1px solid rgba(64, 224, 208, 0.2);
  box-shadow: 5px 0 30px rgba(64, 224, 208, 0.15);
}

.nav-container.open {
  left: 0;
  box-shadow: 5px 0 30px rgba(64, 224, 208, 0.15);
}

.toggle-btn {
  position: absolute;
  left: 100%;
  top: 20px;
  background: rgba(10, 10, 26, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(64, 224, 208, 0.2);
  padding: 15px;
  cursor: pointer;
  border-radius: 0 8px 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  background: rgba(64, 224, 208, 0.1);
}

.burger-icon {
  width: 30px;
  height: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.burger-icon span {
  display: block;
  width: 100%;
  height: 2px;
  background: #40E0D0;
  border-radius: 2px;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(64, 224, 208, 0.5);
}

.burger-icon.open span:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.burger-icon.open span:nth-child(2) {
  opacity: 0;
}

.burger-icon.open span:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

.nav-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.nav-header {
  padding: 20px 0;
  text-align: center;
  border-bottom: 1px solid rgba(64, 224, 208, 0.2);
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 0 0 15px rgba(64, 224, 208, 0.6);
}

.nav-menu {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 30px 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 20px;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(64, 224, 208, 0);
}

.nav-link:hover {
  background: rgba(64, 224, 208, 0.1);
  border-color: rgba(64, 224, 208, 0.2);
  transform: translateX(5px);
}

.nav-icon {
  font-size: 1.2rem;
  min-width: 24px;
  text-align: center;
  color: #40E0D0;
  text-shadow: 0 0 10px rgba(64, 224, 208, 0.3);
}

.nav-link:hover .nav-icon {
  transform: scale(1.1);
}

.nav-text {
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.05em;
}

.auth-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 0;
  border-top: 1px solid rgba(64, 224, 208, 0.2);
}

.auth-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(64, 224, 208, 0.1);
  color: white;
  border: 1px solid rgba(64, 224, 208, 0.2);
}

.login-btn {
  background: rgba(64, 224, 208, 0.15);
}

.register-btn {
  background: rgba(147, 112, 219, 0.15);
}

.auth-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(64, 224, 208, 0.15);
}

.login-btn:hover {
  background: rgba(64, 224, 208, 0.25);
}

.register-btn:hover {
  background: rgba(147, 112, 219, 0.25);
}

.nav-footer {
  padding: 20px 0;
  border-top: 1px solid rgba(64, 224, 208, 0.2);
  margin-top: auto;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.social-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  color: white;
  text-decoration: none;
  font-size: 0.8rem;
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(64, 224, 208, 0.1);
  transition: all 0.3s ease;
  border: 1px solid rgba(64, 224, 208, 0.1);
}

.social-link:hover {
  background: rgba(64, 224, 208, 0.2);
  transform: translateY(-2px);
  border-color: rgba(64, 224, 208, 0.3);
  box-shadow: 0 5px 15px rgba(64, 224, 208, 0.1);
}

.social-link i {
  font-size: 1.2rem;
  color: #40E0D0;
  text-shadow: 0 0 10px rgba(64, 224, 208, 0.3);
}

.social-link span {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

@media (max-width: 768px) {
  .nav-container {
    width: 280px;
    left: -280px;
  }

  .nav-content {
    padding: 15px;
  }

  .nav-link {
  padding: 10px 15px;
  }

  .nav-text {
    font-size: 0.9rem;
  }

  .auth-btn {
    padding: 10px;
    font-size: 0.9rem;
  }

  .social-link {
    padding: 6px 10px;
  }

  .social-link i {
    font-size: 1.1rem;
  }

  .social-link span {
    font-size: 0.65rem;
  }
}

@media (max-width: 480px) {
  .nav-container {
    width: 260px;
    left: -260px;
  }

  .toggle-btn {
    padding: 12px;
  }

  .burger-icon {
    width: 25px;
    height: 18px;
  }

  .nav-logo {
    font-size: 1.2rem;
  }

  .auth-btn {
    padding: 8px;
    font-size: 0.85rem;
  }

  .social-link {
    padding: 5px 8px;
  }

  .social-link i {
    font-size: 1rem;
  }

  .social-link span {
    font-size: 0.6rem;
  }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 26, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background: rgba(20, 20, 40, 0.95);
  border: 1px solid rgba(64, 224, 208, 0.3);
  border-radius: 12px;
  padding: 30px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 0 30px rgba(64, 224, 208, 0.2);
  animation: modalAppear 0.3s ease;
}

@keyframes modalAppear {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.modal-header h2 {
  color: #40E0D0;
  font-size: 1.5rem;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(64, 224, 208, 0.3);
}

.close-btn {
  background: none;
  border: none;
  color: #40E0D0;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 5px;
  transition: all 0.3s ease;
}

.close-btn:hover {
  color: white;
  transform: rotate(90deg);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(64, 224, 208, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: rgba(64, 224, 208, 0.5);
  background: rgba(64, 224, 208, 0.1);
  box-shadow: 0 0 15px rgba(64, 224, 208, 0.1);
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.submit-btn {
  background: linear-gradient(45deg, rgba(64, 224, 208, 0.15), rgba(147, 112, 219, 0.15));
  border: 1px solid rgba(64, 224, 208, 0.3);
  padding: 12px;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: linear-gradient(45deg, rgba(64, 224, 208, 0.25), rgba(147, 112, 219, 0.25));
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(64, 224, 208, 0.15);
}

.forgot-password {
  text-align: center;
  margin-top: 10px;
}

.forgot-password a {
  color: rgba(64, 224, 208, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.forgot-password a:hover {
  color: #40E0D0;
  text-shadow: 0 0 10px rgba(64, 224, 208, 0.3);
}

@media (max-width: 768px) {
  .modal-content {
    padding: 20px;
  }

  .modal-header h2 {
    font-size: 1.3rem;
  }

  .form-input {
    padding: 10px 12px;
    font-size: 0.9rem;
  }

  .submit-btn {
    padding: 10px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .modal-content {
  padding: 15px;
  }

  .modal-header h2 {
    font-size: 1.2rem;
  }

  .form-input {
    padding: 8px 10px;
    font-size: 0.85rem;
  }

  .submit-btn {
    padding: 8px;
    font-size: 0.85rem;
  }
}

.user-info {
  color: #40E0D0;
  padding: 10px;
  text-align: center;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(64, 224, 208, 0.3);
}

.logout-btn {
  background: rgba(255, 0, 0, 0.1);
  border-color: rgba(255, 0, 0, 0.2);
}

.logout-btn:hover {
  background: rgba(255, 0, 0, 0.2);
}

/* Стили для уведомлений */
.custom-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 25px;
  border-radius: 8px;
  z-index: 2000;
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease-out;
}

.custom-notification.success {
  background: rgba(0, 200, 81, 0.2);
  border: 1px solid rgba(0, 200, 81, 0.3);
}

.custom-notification.error {
  background: rgba(255, 0, 0, 0.2);
  border: 1px solid rgba(255, 0, 0, 0.3);
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
}

.notification-content i {
  font-size: 1.2rem;
}

.success i {
  color: #00C851;
  text-shadow: 0 0 10px rgba(0, 200, 81, 0.5);
}

.error i {
  color: #ff4444;
  text-shadow: 0 0 10px rgba(255, 68, 68, 0.5);
}

/* Анимации */
.notification-fade-enter-active,
.notification-fade-leave-active {
  transition: all 0.3s ease;
}

.notification-fade-enter-from,
.notification-fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Медиа-запросы для адаптивности */
@media (max-width: 768px) {
  .custom-notification {
    top: 10px;
    right: 10px;
    left: 10px;
    padding: 12px 20px;
  }
}
</style>  