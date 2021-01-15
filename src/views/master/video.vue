<template>
  <div>
    <div v-if="videoData != null">
      <header>
        <div class="wrap">
          <v-row v-if="videoData">
            <v-col cols="12">
              <v-card class="pa-2 clearfix">
                <v-row>
                  <v-col cols="12" md="10">
                    <img class="fl video-img" :src="videoData.pic" alt="视频封面">
                    <div class="fr video-introduce">
                      <div class="fs_18 text-truncate" v-html="videoData.title"></div>
                      <div class="fs_16 color-6 mt-1">
                        <span class="mr-2" v-if="videoData.view">播放数：{{videoData.newView}}</span>
                        <span class="mr-2" v-if="videoData.like">点赞数：{{videoData.newLike}}</span>
                        <span class="mr-2" v-if="videoData.danmaku">弹幕数：{{videoData.newDanmaku}}</span>
                        <span class="mr-2" v-if="videoData.favorite">收藏数：{{videoData.newFavorite}}</span>
                        <span class="mr-2" v-if="videoData.share">分享数：{{videoData.newShare}}</span>
                        <span class="mr-2" v-if="videoData.coin">投币数：{{videoData.newCoin}}</span>
                      </div>
                      <div class="video-grade mt-1">
                        <span class="mr-2" v-if="videoData.score">综合评分：{{videoData.newScore}}</span>
                      </div>
                      <div class="video-tag-list text-truncate mt-1">{{videoData.datetime}}</div>
                    </div>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-btn class="ma-2 header-btn" dark color="blue lighten-1" @click="goTo('/videoSimilarity',{channel: encodeURIComponent(videoData.channel)})">相似视频</v-btn>
                    <v-btn class="ma-2 header-btn" dark color="green lighten-1" :href="'https://www.bilibili.com/video/av'+videoData.aid" target="view_window">前往观看</v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col class="videoWriter" col="12" v-if="videoData.author">
              <v-card class="pa-2 clearfix">
                <v-row>
                  <v-col cols="12" md="4">
                    <div class="d-flex flex-row">
                      <v-avatar size="70" min-width="70px">
                        <img v-if="writerData.face" :src="writerData.face" alt="作者头像">
                      </v-avatar>
                      <div class="user-right text-left ml-3">
                        <p class="font-weight-bold user-name text-truncate m1-0">{{writerData.name}}</p>
                        <p class="fs_14">
                          蘑菇指数：{{writerData.moguScore}}
                          <span v-if="writerData.moguLevel" class="mg-exponent" :class="mgExponent[writerData.moguLevel].className">
                            <i></i>{{mgExponent[writerData.moguLevel].title}}
                          </span>
                        </p>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="d-flex align-center pa-4 writer-number">
                      <span class="mr-4" v-if="writerData.fans">粉丝数：{{writerData.newFans}}</span>
                      <span class="mr-4" v-if="writerData.archiveView">播放数：{{writerData.newArchiveView}}</span>
                      <span class="mr-4" v-if="writerData.like">获赞数：{{writerData.newLike}}</span>
                      <!--<span class="mr-2" v-if="writerData.danmaku">投稿数：{{writerData.danmaku}}</span>-->
                    </div>
                  </v-col>
                  <v-col cols="12" md="2" class="d-flex align-center justify-center">
                    <v-btn class="header-btn " dark color="deep-purple lighten-1" @click="goTo('/writer',{mid: videoData.author.mid})">达人分析</v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </header>
      <div class="wrap">
        <v-row>
          <v-col>
            <v-row>
              <v-col cols="12" md="9">
                <v-tabs class="elevation-3 py-0 my-2" v-model="tab" show-arrows color="#f55345">
                  <v-tab>视频详情</v-tab>
                  <v-tab>热度分析</v-tab>
                  <v-tab>商品分析</v-tab>
                  <v-tab>观众分析</v-tab>
                </v-tabs>
              </v-col>
              <v-col cols="12" md="3" class="d-flex align-center">
                <v-card class="fs_14" style="width: 100%;height: 48px;line-height: 48px;color: #666">
                  <!--数据更新于{{writerData.datetime}}-->
                  数据更新于<span class="font-weight-black ml-2 fs_16">{{datetime}}</span>
                </v-card>
              </v-col>
            </v-row>

            <v-tabs-items v-model="tab">
              <!-- 视频详情 -->
              <v-tab-item>
                <v-particular :aid="aid" :videoData="videoData"></v-particular>
              </v-tab-item>
              <!-- 热度分析 -->
              <v-tab-item>
                <v-heat :aid="aid"></v-heat>
              </v-tab-item>
              <!-- 商品分析 -->
              <v-tab-item>
                <v-commodity :aid="aid"></v-commodity>
              </v-tab-item>
              <!-- 观众分析 -->
              <v-tab-item>
                <v-audience :aid="aid"></v-audience>
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
      </div>
    </div>
    <v-overlay v-else-if="overlay" :value="overlay" color="#fff" opacity="0.3">
      <v-progress-circular indeterminate size="64" color="#f55345"></v-progress-circular>
    </v-overlay>
    <div v-else="">
      <img class="icon-noHave" src="@/assets/icon/no.png" alt="">
      <p class="fs_30 mt-4 color-6">暂无视频信息</p>
    </div>
  </div>
</template>

<script>
  import { setNumber} from '../../utils/chatUtils';
  import drawMainChart from "@/charts/video-main.js";
  import drawVideoPieChart from "@/charts/video-pie.js";

  export default {
    name: "",
    components: {
      VParticular: () => import('@/components/video/particular'),
      VHeat: () => import('@/components/video/heat'),
      VCommodity: () => import('@/components/video/commodity'),
      VAudience: () => import('@/components/video/audience'),
    },
    data() {
      return {
        aid: 0,
        loadTime: "",
        videoData: null,// 视频信息
        writerData: null,// 作者信息
        mgExponent: {
          1:{
            className: 'worse',
            title: '较差',
          },
          2:{
            className: 'ordinary',
            title: '一般',
          },
          3:{
            className: 'good',
            title: '较好',
          },
          4:{
            className: 'excellence',
            title: '优秀',
          },
          5:{
            className: 'wonderfulness',
            title: '极好',
          },
        }, // 蘑菇等级
        tab: null, // 导航
        getVideoRankList: {},
        mainChart: {},
        likeRateChart: {},
        overlay: true,
        datetime: '',// 数据更新日期
      }
    },
    methods: {
      // 跳转页面
      goTo (url,obj) {
        this.$router.push(
          {
            path: url,
            query : obj
          }
        );
      },
      // 获取视频详情
      getVideo () {
        let self = this;
        self.axios.get(`/api/video/${self.aid}`).then(r => {
          const data = r.data;
          self.loadTime = data.time;
          self.overlay = false;
          if(data.success && data.data){
            self.videoData = data.data;
            self.writerData = data.data.author;
            self.setVideo();
            self.getVideoRank();
          }

        });
      },
      setVideo () {
        let self = this;
        self.videoData["newView"] = setNumber(self.videoData.view);
        self.videoData["newFavorite"] = setNumber(self.videoData.favorite);
        self.videoData["newCoin"] = setNumber(self.videoData.coin);
        self.videoData["newLike"] = setNumber(self.videoData.like);
        self.videoData["newDanmaku"] = setNumber(self.videoData.danmaku);
        self.videoData["newShare"] = setNumber(self.videoData.share);
        self.videoData["newViewRankw"] = setNumber(self.videoData.viewRank);
        self.videoData["newScore"] = setNumber(self.videoData.score);
        self.writerData["newArchiveView"] = setNumber(self.writerData.archiveView);
        self.writerData["newFans"] = setNumber(self.writerData.fans);
        self.writerData["newLike"] = setNumber(self.writerData.like);
      },
      // 获取视频每日数据
      getVideoRank() {
        let self = this;
        self.axios.get(`/api/video/${self.aid}/data`).then(r => {
          let data = r.data;
          if(data.success){
            self.getVideoRankList = data;
            self.mainChart = drawMainChart(self.getVideoRankList);
            self.likeRateChart = drawVideoPieChart(self.videoData);
          }
        });
      },
      // 获取昨天日期
      getDatetime () {
        let day1 = new Date();
        day1.setTime(day1.getTime()-24*60*60*1000);
        return day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();
      },
      // 返回上一页
      goBack() {
        this.$router.go(-1);
        this.$cookies.set("videoMId",this.aid);
      },
    },
    mounted() {
      let self = this;
      self.aid = self.$route.query.aid * 1;
      self.getVideo();
      self.datetime = self.getDatetime();
      // 监听返回按钮
      if (window.history && window.history.pushState) {
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', this.goBack, false);
      }
    },
    destroyed(){
      // 取消监听返回按钮
      window.removeEventListener('popstate', this.goBack, false);
    },
    beforeRouteUpdate(to,from,next){
      let self = this;
      if(to.path.indexOf("video") != -1){
        next();
        self.aid = to.query.aid * 1;
        self.getVideo();
        self.tab = 0;
      }
    }
  }
</script>

<style scoped>
  .color-6{
    color: #666;
  }
  .videoWriter{
    cursor: pointer;
  }
  .video-title{
    font-size: 20px;
    font-weight: bold;
    color: #1e88e5;
    border-bottom: 2px solid #1e88e5;
  }
  .video-img{
    width:140px;
    height: 80px;
    border-radius: 5px !important;
  }
  .video-grade{
    color: #f55345;
  }
  .video-introduce{
    width: calc(100% - 160px);
    text-align: left;
  }
  .video-tag-list{
    font-size: 16px;
    color: #1867c0;
  }
  .video-play{
    cursor: pointer;
  }
  .user-right{
    width: 100%;
  }
  .user-name{
    color: #424242;
  }
  .user-level{
    padding: 0 10px;
    display: inline-block;
    height: 22px;
    line-height: 22px;
    background-color: #f55345;
    font-size: 12px;
    color: #fff;
    border-radius: 12px;
  }
  .user-official{
    font-size: 14px;
    color: #666;
  }
  .text--darken-2{
    color: #616161;
  }
  .text--darken-3{
    color: #1565c0;
  }
  .border-bottom{
    border-bottom: 2px solid #1e88e5;
  }
  .icon-noHave{
    margin: 10% auto 0 auto;
    width: 280px;
  }
  /* 蘑菇指数 */
  .mg-exponent{
    position: relative;
    padding-left: 30px;
    display: inline-block;
    width: 70px;
    height: 24px;
    line-height: 24px;
    border-radius: 12px;
    font-size: 14px;
  }
  .mg-exponent i{
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  .wonderfulness{
    color: #43a047 !important;
    background-color: #e8f5e9;
  }
  .wonderfulness i{
    background: url("../../assets/icon/wonderfulness.png") no-repeat;;
    background-size: 100% 100%;
  }
  .excellence{
    color: #43a047 !important;
    background-color: #e8f5e9;
  }
  .excellence i{
    background: url("../../assets/icon/excellence.png") no-repeat;;
    background-size: 100% 100%;
  }
  .good{
    color: #ffab40 !important;
    background-color: #fff3e0;
  }
  .good i{
    background: url("../../assets/icon/good.png") no-repeat;;
    background-size: 100% 100%;
  }
  .ordinary{
    color: #f4511e !important;
    background-color: #fbe9e7;
  }
  .ordinary i{
    background: url("../../assets/icon/ordinary.png") no-repeat;;
    background-size: 100% 100%;
  }
  .worse{
    color: #f4511e !important;
    background-color: #fbe9e7;
  }
  /* 作者 */
  .writer-number{
    height: 100%;
    border-left: 2px solid #ccc;
  }
  @media screen and (max-width:768px) {
    .icon-noHave{
      width: 180px;
    }
    .fs_30{
      font-size: 20px;
    }
  }
</style>