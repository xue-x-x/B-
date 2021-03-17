<template>
  <div>
      <v-row>
        <!-- 播放量 折线图 -->
        <v-col cols="12" md="6">
          <v-card class="pa-1 pa-md-4">
            <v-row class="text-left">
              <v-col cols="6" md="6" class="pt-2 text-left">
                <span>播放量：{{videoData.view ? videoData.newView : '-'}}</span>
                <span v-if="videoData.viewChange > 0" class="decline"> ↑ </span>
                <span v-if="videoData.viewChange < 0" class="goUp"> ↓ </span>
                <span v-if="Number(videoData.viewChange)" :class="videoData.viewChange < 0 ? 'goUp' : 'decline'">{{setNumber(videoData.viewChange)}}</span>
                <span v-if="Number(videoData.viewChange)" class="icon-fans"><img src="@/assets/icon/a528e954.svg" alt=""></span>
              </v-col>
              <v-col v-if="videoData.over_ratio" cols="6" md="3" class="pt-2 pb-0" >
                <span>完播率：{{(videoData.over_ratio * 100).toFixed(2)}}%</span>
              </v-col>
              <v-col v-if="videoData.fans_ratio" cols="6" md="3" class="pt-2 pb-0" >
                <span>粉丝渗透率：{{(videoData.fans_ratio * 100).toFixed(2)}}%</span>
              </v-col>
            </v-row>
            <div>
              <v-card-text>
                <Chart
                        v-if="viewOptions"
                        class="mb-2"
                        title="播放量"
                        :autoresize="true"
                        :options="viewOptions"
                        style="width: 100%"
                />
              </v-card-text>
            </div>
          </v-card>
        </v-col>
        <!-- 点赞数 折线图 -->
        <v-col cols="12" md="6">
          <v-card class="pa-1 pa-md-4">
            <v-row class="text-left">
              <v-col cols="6" md="6" class="pt-2 pb-0">
                <span>点赞数：{{videoData.like ? videoData.newLike : '-'}}</span>
                <span v-if="videoData.likeChange > 0" class="decline"> ↑ </span>
                <span v-if="videoData.likeChange < 0" class="goUp"> ↓ </span>
                <span v-if="Number(videoData.likeChange)" :class="videoData.likeChange < 0 ? 'goUp' : 'decline'">{{setNumber(videoData.likeChange)}}</span>
                <span v-if="Number(videoData.likeChange)"  class="icon-fans"><img src="@/assets/icon/a528e954.svg" alt=""></span>
              </v-col>
              <v-col v-if="videoData.like" cols="6" md="4" class="pt-2 pb-0" >
                <span>点赞率：{{`${((videoData.like / videoData.view) * 100).toFixed(2)}%`}}</span>
              </v-col>
            </v-row>
            <div>
              <v-card-text>
                <Chart
                        v-if="likeOptions"
                        class="mb-2"
                        title="点赞数"
                        :autoresize="true"
                        :options="likeOptions"
                        style="width: 100%"
                />
              </v-card-text>
            </div>
          </v-card>
        </v-col>
        <!-- 弹幕数 折线图 -->
        <v-col cols="12" md="6">
          <v-card class="pa-1 pa-md-4">
            <v-row class="text-left">
              <v-col cols="6" md="6">
                <span>弹幕数：{{videoData.danmaku ? videoData.newDanmaku : '-'}}</span>
                <span v-if="videoData.danmakuChange > 0" class="decline"> ↑ </span>
                <span v-if="videoData.danmakuChange < 0" class="goUp"> ↓ </span>
                <span v-if="Number(videoData.danmakuChange)" :class="videoData.danmakuChange < 0 ? 'goUp' : 'decline'">{{setNumber(videoData.danmakuChange)}}</span>
                <span v-if="Number(videoData.danmakuChange)" class="icon-fans"><img src="@/assets/icon/a528e954.svg" alt=""></span>
              </v-col>
              <v-col v-if="videoData.danmaku" cols="6" md="4">
                <span>弹幕率：{{`${((videoData.danmaku / videoData.view) * 100).toFixed(2)}%`}}</span>
              </v-col>
            </v-row>
            <div>
              <v-card-text>
                <Chart
                        v-if="danmakuOptions"
                        class="mb-2"
                        title="弹幕数"
                        :autoresize="true"
                        :options="danmakuOptions"
                        style="width: 100%"
                />
              </v-card-text>
            </div>
          </v-card>
        </v-col>
        <!-- 分享数 折线图 -->
        <v-col cols="12" md="6">
          <v-card class="pa-1 pa-md-4">
            <v-row class="text-left">
              <v-col cols="6" md="6">
                <span>分享数：{{videoData.share ? videoData.newShare : '-'}}</span>
                <span v-if="videoData.shareChange > 0" class="decline"> ↑ </span>
                <span v-if="videoData.shareChange < 0" class="goUp"> ↓ </span>
                <span v-if="Number(videoData.shareChange)" :class="videoData.shareChange < 0 ? 'goUp' : 'decline'">{{setNumber(videoData.shareChange)}}</span>
                <span v-if="Number(videoData.shareChange)" class="icon-fans"><img src="@/assets/icon/a528e954.svg" alt=""></span>
              </v-col>
              <v-col v-if="videoData.share" cols="6" md="4">
                <span>分享率：{{`${((videoData.share / videoData.view) * 100).toFixed(2)}%`}}</span>
              </v-col>
            </v-row>
            <div>
              <v-card-text>
                <Chart
                        v-if="shareOptions"
                        class="mb-2"
                        title="分享数"
                        :autoresize="true"
                        :options="shareOptions"
                        style="width: 100%"
                />
              </v-card-text>
            </div>
          </v-card>
        </v-col>
        <!-- 收藏数 折线图 -->
        <v-col cols="12" md="6">
          <v-card class="pa-1 pa-md-4">
            <v-row class="text-left">
              <v-col cols="6" md="6">
                <span>收藏数：{{videoData.favorite ? videoData.newFavorite : '-'}}</span>
                <span v-if="videoData.favoriteChange > 0" class="decline"> ↑ </span>
                <span v-if="videoData.favoriteChange < 0" class="goUp"> ↓ </span>
                <span v-if="Number(videoData.favoriteChange)" :class="videoData.favoriteChange < 0 ? 'goUp' : 'decline'">{{setNumber(videoData.favoriteChange)}}</span>
                <span v-if="Number(videoData.favoriteChange)" class="icon-fans"><img src="@/assets/icon/a528e954.svg" alt=""></span>
              </v-col>
              <v-col v-if="videoData.favorite" cols="6" md="4">
                <span>收藏率：{{`${((videoData.favorite / videoData.view) * 100).toFixed(5)}%`}}</span>
              </v-col>
            </v-row>
            <div>
              <v-card-text>
                <Chart
                        v-if="favoriteOptions"
                        class="mb-2"
                        title="收藏数"
                        :autoresize="true"
                        :options="favoriteOptions"
                        style="width: 100%"
                />
              </v-card-text>
            </div>
          </v-card>
        </v-col>
        <!-- 投币数 折线图 -->
        <v-col cols="12" md="6">
          <v-card class="pa-1 pa-md-4">
            <v-row class="text-left">
              <v-col cols="6" md="6">
                <span>投币数：{{videoData.coin ? videoData.newCoin : '-'}}</span>
                <span v-if="videoData.coinChange > 0" class="decline"> ↑ </span>
                <span v-if="videoData.coinChange < 0" class="goUp"> ↓ </span>
                <span v-if="Number(videoData.coinChange)" :class="videoData.coinChange < 0 ? 'goUp' : 'decline'">{{setNumber(videoData.coinChange)}}</span>
                <span v-if="Number(videoData.coinChange)" class="icon-fans"><img src="@/assets/icon/a528e954.svg" alt=""></span>
              </v-col>
              <v-col v-if="videoData.coin" cols="6" md="4">
                <span>投币率：{{`${((videoData.coin / videoData.view) * 100).toFixed(2)}%`}}</span>
              </v-col>
            </v-row>
            <div>
              <v-card-text>
                <Chart
                        class="mb-2"
                        title="投币数"
                        v-if="coinOptions"
                        :autoresize="true"
                        :options="coinOptions"
                        style="width: 100%"
                />
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>
  </div>
</template>

<script>
  import getMultiChartOptions from "@/charts/biliob-multi-line-chart.js";
  import { setNumber} from '../../utils/chatUtils';
  import getOptions from "../../charts/cloud-charts.js";
  export default {
    name: "",
    props:{
      aid: {
        type: Number,
      },
      videoData: {
        type: Object,
      },
    },
    data() {
      return {
        videoRank: null, // 视频每日数据
        viewOptions: null,// 播放量-折线图
        likeOptions: null,// 点赞数-折线图
        danmakuOptions: null,// 弹幕数-折线图
        shareOptions: null,// 分享数-折线图
        favoriteOptions: null,// 收藏数-折线图
        coinOptions: null,// 投币数-折线图
      }
    },
    methods: {
      // 视频详情折线图chart数据
      getVideoDeatilData () {
        let self = this;
        let viewArr = [];
        let likeArr = [];
        let danmakuArr = [];
        let shareArr = [];
        let favoriteArr = [];
        let coinArr = [];
        self.axios.get(`/api/video/${self.aid}/getVideoDeatilData`).then(r => {
          let data = r.data;
          if(data.msg == 'success' && data.data && data.data.length){
            self.videoRank = data.data;
            self.videoRank.forEach(function (value) {
              viewArr.push([value.date, value.view]);
              likeArr.push([value.date, value.like]);
              danmakuArr.push([value.date, value.danmaku]);
              shareArr.push([value.date, value.share]);
              favoriteArr.push([value.date, value.favorite]);
              coinArr.push([value.date, value.coin]);
            });
            self.viewOptions = getMultiChartOptions([[viewArr.reverse(), "", "#1e88e5"]]);
            self.likeOptions = getMultiChartOptions([[likeArr.reverse(), "", "#1e88e5"]]);
            self.danmakuOptions = getMultiChartOptions([[danmakuArr.reverse(), "", "#1e88e5"]]);
            self.shareOptions = getMultiChartOptions([[shareArr.reverse(), "", "#1e88e5"]]);
            self.favoriteOptions = getMultiChartOptions([[favoriteArr.reverse(), "", "#1e88e5"]]);
            self.coinOptions = getMultiChartOptions([[coinArr.reverse(), "", "#1e88e5"]]);
          }
        });
      },
      setNumber (number) {
        return setNumber(number);
      }
    },
    mounted(){
      let self = this;
      self.getVideoDeatilData();
//      self.viewOptions = getOptions([{ name: '暂无数据', value: 0 }]);
//      self.likeOptions = getOptions([{ name: '暂无数据', value: 0 }]);
//      self.danmakuOptions = getOptions([{ name: '暂无数据', value: 0 }]);
//      self.shareOptions = getOptions([{ name: '暂无数据', value: 0 }]);
//      self.favoriteOptions = getOptions([{ name: '暂无数据', value: 0 }]);
//      self.coinOptions = getMultiChartOptions([[coinArr.reverse(), "", "#1e88e5"]]);
    }
  }
</script>

<style scoped>
  .col-6 span{
    font-size: 15px;
  }
  .decline{
    color: #41ba47
  }
  .goUp{
    color: #f55345;
  }
  .icon-fans{
    display: inline-block;
    width: 20px;
    vertical-align: middle;
  }
  .icon-fans img{
    display: block;
    width: 100%;
  }
  .col-md-3,.col-md-4{
    padding: 12px 6px 0 6px;
  }
</style>