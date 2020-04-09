<template>
  <div class="wrap">
    <div class="section-title">{{title}}</div>
    <v-row>
      <v-col>
        <v-sheet class="mx-auto">
          <v-slide-group multiple show-arrows center-active next-icon="arrow_forward_ios" prev-icon="arrow_back_ios">
            <v-slide-item v-if="writerList.length" class="ma-4 pa-3" v-for="(item,index) in writerList" :key="index">
              <v-card elevation="2" @click="goTo(item.mid)">
                <img class="user-header" :src="item.face" alt="">
                <div class="user-name font-weight-bold">{{item.author}}</div>
                <v-rating
                        v-model="item.level"
                        background-color="orange lighten-3"
                        color="orange"
                        length="6"
                        size="18px"
                        readonly
                        medium
                ></v-rating>
              </v-card>
            </v-slide-item>
            <!--<v-slide-item class="ma-4 pa-3">
              <v-card elevation="2">
                <img class="user-header" src="https://res06.bignox.com/noxinfluencer/youtube/avatar/683a6221c6f1623d324ff803fe779ed7.png" alt="">
                <div class="user-name font-weight-bold">YEricaY</div>
                <v-rating
                        v-model="rating"
                        background-color="orange lighten-3"
                        color="orange"
                        length="6"
                        size="18px"
                        readonly
                        medium
                ></v-rating>
              </v-card>
            </v-slide-item>-->
          </v-slide-group>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
  <!--<someComponent></someComponent>-->
</template>

<script>
  //import someComponent from './someComponent'
  export default {
    name: "",
    props: {
      title: {
        type: String,
        default: function() {
          return "";
        }
      },

    },
    data() {
      return {
        model: null,
        rating:4,
        writerList:[]
      }
    },
    methods: {
      goTo (mid) {
        this.$router.push(
          {
            path: '/writer',
            query : {
              mid: mid
            }
          }
        );
      },
    },
    mounted() {
      let self = this;
      self.axios.get(`/api/site/author/recommend`).then(r => {
        let data = r.data;
        console.log(data);
        if(data.success){
          self.writerList = data.data;
        }
      });
    }
  }
</script>

<style scoped>
  .user-header{
    margin: 20px auto;
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
</style>