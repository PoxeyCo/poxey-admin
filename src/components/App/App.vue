<template>
  <div id="app">
    <Navigation />
    <router-view/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation.vue'

import '@/scss/_main.scss'

export default {
  name: 'App',
  components: {
    Navigation
  }
}
</script>
