<template>
  <div class="videoRanking">
    <div class="videoRanking-header">
      <div class="wrap">
        <h1 class="text-content">视频榜单</h1>
        <v-row align="center">
          <v-col  cols="12" sm="9">
            <v-tabs hide-slider  show-arrows slider-color="#2981f4" color="#2981f4">
              <v-tab class="px-5 fs_16 font-weight-bold" @click="changeVideoList(0)">
                <v-icon>mdi-play-circle-outline</v-icon>播放排行榜
              </v-tab>
              <v-tab class="px-5 fs_16 font-weight-bold" @click="changeVideoList(1)">
                <v-icon>mdi-play-circle-outline</v-icon>三十天播放排行榜
              </v-tab>
              <v-tab class="px-5 fs_16 font-weight-bold" @click="changeVideoList(2)">
                <v-icon>mdi-play-circle-outline</v-icon>七天播放排行榜
              </v-tab>
            </v-tabs>
          </v-col>
          <v-col class="d-flex fr" cols="12" sm="3">
            <v-select
                    class="mt-3"
                    v-model="channelsText"
                    :items="channels"
                    label="全部"
                    solo
                    @input="changeSelect"
            ></v-select>
          </v-col>

        </v-row>
      </div>
    </div>
    <div class="videoRanking-content mt-2">
      <div class="wrap">
        <div class="videoRanking-recommend text-left d-none d-sm-block">
          <div class="videoRanking-recommend-title"><span>HOT</span> 每日最热门视频</div>
          <div v-if="firstVideo.aid" class="videoRanking-recommend-video" @click.stop="goTo('/video',{aid: firstVideo.aid})">
            <img class="vrv-img" :src="firstVideo.pic" alt="">
            <div class="vrv-content">
              <div class="vrv-content-title">{{firstVideo.title}}</div>
              <div class="vrv-content-introduction color-6 fs_14 mt-3">{{firstVideo.introduction}}</div>
              <div class="clearfix vrv-content-bottom">
                <div class="vrv-content-user clearfix" @click.stop="goTo('/writer',{mid: firstVideo.mid})">
                  <img class="vrv-content-user-img" v-if="firstVideo.face" :src="firstVideo.face" alt="">
                  <div class="vrv-content-user-name fl color-9">
                    <span>{{firstVideo.name}}</span>
                  </div>
                  <div class="fr">
                    <span class="mr-2 color-6" v-if="firstVideo.view"><v-icon>mdi-play-circle</v-icon>{{firstVideo.view}}</span>
                    <span class="mr-2 color-6" v-if="firstVideo.favorite"><v-icon>mdi-cards-heart</v-icon>{{firstVideo.favorite}}</span>
                    <span class="mr-2 color-6" v-if="firstVideo.like"><v-icon>mdi-thumb-up</v-icon>{{firstVideo.like}}</span>
                    <span class="mr-2 color-6" v-if="firstVideo.share"><v-icon>mdi-share-circle</v-icon>{{firstVideo.share}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="videoRanking-list">
          <v-row class="pa-5 mt-2">
            <v-col class="pa-2 mb-4 text-left d-block d-sm-none videoRanking-video-list" cols="12" sm="3"  @click.stop="goTo('/video',{aid: firstVideo.aid})">
              <div class="videoRanking-recommend-title"><span>HOT</span> 每日最热门视频</div>
              <div class="">
                <img :src="firstVideo.pic" alt="">
              </div>
              <div class="text-truncate py-2">{{firstVideo.title}}</div>
              <div class="vvl-user" :class="{'pl-0':!firstVideo.face}"  @click.stop="goTo('/writer',{mid: firstVideo.mid})">
                <img v-if="firstVideo.face" class="vvl-user-img" :src="firstVideo.face" alt="">
                <div class="vvl-user-content pl-3 text-truncate">
                  <p class="mb-0 fs_14">{{firstVideo.name}}</p>
                  <p class="mb-0 fs_12 color-9">
                    <span v-if="firstVideo.view">{{firstVideo.view}} 观看量 ·</span>
                    <span v-if="firstVideo.favorite">{{firstVideo.favorite}} 收藏</span>
                  </p>
                </div>
              </div>
            </v-col>
            <v-col class="pa-2 mb-4 text-left videoRanking-video-list" cols="12" sm="3" v-for="(item,index) in videoList" :key="index">
                <div @click.stop="goTo('/video',{aid: item.aid})">
                <div class="videoRanking-video-list-img">
                  <img v-if="item.pic" :src="item.pic" alt="">
                  <div class="no-img" v-else="">暂无视频封面</div>
                  <div class="videoRanking-video-list-play d-flex justify-end">
                    <div>
                      <v-icon small color="#fff">mdi-play-circle</v-icon><span>{{item.view}}</span>
                    </div>
                    <div class="ml-2">
                      <v-icon small color="#fff">mdi-cards-heart</v-icon><span>{{item.favorite}}</span>
                    </div>
                  </div>
                </div>
                <div class="text-truncate py-2 videoRanking-video-list-title" v-html="item.title">{{item.title}}</div>
              </div>
              <div class="vvl-user" v-if="item.face || item.name" :class="{'pl-0':!item.face}" @click="goTo('/writer',{mid: item.mid})">
                <img class="vvl-user-img" v-if="item.face" :src="item.face" alt="">
                <div class="vvl-user-content pl-3 text-truncate">
                  <p class="mb-0 fs_14">{{item.name}}</p>
                  <p class="mb-0 fs_12 color-9 text-truncate" v-if="item.official">
                    <v-icon color="#FBC02D" small>mdi-flash-circle</v-icon>{{item.official}}
                  </p>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
        <div v-if="loadingShow" class="spinner-box mx-auto">
          <div class="pulse-container">
            <div class="pulse-bubble pulse-bubble-1"></div>
            <div class="pulse-bubble pulse-bubble-2"></div>
            <div class="pulse-bubble pulse-bubble-3"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="end-mark mt-5" v-if="!isMoreLoad">
      <span class="line line-left"></span>
      <span class="end-text">已经到底啦</span>
      <span class="line line-right"></span>
    </div>
    <!--<v-overlay :value="overlay" color="#fff" opacity="0.3">
      <v-progress-circular indeterminate size="64" color="#f55345"></v-progress-circular>
    </v-overlay>-->
  </div>
</template>

<script>
  import { setNumber,Throttle} from '../../utils/chatUtils';
  export default {
    name: "",
    data() {
      return {
        loadingShow: true,
        isMoreLoad: true,
        scrollTop: 0,
        channelsText: '',
        paramsData: {
          channel: '',
          current: 1,
          keyword: '',
          size: 13,
          sort: 1,
          tag: '',
        },
        url: "/api/video",
        urlList: [
          "/api/video",
          "/api/video/rank30",
          "/api/video/rank7",
        ],
        videoListData: {},
        videoList: [],
        firstVideo:{},
        overlay: true
      }
    },
    watch:{
      paramsData: {
        handler: function(val, oldVal) {
          this.loadingShow = true;
          this.getVideo();
        },
        deep: true
      }
    },
    computed: {
      channels() {
        if (this.$store.state.channelsRanking == undefined) {
          return [];
        }
        return this.$store.state.channelsRanking;
      },
    },
    methods: {
      goTo (url,obj) {
        this.$router.push(
          {
            path: url,
            query : obj
          }
        );
      },
      backTop () {
        const self = this;
        let timer = setInterval(() => {
          let ispeed = Math.floor(-self.scrollTop / 5);
          document.documentElement.scrollTop = document.body.scrollTop = self.scrollTop + ispeed;
          if (self.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 16)
      },
      scrollBottom () {
        let self = this;
        var scr = document.documentElement.scrollTop || document.body.scrollTop; // 向上滚动的那一部分高度
        var clientHeight = document.documentElement.clientHeight; // 屏幕高度也就是当前设备静态下你所看到的视觉高度
        var scrHeight = document.documentElement.scrollHeight || document.body.scrollHeight; // 整个网页的实际高度，兼容Pc端
        var scroll = scr - self.scrollTop;
        self.scrollTop = scr;
        if(scr + clientHeight + 50 >= scrHeight && scroll > 0 && !self.loadingShow){
          if(self.isMoreLoad){
            self.paramsData.current++;
            if(self.paramsData.current > 1){
              self.paramsData.size = 12
            }
          }
        }
      },
      getVideo () {
        let self = this;
        console.log(self.paramsData);
        self.axios.get(self.url,{
          params: self.paramsData
        }).then(r => {
          let data = r.data;
          if(data.success){
            self.loadingShow = false;
            self.overlay = false;
            if(self.paramsData.current - data.data.totalpage == 0 ) self.isMoreLoad = false;
            if(data.data.recordsFiltered == 0 ) {
              self.isMoreLoad = false;
              self.videoList = [];
              return
            }
            if(self.paramsData.current == 1) {
              self.firstVideo = data.data.data[0];
              self.videoList = data.data.data.slice(1);
              self.setFirstVideo();
            }else {
              self.videoList = self.videoList.concat(data.data.data);
            }
            self.loadingShow = false;
            self.videoListData = data.data;
            self.setVideo();
          }
        });
      },
      setVideo () {
        let self = this;
        self.videoList.forEach(function (val) {
          val.view = setNumber(val.view);
          val.favorite = setNumber(val.favorite);
        });
      },
      setFirstVideo () {
        let self = this;
        for (let index  in self.firstVideo){
          if(index != 'aid') {
            self.firstVideo[index] = setNumber(self.firstVideo[index]);
          }
        }
      },
      changeSelect () {
        this.backTop();
        this.overlay = true;
        this.paramsData.current = 1;
        this.paramsData.size = 13;
        this.paramsData.channel = this.channelsText == '全部' ? '' : this.channelsText;
      },
      changeVideoList (n){
        this.url = this.urlList[n];
        this.paramsData.current = 0;
        this.paramsData.current = 1;
      }
    },
    mounted () {
      let self = this;
      if (self.$store.state.channelsRanking == undefined) {
        self.$store.dispatch("getChannels");
      }
      self.getVideo();
      window.addEventListener('scroll', self.scrollBottom);
    },
  }
</script>

<style scoped>
  .color-6{
    color: #666;
  }
  .color-9{
    color: #999;
  }
  .videoRanking{
    background-color: #f7f8fa;
  }
  .videoRanking-header{
    background-color: #fff;
  }
  .videoRanking-header h1{
    margin: 0 auto;
    line-height: 80px;
    color: #2981f4;
    text-align: center;
    font-size: 26px !important;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
  }
  .videoRanking-header .col-sm-9{
    padding-top: 0;
  }
  .videoRanking-header .col-12{
    padding: 5px 12px;
  }
  .videoRanking-recommend{
    padding: 20px;
    background-color: #fff;
  }
  .videoRanking-recommend-title{
    padding-bottom: 20px;
    color: #666;
    text-align: left;
  }
  .videoRanking-recommend-title span{
    margin-right: 8px;
    padding: 0 4px;
    display: inline;
    width: 30px;
    height: 16px;
    line-height: 16px;
    box-shadow: 0 3px 6px 0 rgba(0,0,0,.16);
    font-size: 12px;
    border-radius: 2px;
    color: #fff;
    background-color: #f55345;
  }
  .videoRanking-recommend-video{
    position: relative;
    padding-left: 280px;
    cursor: pointer;
  }
  .vrv-img{
    position: absolute;
    top: 0;
    left: 0;
    width: 280px;
    height: 174px;
    border: none;
  }
  .vrv-content{
    padding-left: 20px;
    height: 174px;
  }
  .vrv-content-title{
    height: 24px;
    line-height: 16px;
    color: #333;
  }
  .vrv-content-user{
    position: relative;
    padding-left: 32px;
  }
  .vrv-content-user-img{
    position: absolute;
    top: 0;
    left: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  .vrv-content-user-name{
    padding-left: 8px;
    height: 32px;
    line-height: 32px;
    color: #666;
  }
  .vrv-content-introduction{
    margin-bottom: 5px;
    height: 86px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
  }
  .vrv-content-bottom{
    margin-top: 15px;
    line-height: 32px;
  }
  .videoRanking-list{
    background-color: #fff;
  }
  .videoRanking-video-list{
    cursor: pointer;
  }
  .videoRanking-video-list-img{
    position: relative;
  }
  .videoRanking-video-list-img img{
    width: 100%;
    height: 175px;
  }
  .no-img{
    width: 100%;
    height: 175px;
    line-height: 175px;
    text-align: center;
    border: 1px solid #ccc;
  }
  .videoRanking-video-list-play{
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 0 5px;
    height: 24px;
    line-height: 24px;
    background-color: rgba(0,0,0,0.4);
    color: #fff;
    font-size: 14px;
  }
  .videoRanking-video-list-play span{
    margin-left: 2px;
  }
  .vvl-user{
    position: relative;
    padding-left: 40px;
  }
  .vvl-user-img{
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .vvl-user-content{
    min-height: 40px;
  }
 /* .videoRanking-video-list-title{
    height: 40px;
    line-height: 40px;
  }*/
  @media screen and (max-width:768px) {
    .videoRanking-list{
      background-color: #f7f8fa;
    }
    .videoRanking-video-list{
      background-color: #fff;
      box-shadow: 0 0.5px 1px 0 rgba(0,0,0,.16);
    }
  }
</style>