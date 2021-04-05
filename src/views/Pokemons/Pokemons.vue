<template>
  <div class="pokemons">
    <h4>Pokemons <a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons" @click="modalOpen = true">add</i></a></h4>
    <table class="highlight">
      <thead>
        <tr>
          <th>ID</th>
          <th>Pokemon ID</th>
          <th>Name</th>
          <th>Sprite</th>
          <th>Type</th>
          <th>Power</th>
          <th>HP</th>
          <th>Attack</th>
          <th>Defense</th>
          <th>Speed</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="pokemon in pokemons" :key="pokemon._id">
          <td>{{ pokemon._id }}</td>
          <td>{{ pokemon.pokemonId }}</td>
          <td>{{ pokemon.name }}</td>
          <td>{{ pokemon.sprite }}</td>
          <td>{{ pokemon.type }}</td>
          <td>{{ pokemon.power }}</td>
          <td>{{ pokemon.stats.hp }}</td>
          <td>{{ pokemon.stats.attack }}</td>
          <td>{{ pokemon.stats.defense }}</td>
          <td>{{ pokemon.stats.speed }}</td>
        </tr>
      </tbody>
    </table>
    <ul class="pagination">
      <li class="waves-effect" v-for="i in totalPages" :key="i" :class="{ active: i === page }" @click="changePage(i)"><a>{{ i }}</a></li>
    </ul>
  </div>
</template>

<script>
import './pokemons.scss'

export default {
  name: 'Pokemons',
  data () {
    return {
      modalOpen: false,
      pokemons: [],
      add: {
        number: '',
        power: '',
        duration: '',
        dropItems: ''
      },
      page: 1,
      limit: 10,
      totalCount: 0,
      totalPages: 0
    }
  },
  created () {
    this.getPokemons()
  },
  methods: {
    getPokemons () {
      fetch(`https://poxey.herokuapp.com/api/v1/pokemons?page=${this.page}&limit=${this.limit}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            this.pokemons = data.pokemons
            this.totalCount = data.totalCount
            this.totalPages = data.totalPages
          }
        })
        .catch((err) => console.log(err))
    },
    changePage (page) {
      this.page = page
      this.getPokemons()
    }
  }
}
</script>
