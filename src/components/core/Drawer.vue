<template>
  <v-navigation-drawer v-model="drawer" temporary app>
    <v-list>
      <v-list-item class="text-left" @click="onClick($event)" to="/">
        <v-list-item-icon>
          <v-icon>home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>首页</v-list-item-title>
      </v-list-item>
      <v-list-item class="text-left" @click="onClick($event)" to="/writerRanking">
        <v-list-item-icon>
          <v-icon>equalizer</v-icon>
        </v-list-item-icon>
        <v-list-item-title>up主排行榜</v-list-item-title>
      </v-list-item>
      <v-list-item class="text-left" @click="onClick($event)" to="/videoRanking">
        <v-list-item-icon>
          <v-icon>video_call</v-icon>
        </v-list-item-icon>
        <v-list-item-title>视频排行榜</v-list-item-title>
      </v-list-item>
      <v-list-item class="text-left" @click="onClick($event)" to="/writerSearch">
        <v-list-item-icon>
          <v-icon>search</v-icon>
        </v-list-item-icon>
        <v-list-item-title>up主查询</v-list-item-title>
      </v-list-item>
      <v-list-item class="text-left" @click="onClick($event)" to="/videoSearch">
        <v-list-item-icon>
          <v-icon>youtube_searched_for</v-icon>
        </v-list-item-icon>
        <v-list-item-title>视频查询</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    name: 'CoreDrawer',
    data() {
      return {
//        drawer: true
      }
    },
    computed: {
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.setDrawer(val)
        }
      }
    },
    methods: {
      ...mapMutations(['setDrawer']),
      onClick (e) {
        let self = this;
        e.stopPropagation();
        self.setDrawer(false)
      }
    }
  }
</script>
