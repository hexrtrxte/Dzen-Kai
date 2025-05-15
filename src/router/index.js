import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import News from '../views/News.vue'
import ONas from '../views/O-nas.vue'
import Team from '../views/Team.vue'
import PriceList from '../views/PriceList.vue'
import Booking from '@/views/Booking.vue'
import Advantages from '@/views/Advantages.vue'
import MapInfo from '@/views/MapInfo.vue'
import Map from '../views/Map.vue'
import Profile from '../views/Profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/news',
      name: 'news',
      component: News
    },
    {
      path: '/o-nas',
      name: 'o-nas',
      component: ONas
    },
    {
      path: '/team',
      name: 'team',
      component: Team
    },
    {
      path: '/pricelist',
      name: 'pricelist',
      component: PriceList
    },
    {
      path: '/booking',
      name: 'booking',
      component: Booking,
    },
    {
      path: '/advantages',
      name: 'advantages',
      component: Advantages,
    },
    {
      path: '/map-info',
      name: 'map-info',
      component: MapInfo,
    },
    {
      path: '/map',
      name: 'map',
      component: Map
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true }
    }
  ]
})

// Защита маршрутов
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      next('/');
      return;
    }
  }
  next();
});

export default router