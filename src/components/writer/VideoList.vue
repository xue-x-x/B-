<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <div class="text-left">
            <h3 class="px-5 py-1 writer-title">最新投稿视频</h3>
          </div>
          <v-card-text class="pa-0">
            <v-sheet>
              <v-slide-group multiple show-arrows>
                <!--<v-slide-item class="pa-2 ma-2 text-left pointer">
                    <v-card max-width="160" width="160px">
                      <v-img src="http://i0.hdslb.com/bfs/archive/2c2a95104bee9afa6ac278d476c2640af9763247.jpg" height="100px"></v-img>
                      <div class="cards-title mt-1 fs_14">纽约市长三连怼：特朗普，防控疫情你都干了些啥？</div>
                      <div class="text-right mt-2"><v-icon small>mdi-play-circle-outline</v-icon> 17689</div>
                    </v-card>
                </v-slide-item>-->
                <v-slide-item class="pa-2 ma-2 text-left pointer" v-for="(item,index) in newVideoList" :key="index">
                  <v-card max-width="160" width="160px" @click="goTo(item.aid)">
                    <v-img :src="item.pic" height="100px"></v-img>
                    <div class="cards-title">{{item.title}}</div>
                    <div class="text-right"><v-icon small>mdi-play-circle-outline</v-icon> {{item.view}}</div>
                  </v-card>
                </v-slide-item>

              </v-slide-group>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <div class="text-left">
            <h3 class="px-5 py-1 writer-title">热门视频</h3>
          </div>
          <v-card-text class="pa-0">
            <v-sheet>
              <v-slide-group multiple show-arrows>
                <!--<v-slide-item class="pa-2 ma-2 text-left">
                  <v-card max-width="160" width="160px">
                    <v-img src="http://i0.hdslb.com/bfs/archive/2c2a95104bee9afa6ac278d476c2640af9763247.jpg" height="100px"></v-img>
                    <div class="cards-title mt-1 fs_14">纽约市长三连怼：特朗普，防控疫情你都干了些啥？</div>
                    <div class="text-right mt-2"><v-icon small>mdi-play-circle-outline</v-icon> 17689</div>
                  </v-card>
                </v-slide-item>-->
                <v-slide-item class="pa-2 ma-2 text-left pointer" v-for="(item,index) in hotVideoList" :key="index">
                  <v-card max-width="160" width="160px" @click="goTo(item.aid)">
                    <v-img :src="item.pic" height="100px"></v-img>
                    <div class="cards-title">{{item.title}}</div>
                    <div class="text-right"><v-icon small>mdi-play-circle-outline</v-icon> {{item.view}}</div>
                  </v-card>
                </v-slide-item>

              </v-slide-group>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import { setNumber} from '../../utils/chatUtils';
  export default {
    name: "",
    props: {
      mid: {
        default: false,
        type: Number
      }
    },
    data() {
      return {
        newVideoList: undefined,
        hotVideoList: undefined,
      }
    },
    methods: {
      goTo (aid) {
        this.$router.push(
          {
            path: '/video',
            query : {
              aid: aid
            }
          }
        );
      },
      getVideoList (sort) {
        let self = this;
        self.axios.get(`/api/author/${self.mid}/video`,{
          params: {
            sort: sort
          }
        }).then(r => {
          let data = r.data;
          if(data.success){
            if(sort){
              self.hotVideoList = data.data.data;
            }else {
              self.newVideoList = data.data.data;
            }
          }
          console.log(self.newVideoList);
          self.setVideoList(sort);
        });
      },
      setVideoList (sort) {
        let self = this;
        if(sort){
          self.hotVideoList.forEach(function (val) {
            val.view = setNumber(val.view);
          })
        }else {
          self.newVideoList.forEach(function (val) {
            val.view = setNumber(val.view);
          })
        }

      }
    },
    mounted() {
      let self = this;
      self.getVideoList(0);
      self.getVideoList(1);
      console.log(self.mid);
    }
  }
</script>

<style scoped>
  .pointer{
    cursor: pointer;
  }
  .writer-title{
    font-size: 20px;
    font-weight: bold;
    color: #1e88e5;
    border-bottom: 2px solid #1e88e5;
  }
  .text--darken-2{
    color: #616161;
  }
  .text--darken-3{
    color: #1565c0;
  }
  .cards-title{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    height: 41px;
  }
</style>