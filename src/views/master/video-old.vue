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
                        <span class="mr-2" v-if="videoData.view">播放数：{{newVideoData.view}}</span>
                        <span class="mr-2" v-if="videoData.like">点赞数：{{newVideoData.like}}</span>
                        <span class="mr-2" v-if="videoData.danmaku">弹幕数：{{newVideoData.danmaku}}</span>
                        <span class="mr-2" v-if="videoData.favorite">收藏数：{{newVideoData.favorite}}</span>
                        <span class="mr-2" v-if="videoData.share">分享数：{{newVideoData.share}}</span>
                        <span class="mr-2" v-if="videoData.coin">投币数：{{newVideoData.coin}}</span>
                      </div>
                      <div class="video-tag-list text-truncate mt-1">{{videoData.datetime}}</div>
                    </div>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-btn class="ma-2 header-btn" dark color="blue lighten-1" @click="goTo('/writerSimilarity',{tag: encodeURIComponent(writerData.tag)})">相似视频</v-btn>
                    <v-btn class="ma-2 header-btn" dark color="green lighten-1" :href="'https://www.bilibili.com/video/av'+videoData.aid" target="view_window">前往观看</v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col class="videoWriter" col="12" v-if="videoData.author" @click="goTo(videoData.author.mid)">
              <v-card class="pa-2 clearfix">
                <v-row>
                  <v-col cols="12" md="3">
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
                  <v-col cols="12" md="7">
                    <div class="d-flex align-center pa-4 writerData-">
                      <span class="mr-4" v-if="writerData.fans">粉丝数：{{writerData.newFans}}</span>
                      <span class="mr-4" v-if="writerData.archiveView">播放数：{{writerData.newArchiveView}}</span>
                      <span class="mr-4" v-if="writerData.like">获赞数：{{writerData.newLike}}</span>
                      <!--<span class="mr-2" v-if="writerData.danmaku">投稿数：{{writerData.danmaku}}</span>-->
                    </div>

                  </v-col>
                  <v-col cols="12" md="2">

                  </v-col>
                </v-row>
                <div class="d-flex flex-row">
                  <v-avatar size="70" min-width="70px">
                    <img v-if="writerData.face" :src="writerData.face" alt="作者头像">
                  </v-avatar>
                  <div class="user-right text-left ml-3">
                    <div class="font-weight-bold user-name text-truncate">
                      <span>{{writerData.name}}</span>
                      <span class="user-level ml-2">Lv.{{writerData.level}}</span>
                      <i class="icon-woman"></i>
                    </div>
                    <div class="my-1 user-official">粉丝数：{{writerData.fans}}</div>
                    <div class="my-1 user-official">{{writerData.official}}</div>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </header>
      <div class="wrap">
        <v-row>
          <v-col col="12">
            <v-card>
              <div class="text-left">
                <h3 class="px-5 py-1 video-title">视频最新数据</h3>
              </div>
              <v-card-text>
                <v-row>
                  <v-col>
                    <div class="text--darken-2">播放总数</div>
                    <div class="text--darken-3 font-weight-bold fs_18 mt-2" v-if="videoData.view">{{newVideoData.view}}</div>
                    <div class="text--darken-3 font-weight-bold fs_18 mt-2" v-else="">-</div>
                  </v-col>
                  <v-col>
                    <div class="text--darken-2">获赞总数</div>
                    <div class="text--darken-3 font-weight-bold fs_18 mt-2" v-if="videoData.like">{{newVideoData.like}}</div>
                    <div class="text--darken-3 font-weight-bold fs_18 mt-2" v-else="">-</div>
                  </v-col>
                  <v-col>
                    <div class="text--darken-2">投币总数</div>
                    <div class="text--darken-3 font-weight-bold fs_18 mt-2" v-if="videoData.coin">{{newVideoData.coin}}</div>
                    <div class="text--darken-3 font-weight-bold fs_18 mt-2" v-else="">-</div>
                  </v-col>
                  <v-col>
                    <div class="text--darken-2">收藏总数</div>
                    <div class="text--darken-3 font-weight-bold fs_18 mt-2" v-if="videoData.favorite">{{newVideoData.favorite}}</div>
                    <div class="text--darken-3 font-weight-bold fs_18 mt-2" v-else="">-</div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col col="12">
            <v-card>
              <div class="text-left">
                <h3 class="px-5 py-1 video-title">视频排行数据</h3>
              </div>
              <v-card-text>
                <v-row>
                  <v-col>
                    <div class="text--darken-2">播放排名</div>
                    <div class="text--darken-3 font-weight-bold fs_18 mt-2" v-if="videoData.viewRank"><span class="d-none d-sm-inline">Top </span>{{newVideoData.viewRank}}</div>
                    <div class="text--darken-3 font-weight-bold fs_18 mt-2" v-else="">-</div>
                  </v-col>
                  <v-col>
                    <div class="text--darken-2">获赞排名</div>
                    <div class="text--darken-3 font-weight-bold fs_18 mt-2" v-if="videoData.likeRank"><span class="d-none d-sm-inline">Top </span>{{newVideoData.likeRank}}</div>
                    <div class="text--darken-3 font-weight-bold fs_18 mt-2" v-else="">-</div>
                  </v-col>
                  <v-col>
                    <div class="text--darken-2">投币排名</div>
                    <div class="text--darken-3 font-weight-bold fs_18 mt-2" v-if="videoData.coinRank"><span class="d-none d-sm-inline">Top </span>{{newVideoData.coinRank}}</div>
                    <div class="text--darken-3 font-weight-bold fs_18 mt-2" v-else="">-</div>
                  </v-col>
                  <v-col>
                    <div class="text--darken-2">收藏排名</div>
                    <div class="text--darken-3 font-weight-bold fs_18 mt-2" v-if="videoData.favoriteRank"><span class="d-none d-sm-inline">Top </span>{{newVideoData.favoriteRank}}</div>
                    <div class="text--darken-3 font-weight-bold fs_18 mt-2" v-else="">-</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="fl pa-0 fs_12 text-left">仅包括已经观测视频</v-col>
                  <v-col class="fr pa-0 fs_12 text-right">{{loadTime}}</v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col col="12">
            <v-card>
              <div class="text-left">
                <h3 class="px-5 py-1 video-title">视频详细历史数据</h3>
              </div>
              <v-card-text>
                <v-row>
                  <v-card-text>
                    <Chart
                            class="mb-2"
                            title="视频详细历史数据"
                            :options="mainChart"
                            style="width: 100%"
                    />
                  </v-card-text>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col col="12">
            <v-card>
              <div class="text-left">
                <h3 class="px-5 py-1 video-title">各指标比率统计</h3>
              </div>
              <v-card-text>
                <v-row>
                  <v-card-text>
                    <Chart
                            class="mb-2"
                            title="各指标比率统计"
                            :options="likeRateChart"
                            style="width: 100%"
                    />
                  </v-card-text>
                </v-row>
              </v-card-text>
            </v-card>
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
    data() {
      return {
        aid: 0,
        loadTime: "",
        videoData: null,
        writerData: null,
        newVideoData: {
          view: null,
          favorite: null,
          coin: null,
          like: null,
          share: null,
          viewRank: null,
        },
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
        },
        getVideoRankList: {},
        mainChart: {},
        likeRateChart: {},
        overlay: true,
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
        self.newVideoData.view = setNumber(self.videoData.view);
        self.newVideoData.favorite = setNumber(self.videoData.favorite);
        self.newVideoData.coin = setNumber(self.videoData.coin);
        self.newVideoData.like = setNumber(self.videoData.like);
        self.newVideoData.danmaku = setNumber(self.videoData.danmaku);
        self.newVideoData.share = setNumber(self.videoData.share);
        self.newVideoData.viewRank = setNumber(self.videoData.viewRank);
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
      }
    },
    mounted() {
      let self = this;
      self.aid = self.$route.query.aid * 1;
      self.getVideo();
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
  @media screen and (max-width:768px) {
    .icon-noHave{
      width: 180px;
    }
    .fs_30{
      font-size: 20px;
    }
  }
</style>