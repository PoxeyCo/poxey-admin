<template>
  <div class="levels">
    <div id="add-item" class="modal" style="display: block;" v-show="modalOpen">
      <div class="modal-content">
        <i class="material-icons close" @click="modalOpen = false">close</i>
        <h4>Add Item</h4>
        <div class="row">
          <div class="input-field col s12" style="margin-top: 0rem; margin-bottom: 0rem;">
            <input id="number" type="text" class="validate" v-model="add.number">
            <label for="number">Number</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12" style="margin-top: 0rem; margin-bottom: 0rem;">
            <input id="power" type="text" class="validate" v-model="add.power">
            <label for="power">Power</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12" style="margin-top: 0rem; margin-bottom: 0rem;">
            <input id="duration" type="text" class="validate" v-model="add.duration">
            <label for="duration">Duration</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12" style="margin-top: 0rem; margin-bottom: 0rem;">
            <input id="dropItems" type="text" class="validate" v-model="add.dropItems">
            <label for="dropItems">Drop Items</label>
          </div>
        </div>
        <a class="waves-effect waves-light btn red lighten-1" @click="addLevel">Add Level</a>
      </div>
    </div>
    <h4>Levels <a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons" @click="modalOpen = true">add</i></a></h4>
    <table class="highlight">
      <thead>
        <tr>
          <th>ID</th>
          <th>Number</th>
          <th>Power</th>
          <th>Duration</th>
          <th>Drop Items</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="level in levels" :key="level._id">
          <td>{{ level._id }}</td>
          <td>{{ level.number }}</td>
          <td>{{ level.power }}</td>
          <td>{{ level.duration }}</td>
          <td>{{ level.dropItems.map((item) => { return { id: item.itemId, chance: item.chance } }) }}</td>
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
import './levels.scss'

export default {
  name: 'Levels',
  data () {
    return {
      modalOpen: false,
      levels: [],
      rarityMap: {},
      itemMap: {},
      add: {
        number: '',
        power: '',
        duration: '',
        dropItems: ''
      },
      page: 1,
      limit: 6,
      totalCount: 0,
      totalPages: 0
    }
  },
  created () {
    this.getLevels()
  },
  methods: {
    getLevels () {
      fetch(`https://poxey.herokuapp.com/api/v1/levels?page=${this.page}&limit=${this.limit}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            this.levels = data.levels
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
