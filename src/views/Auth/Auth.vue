<template>
  <div class="auth">
    <div class="auth-wrapper">
      <h3>Авторизация</h3>
      <div class="row">
        <div class="input-field col s12" style="margin-top: 0rem; margin-bottom: 0rem;">
          <input id="login" type="text" class="validate" v-model="login">
          <label for="login">Login</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12" style="margin-top: 0rem; margin-bottom: 0rem;">
          <input id="password" type="password" class="validate" v-model="password">
          <label for="password">Password</label>
        </div>
      </div>
      <a class="waves-effect waves-light btn red lighten-1" @click="signIn">Login</a>
    </div>
  </div>
</template>

<script>
import cookie from 'vue-cookies'
import './auth.scss'

export default {
  name: 'Auth',
  data () {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    signIn () {
      const requestBody = JSON.stringify({
        login: this.login,
        password: this.password
      })

      const requestHeaders = new Headers({
        'Content-Type': 'application/json'
      })

      const requestParams = {
        method: 'POST',
        body: requestBody,
        headers: requestHeaders
      }

      fetch('https://poxey.herokuapp.com/api/v1/accounts/signin', requestParams)
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            cookie.set('access_token', data.tokens.access, '1d')
            this.$router.push('/')
          }
        })
        .catch((err) => console.log(err))
    }
  }
}
</script>
