<template>
  <v-app-bar
          app
          color="#1867c0"
          elevate-on-scroll
          scroll-target="#scrolling-techniques-7"
  >
    <v-container mx-auto py-0 class="wrap d-flex align-center justify-space-between">
      <router-link to='/' class="fl logo">
        <img src="@/assets/xb-logo.png" style="width: 38px;height: 38px" alt="">
        <!--<v-img :src="require('@/assets/xb-logo.png')" contain width="38" max-width="38"/>-->
      </router-link>
      <div class="fr d-none d-md-block">
        <v-row>
          <v-col>
            <v-btn class="tml-0 hidden-sm-and-down" dark text color="#fff" to="/">首页</v-btn>
          </v-col>
          <v-col>
            <v-menu offset-y open-on-hover>
              <template v-slot:activator="{ on }">
                <v-btn class="ml-0 hidden-sm-and-down" dark color="#fff" text v-on="on">
                  排行榜
                  <v-icon dark right>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(item, index) in items" :key="index" @click="">
                  <v-list-item-title>
                    <router-link :to="{ path:item.url }">{{ item.title }}</router-link>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <v-col>
            <v-btn class="ml-0 hidden-sm-and-down" text color="#fff" to="/writerSearch">up主查询</v-btn>
          </v-col>
          <v-col>
            <v-btn class="ml-0 hidden-sm-and-down" text color="#fff" to="/videoSearch">视频查询</v-btn>
          </v-col>
        </v-row>
        <!--<v-btn class="tml-0 hidden-sm-and-down" dark text color="#fff" to="/">首页</v-btn>
        <v-menu offset-y open-on-hover>
          <template v-slot:activator="{ on }">
            <v-btn class="ml-0 hidden-sm-and-down" dark color="#fff" text v-on="on">
              排行榜
              <v-icon dark right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index" @click="">
              <v-list-item-title>
                <router-link :to="{ path:item.url }">{{ item.title }}</router-link>
                &lt;!&ndash;<div @click="goTo(item.url)">{{ item.title }}</div>&ndash;&gt;
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn class="ml-0 hidden-sm-and-down" text color="#fff" to="/writerSearch">up主查询</v-btn>
        <v-btn class="ml-0 hidden-sm-and-down" text color="#fff" to="/videoSearch">视频查询</v-btn>-->
      </div>
      <v-app-bar-nav-icon class="fr d-md-none" color="#fff" @click="toggleDrawer "></v-app-bar-nav-icon>
    </v-container>


  </v-app-bar>

</template>
<script>
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
    name: "",
    data() {
      return {
        msg: "Hello Vue.js",
        items: [
          { title: '视频排行榜',url: '/videoRanking'},
          { title: '作者排行榜',url: '/writerRanking'},
        ],
        dropdown_font: ['Arial', 'Calibri', 'Courier', 'Verdana'],
      }
    },
    methods: {
      ...mapMutations(['toggleDrawer']),
      goTo (url) {
        this.$router.push(
          {
            path: url
          }
        );
      }
    },
  }
</script>

<style scoped>
  header.v-app-bar.v-app-bar--fixed{
    border-radius: 0;
    z-index: 100000;
  }
  #scrolling-techniques-7{
    border-radius: 0;
  }
  .v-btn:not(.v-btn--round).v-size--default{
    margin-left: 20px;
    font-size: 16px;
  }
  .hidden-md-and-up{
    display: none;
  }
  .v-btn--icon.v-size--default .v-icon{
    font-size: 32px;
  }
  @media screen and (max-width:959px) {
    .hidden-sm-and-down {
      display: none!important;
    }
    .hidden-md-and-up{
      display: block;
    }
  }

  @media screen and (max-width:768px) {
    .logo{
      height: auto;
    }
    .overflow-y-auto{
      height: 100vh;
    }
    .v-image{
      margin-top: 6px;
    }
    .v-icon{
      font-size: 38px !important;
    }
  }
</style>
