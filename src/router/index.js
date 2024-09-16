import { createRouter, createWebHistory } from 'vue-router'
import Livros from '../views/Livros.vue'
import Emprestar from '../views/Emprestar.vue'
import Devolver from '../views/Devolver.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'livros',
      component: Livros
    },
    {
      path: '/devolver/:id',
      name: 'devolver-id',
      component: Devolver
    },
    {
      path: '/emprestar/:id',
      name: 'emprestar-id',
      component: Emprestar
    }
  ]
})

export default router
