<template>
  <div>
    <div v-if="videoData != null">
      <header>
        <div class="wrap">
          <v-row v-if="videoData">
            <v-col col="12" md="7">
              <v-card class="pa-2 clearfix">
                <!--<v-img class="fl video-img" :src="videoData.pic" aspect-ratio="1.7"></v-img>-->
                <img class="fl video-img" :src="videoData.pic" alt="视频封面">
                <div class="fr video-introduce">
                  <div class="text-truncate" v-html="videoData.title"></div>
                  <div class="fs_14 color-6 text-truncate" v-html="videoData.introduction"></div>
                  <div class="video-tag-list text-truncate" v-html="videoData.keywords"></div>
                  <div class="text-right video-play"><a class="fs_14" :href="'https://www.bilibili.com/video/av'+videoData.aid" target="view_window">前往播放页</a></div>
                </div>
              </v-card>
            </v-col>
            <v-col class="videoWriter" col="12" md="5" v-if="videoData.author" @click="goTo(videoData.author.mid)">
              <v-card class="pa-2 clearfix"  style="height: 100%">
                <div class="d-flex flex-row" style="height: 100%">
                  <v-avatar size="70" min-width="70px">
                    <img v-if="videoData.author.face" :src="videoData.author.face" alt="John">
                  </v-avatar>
                  <div class="user-right text-left ml-3">
                    <div class="font-weight-bold user-name text-truncate">
                      <span>{{videoData.author.name}}</span>
                      <span class="user-level ml-2">Lv.{{videoData.author.level}}</span>
                      <i class="icon-woman"></i>
                    </div>
                    <div class="my-1 user-official">粉丝数：{{videoData.author.fans}}</div>
                    <div class="my-1 user-official">{{videoData.author.official}}</div>
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
                            :autoresize="true"
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
                            :autoresize="true"
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
        newVideoData: {
          view: null,
          favorite: null,
          coin: null,
          like: null,
          viewRank: null,
          likeRank: null,
          coinRank: null,
          favoriteRank: null,
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
      getVideo () {
        let self = this;
        self.axios.get(`/api/video/${self.aid}`).then(r => {
          const data = r.data;
          self.loadTime = data.time;
          self.overlay = false;
          if(data.success && data.data){
            self.videoData = data.data;
            self.getVideoRank();
            self.setVideo();
          }

        });
      },
      setVideo () {
        let self = this;
        self.newVideoData.view = setNumber(self.videoData.view);
        self.newVideoData.favorite = setNumber(self.videoData.favorite);
        self.newVideoData.coin = setNumber(self.videoData.coin);
        self.newVideoData.like = setNumber(self.videoData.like);
        self.newVideoData.viewRank = setNumber(self.videoData.viewRank);
        self.newVideoData.likeRank = setNumber(self.videoData.likeRank);
        self.newVideoData.coinRank = setNumber(self.videoData.coinRank);
        self.newVideoData.favoriteRank = setNumber(self.videoData.favoriteRank);
      },
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
    font-size: 12px;
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
  @media screen and (max-width:768px) {
    .icon-noHave{
      width: 180px;
    }
    .fs_30{
      font-size: 20px;
    }
  }
</style>