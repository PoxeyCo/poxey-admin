<template>
  <nav class="home-nav">
    <div class="nav-wrapper">
    <router-link to="/">
      <img src="@/assets/images/home/logo.svg" alt="logo">
    </router-link>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
      <li>
        <router-link to="/items">Items</router-link>
      </li>
      <li>
        <router-link to="/levels">Levels</router-link>
      </li>
      <li>
        <router-link to="/users">Users</router-link>
      </li>
      <li>
        <router-link to="/pokemons">Pokemons</router-link>
      </li>
    </ul>
    </div>
  </nav>
</template>

<script>
import './navigation.scss'

export default {
  name: 'Navigation'
}
</script>
