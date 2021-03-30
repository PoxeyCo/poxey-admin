<template>
  <div class="users">
    <h4>Users</h4>
    <table class="highlight">
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Username</th>
          <th>Cash</th>
          <th>Registered On</th>
          <th>Admin Status</th>
          <th>Ban status</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.cash }}</td>
          <td>{{ user.registeredOn }}</td>
          <td>{{ user.isAdmin }}</td>
          <td>{{ user.isBanned }}</td>
        </tr>
      </tbody>
    </table>
    <ul class="pagination">
      <li class="waves-effect" v-for="i in totalPages" :key="i" :class="{ active: i === page }" @click="changePage(i)"><a>{{ i }}</a></li>
    </ul>
  </div>
</template>

<script>
import cookie from 'vue-cookies'
import './users.scss'

export default {
  name: 'Users',
  data () {
    return {
      modalOpen: false,
      users: [],
      page: 1,
      limit: 10,
      totalCount: 0,
      totalPages: 0
    }
  },
  created () {
    this.getLevels()
  },
  methods: {
    getLevels () {
      fetch(`https://poxey.herokuapp.com/api/v1/accounts?page=${this.page}&limit=${this.limit}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            this.users = data.users
            this.totalCount = data.totalCount
            this.totalPages = data.totalPages
          }
        })
        .catch((err) => console.log(err))
    },
    changePage (page) {
      this.page = page
      this.getLevels()
    },
    addLevel () {
      const dropItems = []

      this.add.dropItems.split('|').forEach((item) => {
        const itemObject = item.split(',')
        const id = itemObject[0]
        const chance = parseFloat(itemObject[1])

        dropItems.push({
          itemId: id,
          chance
        })
      })

      const requestBody = JSON.stringify({
        number: this.add.number,
        power: this.add.power,
        duration: this.add.duration,
        dropItems
      })

      const requestHeaders = new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookie.get('access_token')}`
      })

      const requestParams = {
        method: 'POST',
        headers: requestHeaders,
        body: requestBody
      }

      fetch('https://poxey.herokuapp.com/api/v1/levels/', requestParams)
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            this.getLevels()
            this.modalOpen = false
          }
        })
        .catch((err) => console.log(err))
    }
  }
}
</script>
