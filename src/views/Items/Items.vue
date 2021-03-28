<template>
  <div class="items">
    <div id="add-item" class="modal" style="display: block;" v-show="modalOpen">
      <div class="modal-content">
        <i class="material-icons close" @click="modalOpen = false">close</i>
        <h4>Add Item</h4>
        <div class="row">
          <div class="input-field col s12" style="margin-top: 0rem; margin-bottom: 0rem;">
            <input id="title" type="text" class="validate" v-model="add.title">
            <label for="title">Title</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12" style="margin-top: 0rem; margin-bottom: 0rem;">
            <input id="description" type="text" class="validate" v-model="add.description">
            <label for="description">Description</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12" style="margin-top: 0rem; margin-bottom: 0rem;">
            <input id="rarity" type="text" class="validate" v-model="add.rarity">
            <label for="rarity">Rarity</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12" style="margin-top: 0rem; margin-bottom: 0rem;">
            <input id="type" type="text" class="validate" v-model="add.type">
            <label for="type">Type</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12" style="margin-top: 0rem; margin-bottom: 0rem;">
            <input id="power" type="text" class="validate" v-model="add.power">
            <label for="power">Power</label>
          </div>
        </div>
        <a class="waves-effect waves-light btn red lighten-1" @click="addItem">Add Item</a>
      </div>
    </div>
    <h4>Items <a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons" @click="modalOpen = true">add</i></a></h4>
    <table class="highlight">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Rarity</th>
          <th>Type</th>
          <th>Power</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items" :key="item._id">
          <td>{{ item._id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td>{{ rarityMap[item.rarity] }}</td>
          <td>{{ itemMap[item.type] }}</td>
          <td>{{ item.power }}</td>
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
import './items.scss'

import rarityType from '@/types/rarityType'
import itemType from '@/types/itemType'

export default {
  name: 'Items',
  data () {
    return {
      modalOpen: false,
      items: [],
      rarityMap: {},
      itemMap: {},
      add: {
        title: '',
        description: '',
        rarity: '',
        type: '',
        power: ''
      },
      page: 1,
      limit: 10,
      totalCount: 0,
      totalPages: 0
    }
  },
  created () {
    this.getItems()

    Object.keys(rarityType).forEach((key) => {
      this.rarityMap[rarityType[key]] = key
    })

    Object.keys(itemType).forEach((key) => {
      this.itemMap[itemType[key]] = key
    })
  },
  methods: {
    getItems () {
      fetch(`https://poxey.herokuapp.com/api/v1/items?page=${this.page}&limit=${this.limit}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            this.items = data.items
            this.totalCount = data.totalCount
            this.totalPages = data.totalPages
          }
        })
        .catch((err) => console.log(err))
    },
    changePage (page) {
      this.page = page
      this.getItems()
    },
    addItem () {
      const requestBody = JSON.stringify({
        title: this.add.title,
        description: this.add.description,
        rarity: this.add.rarity,
        type: this.add.type,
        power: Number(this.add.power)
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

      fetch('https://poxey.herokuapp.com/api/v1/items/', requestParams)
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            this.getItems()
            this.modalOpen = false
          }
        })
        .catch((err) => console.log(err))
    }
  }
}
</script>
