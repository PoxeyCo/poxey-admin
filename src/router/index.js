import Vue from 'vue'
import VueRouter from 'vue-router'
import cookie from 'vue-cookies'

import Home from '@/views/Home/Home.vue'
import Items from '@/views/Items/Items.vue'
import Pokemons from '@/views/Pokemons/Pokemons.vue'
import Levels from '@/views/Levels/Levels.vue'
import Users from '@/views/Users/Users.vue'
import Auth from '@/views/Auth/Auth.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: {
      auth: -1
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: 1
    }
  },
  {
    path: '/items',
    name: 'Items',
    component: Items,
    meta: {
      auth: 1
    }
  },
  {
    path: '/pokemons',
    name: 'Pokemons',
    component: Pokemons,
    meta: {
      auth: 1
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: {
      auth: 1
    }
  },
  {
    path: '/levels',
    name: 'Levels',
    component: Levels,
    meta: {
      auth: 1
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const accessToken = cookie.get('access_token')

  if (to.meta.auth === 1) {
    if (accessToken) {
      return next()
    } else {
      return next('/auth')
    }
  } else if (to.meta.auth === -1) {
    return next()
  }

  next('/auth')
})

export default router
