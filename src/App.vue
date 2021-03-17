<template>
  <v-app class="v-app">

    <core-toolbar />

    <core-drawer />

    <core-view />

    <core-footer />

  </v-app>
  <!--<div id="app" data-app="true">-->
    <!--<core-toolbar />-->
  <!--</div>-->
</template>

<script>
export default {
  name: 'App',
  components: {
    CoreDrawer: () => import('@/components/core/Drawer'),
    CoreFooter: () => import('@/components/core/Footer'),
    CoreToolbar: () => import('@/components/core/Toolbar'),
    CoreView: () => import('@/components/core/View')
  },
  watch:{
    '$route':function(to,from){
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .v-app{
    padding-top: 64px;
  }
  @media screen and (max-width:768px) {
    .v-app{
      padding-top: 56px;
    }
  }
</style>
