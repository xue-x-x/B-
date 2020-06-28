<template>
  <div>
    <header>
      <div class="wrap">
        <v-row>
          <v-col col="12">
            <v-card class="pa-2">
              <div class="d-flex flex-row">
                <v-avatar size="70" min-width="70px">
                  <img v-if="writerData.face" :src="writerData.face" alt="John">
                </v-avatar>
                <div class="user-right text-left ml-3">
                  <div class="font-weight-bold user-name text-truncate">
                    <span v-if="writerData.name">{{writerData.name}}</span>
                    <span v-if="writerData.level" class="user-level ml-2">Lv.{{writerData.level}}</span>
                    <i v-if="writerData.sex == '男' || writerData.sex == '女'" :class="writerData.sex == '男' ? 'icon-man' : 'icon-woman'"></i>
                  </div>
                  <div class="my-1 user-official">{{writerData.official}}</div>
                  <div class="my-2">
                    <v-chip class="mr-1 px-2" small text-color="#666" color="#f1f2f4" v-for="(item,index) in writerData.keywords" :key="index">
                      {{item}}
                    </v-chip>
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </header>
    <div class="wrap">
      <v-row>
        <v-col>
          <v-tabs class="elevation-3 py-0 my-2" v-model="tab" show-arrows hide-slider color="#f55345">
            <v-tab>
              <v-icon left>mdi-database</v-icon>基本统计
            </v-tab>
            <v-tab>
              <v-icon left>mdi-history</v-icon>历史数据
            </v-tab>
            <v-tab>
              <v-icon left>mdi-brain</v-icon>高级统计
            </v-tab>
            <v-tab>
              <v-icon left>mdi-radar</v-icon>价值分析
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-row>
                <v-col>
                  <v-card>
                    <div class="text-left">
                      <h3 class="px-5 py-1 writer-title">UP主最新数据</h3>
                    </div>
                    <v-card-text v-if="writerData">
                      <v-row>
                        <v-col>
                          <div class="text--darken-2">粉丝总数</div>
                          <div class="text--darken-3 font-weight-bold fs_18 mt-2" v-if="writerData.fans">{{writerData.fans}}</div>
                          <div class="text--darken-3 font-weight-bold fs_18 mt-2" v-else="">-</div>
                        </v-col>
                        <v-col>
                          <div class="text--darken-2">播放总数</div>
                          <div class="text--darken-3 font-weight-bold fs_18 mt-2" v-if="writerData.archiveView">{{writerData.archiveView}}</div>
                          <div class="text--darken-3 font-weight-bold fs_18 mt-2" v-else="">-</div>
                        </v-col>
                        <v-col>
                          <div class="text--darken-2">获赞总数</div>
                          <div class="text--darken-3 font-weight-bold fs_18 mt-2" v-if="writerData.like != 0">{{writerData.like}}</div>
                          <div class="text--darken-3 font-weight-bold fs_18 mt-2" v-else="">-</div>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card>
                    <div class="text-left">
                      <h3 class="px-5 py-1 writer-title">UP主排行数据</h3>
                    </div>
                    <v-card-text>
                      <v-row>
                        <v-col>
                          <div class="text--darken-2">粉丝排名</div>
                          <div class="text--darken-3 font-weight-bold fs_18 mt-2" v-if="writerData.fansRank">
                            {{writerData.fansRank}}
                            <span class="change d-none d-md-inline">
                              <span v-if="writerData.fansRankChange > 0" class="decline"> ↑ </span>
                              <span v-if="writerData.fansRankChange < 0" class="goUp"> ↓ </span>
                              <span v-if="writerData.fansRankChange" :class="writerData.fansRankChange < 0 ? 'goUp' : 'decline'">{{writerData.newFansRankChange}}</span>
                            </span>
                          </div>
                          <div class="text--darken-3 font-weight-bold fs_18 mt-2" v-else="">-</div>
                        </v-col>
                        <v-col>
                          <div class="text--darken-2">播放排名</div>
                          <div class="text--darken-3 font-weight-bold fs_18 mt-2" v-if="writerData.archiveViewRank">
                            {{writerData.archiveViewRank}}
                            <div class="change d-none d-md-inline" >
                              <span v-if="writerData.archiveViewRankChange > 0" class="goUp"> ↓</span>
                              <span v-if="writerData.archiveViewRankChange < 0" class="decline"> ↑ </span>
                              <span v-if="writerData.archiveViewRankChange" :class="writerData.archiveViewRankChange > 0 ? 'goUp' : 'decline'">{{writerData.newArchiveViewRankChange}}</span>
                            </div>
                          </div>
                          <div class="text--darken-3 font-weight-bold fs_18 mt-2" v-else="">-</div>
                        </v-col>
                        <v-col>
                          <div class="text--darken-2">获赞排名</div>
                          <div class="text--darken-3 font-weight-bold fs_18 mt-2" v-if="writerData.likeRank">
                            {{writerData.likeRank}}
                            <span class="change d-none d-md-inline">
                              <span v-if="parseInt(writerData.likeRankChange) > 0" class="goUp"> ↓ </span>
                              <span v-if="parseInt(writerData.likeRankChange) < 0" class="decline"> ↑ </span>
                              <span v-if="parseInt(writerData.likeRankChange)" :class="writerData.likeRankChange > 0 ? 'goUp' : 'decline'">{{writerData.newLikeRankChange}}</span>
                            </span>
                          </div>
                          <div class="text--darken-3 font-weight-bold fs_18 mt-2" v-else="">-</div>
                        </v-col>
                      </v-row>
                      <v-row class="clearfix">
                        <v-col class="fl pa-0 fs_12 text-left">仅包括已经观测UP主</v-col>
                        <v-col class="fr pa-0 fs_12 text-right">{{loadTime}}</v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <video-list :mid="mid"></video-list>
            </v-tab-item>
            <v-tab-item>
              <v-row>
                <v-col col="12">
                  <v-card>
                    <div class="text-left">
                      <h3 class="px-5 py-1 writer-title">UP主历史数据</h3>
                    </div>
                    <v-card-text>
                      <Chart
                              class="mb-2"
                              title="UP主历史数据"
                              :options="historyDataOptions"
                              style="width: 100%"
                      />
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col col="12">
                  <v-card>
                    <div class="text-left">
                      <h3 class="px-5 py-1 writer-title">历史变化速率</h3>
                    </div>
                    <v-card-text>
                      <Chart
                              class="mb-2"
                              title="历史变化速率"
                              :options="authorFansRateOptions"
                              style="width: 100%"
                      />
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <video-list :mid="mid"></video-list>
            </v-tab-item>
            <v-tab-item>
              <v-row>
                <v-col>
                  <v-card>
                    <div class="text-left">
                      <h3 class="px-5 py-1 writer-title">下期视频预测</h3>
                    </div>
                    <v-card-text v-if="writerData.estimate != null">
                      <v-row>
                        <v-col>
                          <div class="text--darken-2">涨粉</div>
                          <div class="text--darken-3 font-weight-bold fs_18 mt-2">{{writerData.estimate.like}}</div>
                        </v-col>
                        <v-col>
                          <div class="text--darken-2">播放</div>
                          <div class="text--darken-3 font-weight-bold fs_18 mt-2">{{writerData.estimate.view}}</div>
                        </v-col>
                        <v-col>
                          <div class="text--darken-2">收益</div>
                          <div class="text--darken-3 font-weight-bold fs_18 mt-2">{{writerData.estimate.profit}}</div>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-text v-else>
                      <div>暂无数据</div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col col="12">
                  <v-card>
                    <div class="text-left">
                      <h3 class="px-5 py-1 writer-title">每日收益</h3>
                    </div>
                    <v-card-text>
                      <Chart
                              class="mb-2"
                              title="每日收益"
                              :options="earningsDataOptions"
                              style="width: 100%"
                      />
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col col="12">
                  <v-card>
                    <div class="text-left">
                      <h3 class="px-5 py-1 writer-title">粉丝变化效率</h3>
                    </div>
                    <v-card-text>
                      <Chart
                              class="mb-2"
                              title="粉丝变化效率"
                              :options="authorFansEfficiencyOptions"
                              style="width: 100%"
                      />
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-tabs class="elevation-3 py-0 my-2 border-bottom" v-model="hotTab" show-arrows color="#1e88e5">
                    <v-tab>
                      <v-icon left>mdi-fire</v-icon>UP主频道分析
                    </v-tab>
                    <v-tab>
                      <v-icon left>mdi-alpha-i-circle-outline</v-icon>UP主热词
                    </v-tab>
                  </v-tabs>
                  <v-tabs-items v-model="hotTab">
                    <v-tab-item>
                      <v-row>
                        <v-col>
                          <biliob-detail-charts :options="typeOptions"></biliob-detail-charts>
                        </v-col>
                      </v-row>
                    </v-tab-item>
                    <v-tab-item>
                      <v-row>
                        <v-col>
                          <biliob-detail-charts :options="hotOptions"></biliob-detail-charts>
                        </v-col>
                      </v-row>
                    </v-tab-item>
                  </v-tabs-items>
                </v-col>
              </v-row>
              <video-list :mid="mid"></video-list>
            </v-tab-item>
            <v-tab-item>
              <v-row>
                <v-col>
                  <v-card>
                    <div class="text-left">
                      <h3 class="px-5 py-1 writer-title">UP主价值分析</h3>
                    </div>
                    <v-card-text v-if="writerData.estimate != null">
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-card-text>
                            <Chart
                                    class="mb-2"
                                    title="UP主价值分析"
                                    :options="valueAnalysisOptions"
                                    style="width: 100%;"
                            />
                          </v-card-text>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <ul class="pt-5">
                            <li class="value-analysis-intro mb-4 pr-md-8">
                              <div class="intro-title">影响力</div>
                              <div class="intro-text">
                                结合达人粉丝数、历史播放量等数据并通过大数据分析得出。该指数有可能影响合作视频的曝光量等数据；
                              </div>
                            </li>
                            <li class="value-analysis-intro mb-4 pr-md-8">
                              <div class="intro-title">互动性</div>
                              <div class="intro-text">
                                结合达人获赞数、评论数等数据并通过大数据分析得出。该指数有可能影响合作视频的获赞量、评论量、转发量等数据；
                              </div>
                            </li>
                            <li class="value-analysis-intro mb-4 pr-md-8">
                              <div class="intro-title">专业度</div>
                              <div class="intro-text">
                                结合达人历史视频的专业程度并通过大数据分析得出。该指数有可能会影响达人对产品及相关知识的讲解以及产品垂直领域的专业度；
                              </div>
                            </li>
                            <li class="value-analysis-intro mb-4 pr-md-8">
                              <div class="intro-title">表现力</div>
                              <div class="intro-text">
                                结合达人历史视频的表现力并通过大数据分析得出。该指数有可能会影响合作视频的后期制作水平、达人的镜头表现力等；
                              </div>
                            </li>
                            <li class="value-analysis-intro  pr-md-8">
                              <div class="intro-title">性价比</div>
                              <div class="intro-text">
                                结合达人报价和其综合指标的比值并通过大数据分析得出。该指数直接反映达人的性价比程度。
                              </div>
                            </li>
                          </ul>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-text v-else>
                      <div>暂无数据</div>6
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <video-list :mid="mid"></video-list>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
      <div>
      </div>
    </div>
  </div>
</template>

<script>
  import { setNumber} from '../../utils/chatUtils';
  import interpolation from "../../charts/util/interpolation";
  import getOptions from "../../charts/cloud-charts.js";
  import getMultiChartOptions from "@/charts/biliob-multi-line-chart.js";
  import getRadarOptions from "@/charts/biliob-radar-line-chart.js";
  import getAuthorFansEfficiencyOptions from "@/charts/author-fans-efficiency.js";
  var deepCopy = function(o) {
    if (o instanceof Array) {
      var n = [];
      for (let i = 0; i < o.length; ++i) {
        n[i] = deepCopy(o[i]);
      }
      return n;
    } else if (o instanceof Object) {
      var no = {};
      for (var i in o) {
        no[i] = deepCopy(o[i]);
      }
      return no;
    } else {
      return o;
    }
  };
  export default {
    name: "",
    components: {
      BiliobDetailCharts: () => import('@/components/biliob/DetailCharts'),
      VideoList: () => import('@/components/writer/VideoList'),
    },
    data() {
      return {
        tab: null,
        hotTab: null,
        loadTime: "",
        mid: 0,
        writerData: {},
        historyDataOptions: {},
        earningsDataOptions: {},
        authorFansRateOptions: {},
        authorFansEfficiencyOptions: {},
        hotOptions: {},
        typeOptions: {},
        authorData: {},
        valueAnalysisOptions: {}
      }
    },
    methods: {
      // 获取UP主详情
      getWriter () {
        let self = this;
        self.axios.get(`/api/author/${self.mid}`).then(r => {
          let data = r.data;
          self.loadTime = data.time;
          if(data.success){
            self.writerData = data.data;
            self.setWriter();
            // effect=>影响力;interact=>互动性;profession=>专业度;show=>表现力;cost=>性价比
            let tadarArray = [data.data.effect,data.data.interact,data.data.profession,data.data.show,data.data.cost,];
            self.valueAnalysisOptions =  getRadarOptions ([[tadarArray, "UP主价值分析"]]);
          }

        });
      },
      setWriter () {
        let self = this;
        let parameter = ["fans","archiveView","like","fansRank","archiveViewRank","likeRank","estimate"];
        parameter.forEach(function (item) {
          if(self.writerData[item] != null&& item != "estimate"){
            self.writerData[item] = setNumber(self.writerData[item]);
          }else if(self.writerData[item] != null && item == "estimate"){
            self.writerData[item].like = setNumber(self.writerData[item].like);
            self.writerData[item].view = setNumber(self.writerData[item].view);
            self.writerData[item].profit = setNumber(self.writerData[item].profit);
          }
        });
        self.writerData['newFansRankChange'] = setNumber(Math.abs(self.writerData.fansRankChange));
        self.writerData['newArchiveViewRankChange'] = setNumber(Math.abs(self.writerData.archiveViewRankChange));
        self.writerData['newLikeRankChange'] = setNumber(Math.abs(self.writerData.likeRankChange));
      },
      // 获取UP主每日数据
      getAuthorData () {
        let self = this;
        let fansArray = [];
        let likeArray = [];
        let viewArray = [];
        self.axios.get(`/api/author/${self.mid}/data`).then(r => {
          let data = r.data;
          if(data.success){
            self.authorData = data;
            self.authorData.data.forEach(function (val) {
              if (val.fans != undefined && val.fans != 0) {
                fansArray.push([val.day, Number(val.fans)]);
              }
              if (val.like != undefined && val.like != 0) {
                likeArray.push([val.day, val.like]);
              }
              if (val.view != undefined && val.view != 0) {
                viewArray.push([val.day, val.view]);
              }
            });
            self.authorFansEfficiencyOptions = getAuthorFansEfficiencyOptions(
              deepCopy(self.authorData)
            );
            fansArray = fansArray.reverse();
            viewArray = viewArray.reverse();
            likeArray = likeArray.reverse();
            self.historyDataOptions =  getMultiChartOptions([
              [fansArray, "粉丝数", "#1e88e5"],
              [viewArray, "播放数", "#2b821d"],
              [likeArray, "获赞数", "#c12e34"]
            ]);
            self.authorFansRateOptions = getMultiChartOptions(
              [
                [interpolation(fansArray), "粉丝数增长", "#1e88e5"],
                [interpolation(viewArray), "播放数增长", "#2b821d"],
                [interpolation(likeArray), "获赞数增长", "#c12e34"]
              ],
              "line","areaStyle"
            );
            self.earningsDataOptions = getMultiChartOptions([ [fansArray, "每日收益", "#1e88e5"]]);
          }
        });

      },
      /*getHotOptions () {
        let self = this;
        self.axios.get(`/api/site/prefer-keyword`).then(r => {
          let data = r.data.data;
          let Array = [];
          for (var item in data){
            Array.push({ name: item, value: data[item] });
          }
          if(JSON.stringify(data) =="{}"){
            Array.push({ name: '暂无数据', value: 0 });
          }
          self.hotOptions = getOptions(Array);
        });
      },*/
      // 获取UP主热词数据
      getPreferKeyword () {
        let self = this;
        self.axios.get(`/api/author/${self.mid}/prefer-keyword`).then(r => {
          let data = r.data.data;
          let Array = [];
          for (var item in data){
            Array.push({ name: item, value: data[item] });
          }
          if(JSON.stringify(data) =="{}"){
            Array.push({ name: '暂无数据', value: 0 });
          }
          self.hotOptions = getOptions(Array);
        });
      },
      //获取UP主频道分析数据
      getChannel (){
        let self = this;
        self.axios.get(`/api/author/${self.mid}/channel`).then(r => {
          let data = r.data.data;
          let Array = [];
          for (var item in data){
            Array.push({ name: data[item].name, value: data[item].tid });
          }
          if(JSON.stringify(data) =="{}"){
            Array.push({ name: '暂无数据', value: 0 });
          }
          self.typeOptions = getOptions(Array);
        });
      },
    },
    mounted() {
      let self = this;
      self.mid = self.$route.query.mid * 1;
      self.getWriter();
      self.getAuthorData();
      self.getPreferKeyword();
      self.getChannel();
    }

  }
</script>

<style scoped>
  .icon-man{
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url("../../assets/icon/man.png") no-repeat;
    background-size: 100% 100%;
  }
  .icon-woman{
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url("../../assets/icon/woman.png") no-repeat;
    background-size: 100% 100%;
  }
  .decline{
    color: #f55345;
  }
  .goUp{
    color: #41ba47;
  }
  .user-right{
    width: 100%;
  }
  .user-name{
    color: #424242;
  }
  .user-level{
    padding: 0 12px;
    display: inline-block;
    height: 24px;
    line-height: 24px;
    background-color: #f55345;
    color: #fff;
    border-radius: 12px;
  }
  .user-official{
    font-size: 14px;
    color: #999;
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
  .border-bottom{
    border-bottom: 2px solid #1e88e5;
  }
  .value-analysis-intro{
    position: relative;
    padding-left: 100px;
  }
  .intro-title{
    position: absolute;
    top: 8px;
    left: 0;
    width: 80px;
    height: 28px;
    line-height: 28px;
    color: #fff;
    text-align: center;
    background-color: #1887f0;
    border-radius: 5px;
  }
  .intro-text{
    line-height: 22px;
    text-align: left;
  }
  @media screen and (max-width: 750px){
    .v-application ul{
      padding-left: 0;
    }
    .v-card__text{
      /*padding: 0;*/
    }
  }
</style>