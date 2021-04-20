<template>
  <div class="home">
    <div class="home-stats">
      <h4>Counts</h4>
      <div class="row">
        <div class="col s12 m3">
          <div class="card deep-purple accent-1">
            <div class="card-content black-text">
              <span class="card-title">Items Count</span>
              <p>{{ counts.items }}</p>
            </div>
          </div>
        </div>
        <div class="col s12 m3">
          <div class="card deep-purple accent-1">
            <div class="card-content black-text">
              <span class="card-title">Levels Count</span>
              <p>{{ counts.levels }}</p>
            </div>
          </div>
        </div>
        <div class="col s12 m3">
          <div class="card deep-purple accent-1">
            <div class="card-content black-text">
              <span class="card-title">Users Count</span>
              <p>{{ counts.users }}</p>
            </div>
          </div>
        </div>
        <div class="col s12 m3">
          <div class="card deep-purple accent-1">
            <div class="card-content black-text">
              <span class="card-title">Pokemons Count</span>
              <p>{{ counts.pokemons }}</p>
            </div>
          </div>
        </div>
      </div>
      <h4>Adventures</h4>
      <div class="row">
        <div class="col s12 m3">
          <div class="card lime lighten-3">
            <div class="card-content black-text">
              <span class="card-title">Pending Adventures</span>
              <p>120</p>
            </div>
          </div>
        </div>
        <div class="col s12 m3">
          <div class="card orange lighten-3">
            <div class="card-content black-text">
              <span class="card-title">Completed Adventures (last 24h)</span>
              <p>120</p>
            </div>
          </div>
        </div>
        <div class="col s12 m3">
          <div class="card green lighten-1">
            <div class="card-content black-text">
              <span class="card-title">Successful Adventures (last 24h)</span>
              <p>120</p>
            </div>
          </div>
        </div>
        <div class="col s12 m3">
          <div class="card red lighten-1">
            <div class="card-content black-text">
              <span class="card-title">Failed Adventures (last 24h)</span>
              <p>120</p>
            </div>
          </div>
        </div>
      </div>
      <h4>Shop</h4>
      <div class="row">
        <div class="col s12 m3">
          <div class="card lime lighten-3">
            <div class="card-content black-text">
              <span class="card-title">Case opened (last 24h)</span>
              <p>120</p>
            </div>
          </div>
        </div>
        <div class="col s12 m3">
          <div class="card orange lighten-3">
            <div class="card-content black-text">
              <span class="card-title">Pokemons dropped (last 24h)</span>
              <p>120</p>
            </div>
          </div>
        </div>
        <div class="col s12 m3">
          <div class="card green lighten-1">
            <div class="card-content black-text">
              <span class="card-title">Items dropped (last 24h)</span>
              <p>120</p>
            </div>
          </div>
        </div>
        <div class="col s12 m3">
          <div class="card red lighten-1">
            <div class="card-content black-text">
              <span class="card-title">Garbage dropped (last 24h)</span>
              <p>120</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './home.scss'

export default {
  name: 'Home',
  created () {
    this.getCounts()
  },
  data () {
    return {
      counts: {
        items: 0,
        pokemons: 0,
        users: 0,
        levels: 0
      }
    }
  },
  methods: {
    getCounts () {
      fetch('https://poxey.herokuapp.com/api/v1/stats/counts')
        .then((res) => res.json())
        .then(({ counts }) => {
          this.counts.items = counts.items
          this.counts.pokemons = counts.pokemons
          this.counts.users = counts.users
          this.counts.levels = counts.levels
        })
        .catch((err) => console.log(err))
    }
  }
}
</script>
