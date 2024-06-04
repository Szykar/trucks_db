import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TrucksView from '@/views/TrucksView.vue'
import TruckDetails from '@/components/modules/trucks/TruckDetails.vue'
import TrucksList from '@/components/modules/trucks/TrucksList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/trucks',
      name: 'trucks',
      component: TrucksView,
      children: [
        {
          path: 'all',
          name: 'allTrucks',
          component: TrucksList
        },
        {
          path: ':id',
          name: 'truckDetails',
          component: TruckDetails
        }
      ]
    }
  ]
})

export default router
