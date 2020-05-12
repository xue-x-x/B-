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
                <v-slide-item class="pa-2 ma-2 text-left pointer" v-for="(item,index) in newVideoList" :key="index">
                  <v-card max-width="160" width="160px" @click="goTo(item.aid)">
                    <v-img :src="item.pic" height="100px"></v-img>
                    <div class="cards-title" v-html="item.title"></div>
                    <div class="text-right"><v-icon small>mdi-play-circle-outline</v-icon> {{item.view}}</div>
                  </v-card>
                </v-slide-item>
              </v-slide-group>
              <v-overlay class="loader-box" :value="newOverlay" absolute color="#fff" opacity="0.3">
                <div class="loader"></div>
              </v-overlay>
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
                <v-slide-item class="pa-2 ma-2 text-left pointer" v-for="(item,index) in hotVideoList" :key="index">
                  <v-card max-width="160" width="160px" @click="goTo(item.aid)">
                    <v-img :src="item.pic" height="100px"></v-img>
                    <div class="cards-title" v-html="item.title"></div>
                    <div class="text-right"><v-icon small>mdi-play-circle-outline</v-icon> {{item.view}}</div>
                  </v-card>
                </v-slide-item>
              </v-slide-group>
              <v-overlay class="loader-box" :value="hotOverlay" absolute color="#fff" opacity="0.3">
                <div class="loader"></div>
              </v-overlay>
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
        newOverlay: true,
        hotOverlay: true,
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
              self.hotOverlay = false;
              self.hotVideoList = data.data.data;
            }else {
              self.newOverlay = false;
              self.newVideoList = data.data.data;
            }
          }
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
  .pa-0{
    position: relative;
    min-height: 195px;
  }
  .loader:before{
    content: "";
    position: absolute;
    top: 0px;
    left: -25px;
    height: 12px;
    width: 12px;
    border-radius: 12px;
    -webkit-animation: loaderg 3s ease-in-out infinite;
    animation: loaderg 3s ease-in-out infinite;
  }

  .loader{
    position: relative;
    width: 12px;
    height: 12px;
    top: 46%;
    left: 46%;
    border-radius: 12px;
    -webkit-animation: loaderm 3s ease-in-out infinite;
    animation: loaderm 3s ease-in-out infinite;
  }


  .loader:after{
    content: "";
    position: absolute;
    top: 0px;
    left: 25px;
    height: 10px;
    width: 10px;
    border-radius: 10px;
    -webkit-animation: loaderd 3s ease-in-out infinite;
    animation: loaderd 3s ease-in-out infinite;
  }

  @-webkit-keyframes loaderg{
    0%{background-color: rgba(30, 136, 229, .2);}
    25%{background-color: rgba(30, 136, 229, 1);}
    50%{background-color: rgba(30, 136, 229, .2);}
    75%{background-color: rgba(30, 136, 229, .2);}
    100%{background-color: rgba(30, 136, 229, .2);}
  }
  @keyframes loaderg{
    0%{background-color: rgba(30, 136, 229, .2);}
    25%{background-color: rgba(30, 136, 229, 1);}
    50%{background-color: rgba(30, 136, 229, .2);}
    75%{background-color: rgba(30, 136, 229, .2);}
    100%{background-color: rgba(30, 136, 229, .2);}
  }

  @-webkit-keyframes loaderm{
    0%{background-color: rgba(30, 136, 229, .2);}
    25%{background-color: rgba(30, 136, 229, .2);}
    50%{background-color: rgba(30, 136, 229, 1);}
    75%{background-color: rgba(30, 136, 229, .2);}
    100%{background-color: rgba(30, 136, 229, .2);}
  }
  @keyframes loaderm{
    0%{background-color: rgba(30, 136, 229, .2);}
    25%{background-color: rgba(30, 136, 229, .2);}
    50%{background-color: rgba(30, 136, 229, 1);}
    75%{background-color: rgba(30, 136, 229, .2);}
    100%{background-color: rgba(30, 136, 229, .2);}
  }

  @-webkit-keyframes loaderd{
    0%{background-color: rgba(30, 136, 229, .2);}
    25%{background-color: rgba(30, 136, 229, .2);}
    50%{background-color: rgba(30, 136, 229, .2);}
    75%{background-color: rgba(30, 136, 229, 1);}
    100%{background-color: rgba(30, 136, 229, .2);}
  }
  @keyframes loaderd{
    0%{background-color: rgba(30, 136, 229, .2);}
    25%{background-color: rgba(30, 136, 229, .2);}
    50%{background-color: rgba(30, 136, 229, .2);}
    75%{background-color: rgba(30, 136, 229, 1);}
    100%{background-color: rgba(30, 136, 229, .2);}
  }
</style>