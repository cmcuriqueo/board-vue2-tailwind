<template>
  <div 
    id="app" 
    class="bg-gradient-to-tl from-rose-400 via-fuchsia-500 to-indigo-500 w-full min-h-screen"
  >
    <HeaderBar />
    <SecondaryHeader />

    <router-view></router-view>
  </div>
</template>

<script>
import HeaderBar from './components/Header.vue'
import SecondaryHeader from './components/SecondaryHeaderBar.vue'
export default {
  name: 'App',
  components: {
    HeaderBar,
    SecondaryHeader
  },
  mounted() {
    /*
    this.$store.dispatch('auth/login', 'testUser').then(() => {
      console.log('logged in')
    })
    */
  }
}
</script>
