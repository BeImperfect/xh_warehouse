<template>
  <div id="app">
    <loading v-show="loading"></loading>
    <router-view></router-view>
    <nav-bottom v-show="showNav"></nav-bottom>
  </div>
</template>

<script>
import navBottom from './components/NavBottom.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'App',
  computed: mapGetters(['loading', 'showNav']),
  watch: {
    $route(to, from) {
      if (to.path.indexOf('detail') !=-1) {
        this.$store.dispatch('hideNav');
      } else {
        this.$store.dispatch('showNav');
      }
      if (to.path == '/cart' || to.path == '/search' || to.path == '/login' || to.path == '/register') {
        this.$store.dispatch('hideNav');
      }
    }
  },
  components: {
    navBottom: NavBottom
  }
}
</script>

<style>
@import './assets/css/index.css'
</style>
