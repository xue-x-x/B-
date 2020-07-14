<template>
  <div>
    <header>
      <div class="wrap">
        <v-card class="pa-2">
          <v-row>
            <v-col cols="12" md="10">
                <div class="d-flex flex-row">
                  <v-avatar size="90" min-width="90px">
                    <img v-if="writerData.face" :src="writerData.face" alt="John">
                  </v-avatar>
                  <div class="user-right text-left ml-3">
                    <div class="font-weight-bold user-name text-truncate">
                      <span v-if="writerData.name">{{writerData.name}}</span>
                      <i v-if="writerData.sex == '男' || writerData.sex == '女'" :class="writerData.sex == '男' ? 'icon-man' : 'icon-woman'"></i>
                      <span class="mg-grade">{{writerData.moguScore}}分</span>
                      <span v-if="writerData.moguLevel" class="mg-exponent" :class="mgExponent[writerData.moguLevel].className">
                        <i></i>{{mgExponent[writerData.moguLevel].title}}
                      </span>
                    </div>
                    <div class="my-2 user-official"><span>平台认证：</span>{{writerData.official}}</div>
                    <div class="my-2 user-official">
                      <span>类型：</span>
                      <v-chip class="mr-1 px-2" small text-color="#666" color="#f1f2f4" v-for="(item,index) in writerData.newTag" :key="index">
                        {{item}}
                      </v-chip>
                    </div>
                    <div class="my-2 user-official"><span>创建时间：</span>{{writerData.regtime}}</div>
                  </div>
                </div>
            </v-col>
            <v-col cols="12" md="2">
              <v-btn class="ma-2 header-btn" color="blue lighten-1" @click="goTo('/writerSimilarity',{tag: encodeURIComponent(writerData.tag)})">相似达人</v-btn>
              <v-btn class="ma-2 header-btn" color="green lighten-1" @click="goTo('/cooperation',{id: writerData.mid})">我要合作</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </header>
    <div class="wrap">
      <v-row>
        <v-col>
          <v-tabs class="elevation-3 py-0 my-2" v-model="tab" @change="changeTab" show-arrows color="#f55345">
            <v-tab>达人详情</v-tab>
            <v-tab>视频分析</v-tab>
            <v-tab>粉丝分析</v-tab>
            <v-tab>价值分析</v-tab>
            <v-tab>合作预估</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <!-- 达人详情 -->
            <v-tab-item>
              <v-row>
                <!-- 粉丝数 折线图 -->
                <v-col cols="12" md="6">
                  <v-card class="pa-1 pa-md-4">
                    <div class="pt-2 text-left">
                      <span>粉丝数：{{writerData.fans ? writerData.newFans : '-'}}</span>
                      <span v-if="writerData.fansChange > 0" class="decline"> ↑ </span>
                      <span v-if="writerData.fansChange < 0" class="goUp"> ↓ </span>
                      <span v-if="writerData.fansChange" :class="writerData.fansChange < 0 ? 'goUp' : 'decline'">{{writerData.newFansChange}}</span>
                      <span class="icon-fans"><img src="@/assets/icon/a528e954.svg" alt=""></span>
                    </div>
                    <div>
                      <v-card-text>
                        <Chart
                                class="mb-2"
                                title="粉丝数"
                                :options="fansDataOptions"
                                style="width: 100%"
                        />
                      </v-card-text>
                    </div>
                  </v-card>
                </v-col>
                <!-- 播放量 折线图 -->
                <v-col cols="12" md="6">
                  <v-card class="pa-1 pa-md-4">
                    <div class="pt-2 text-left">
                      <span>播放量：{{writerData.archiveView ? writerData.archiveView : '-'}}</span>
                      <span v-if="writerData.archiveViewChange > 0" class="decline"> ↑ </span>
                      <span v-if="writerData.archiveViewChange < 0" class="goUp"> ↓ </span>
                      <span v-if="Number(writerData.archiveViewChange)" :class="writerData.archiveViewChange < 0 ? 'goUp' : 'decline'">{{writerData.newArchiveViewChange}}</span>
                      <span class="icon-fans"><img src="@/assets/icon/a528e954.svg" alt=""></span>
                    </div>
                    <div>
                      <v-card-text>
                        <Chart
                                class="mb-2"
                                title="播放量"
                                :options="viewDataOptions"
                                style="width: 100%"
                        />
                      </v-card-text>
                    </div>
                  </v-card>
                </v-col>
                <!-- 获赞数 折线图 -->
                <v-col cols="12" md="6">
                  <v-card class="pa-1 pa-md-4">
                    <div class="pt-2 text-left">
                      <span>获赞数：{{writerData.like ? writerData.like : '-'}}</span>
                      <span v-if="writerData.likeChange > 0" class="decline"> ↑ </span>
                      <span v-if="writerData.likeChange < 0" class="goUp"> ↓ </span>
                      <span v-if="Number(writerData.likeChange)" :class="writerData.likeChange < 0 ? 'goUp' : 'decline'">{{writerData.newLikeChange}}</span>
                      <span class="icon-fans"><img src="@/assets/icon/a528e954.svg" alt=""></span>
                    </div>
                    <div>
                      <v-card-text>
                        <Chart
                                class="mb-2"
                                title="获赞数"
                                :options="likeDataOptions"
                                style="width: 100%"
                        />
                      </v-card-text>
                    </div>
                  </v-card>
                </v-col>
                <!-- 投稿数 折线图 -->
                <v-col cols="12" md="6">
                  <v-card class="pa-1 pa-md-4">
                    <div class="pt-2 text-left">
                      <span>投稿数：{{writerData.archiveNum ? writerData.newArchiveNum : '-'}}</span>
                      <span v-if="contribute.monthUp > 0" class="decline" title="月增量"> ↑ </span>
                      <span v-if="contribute.monthUp < 0" class="goUp" title="月增量"> ↓ </span>
                      <span v-if="Number(contribute.monthUp)" :class="contribute.monthUp < 0 ? 'goUp' : 'decline'" title="月增量">{{contribute.newMonthUp}}</span>
                      <span class="icon-fans"><img src="@/assets/icon/a528e954.svg" alt=""></span>
                    </div>
                    <div>
                      <v-card-text>
                        <Chart
                                class="mb-2"
                                title="投稿数"
                                :options="videoNumByMonthOptions"
                                style="width: 100%"
                        />
                      </v-card-text>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-tab-item>
            <!-- 视频分析 -->
            <v-tab-item>
              <v-row>
                <v-col col="12">
                  <v-card>
                    <div class="text-left">
                      <h3 class="px-5 py-1 writer-title">播放数据分析</h3>
                    </div>
                    <v-row>
                      <v-col cols="6" md="3">平均播放量：{{chartData.newAvgView}}</v-col>
                      <v-col cols="6" md="2">播放率：{{avgViewRate}}</v-col>
                    </v-row>
                    <v-card-text>
                      <Chart
                              class="mb-2"
                              :options="viewListOptions"
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
                      <h3 class="px-5 py-1 writer-title">互动数据分析</h3>
                    </div>
                    <v-row>
                      <v-col cols="4" md="3">点击率/评级：{{chartData.alikeRate}}/{{chartData.alikeLevel}}</v-col>
                      <v-col cols="4" md="3">评论率/评级：{{chartData.commentRate}}/{{chartData.commentLevel}}</v-col>
                      <v-col cols="4" md="3">弹幕率/评级：{{chartData.danmakuRate}}/{{chartData.danmakuLevel}}</v-col>
                    </v-row>
                    <v-card-text>
                      <Chart
                              class="mb-2"
                              title="互动数据分析"
                              :options="interactListOptions"
                              style="width: 100%"
                      />
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-tab-item>
            <!-- 粉丝分析 -->
            <v-tab-item>
              <v-row>
                <!-- 粉丝年龄段分布 树状图 -->
                <v-col cols="12" md="6">
                  <v-card class="pa-1 pa-md-4">
                    <div>
                      <v-card-text>
                        <Chart
                                class="mb-2"
                                :options="fansLis.fansAgeOptions"
                                style="width: 100%"
                        />
                      </v-card-text>
                    </div>
                  </v-card>
                </v-col>
                <!-- 粉丝性别 饼图 -->
                <v-col cols="12" md="6">
                  <v-card class="pa-1 pa-md-4">
                    <div>
                      <v-card-text>
                        <Chart
                                class="mb-2"
                                :options="fansLis.fansGenderOptions"
                                style="width: 100%"
                        />
                      </v-card-text>
                    </div>
                  </v-card>
                </v-col>
                <!-- 粉丝地域 饼图 -->
                <v-col cols="12" md="6">
                  <v-card class="pa-1 pa-md-4">
                    <div>
                      <v-card-text>
                        <Chart
                                class="mb-2"
                                :options="fansLis.fansRegionOptions"
                                style="width: 100%"
                        />
                      </v-card-text>
                    </div>
                  </v-card>
                </v-col>
                <!-- 活跃粉丝 饼图 -->
                <v-col cols="12" md="6">
                  <v-card class="pa-1 pa-md-4">
                    <div>
                      <v-card-text>
                        <Chart
                                class="mb-2"
                                :options="fansLis.fansLivefansOptions"
                                style="width: 100%"
                        />
                      </v-card-text>
                    </div>
                  </v-card>
                </v-col>
              </v-row>

            </v-tab-item>
            <!-- 价值分析 -->
            <v-tab-item>
              <v-row>
                <v-col>
                  <v-card>
                    <div class="text-left">
                      <h3 class="px-5 py-1 writer-title">达人价值分析</h3>
                    </div>
                    <v-card-text>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-card-text>
                            <Chart
                                    class="mb-2"
                                    title="达人价值分析"
                                    :options="valueAnalysisOptions"
                                    style="width: 100%;"
                            />
                          </v-card-text>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <ul class="pt-md-5">
                            <li class="value-analysis-intro mb-4 pr-md-8">
                              <div class="intro-title">影响力({{writerData.effect}})</div>
                              <div class="intro-text">
                                结合达人粉丝数、历史播放量等数据并通过大数据分析得出。该指数有可能影响合作视频的曝光量等数据；
                              </div>
                            </li>
                            <li class="value-analysis-intro mb-4 pr-md-8">
                              <div class="intro-title">互动性({{writerData.interact}})</div>
                              <div class="intro-text">
                                结合达人获赞数、评论数等数据并通过大数据分析得出。该指数有可能影响合作视频的获赞量、评论量、转发量等数据；
                              </div>
                            </li>
                            <li class="value-analysis-intro mb-4 pr-md-8">
                              <div class="intro-title">专业度({{writerData.profession}})</div>
                              <div class="intro-text">
                                结合达人历史视频的专业程度并通过大数据分析得出。该指数有可能会影响达人对产品及相关知识的讲解以及产品垂直领域的专业度；
                              </div>
                            </li>
                            <li class="value-analysis-intro mb-4 pr-md-8">
                              <div class="intro-title">表现力({{writerData.show}})</div>
                              <div class="intro-text">
                                结合达人历史视频的表现力并通过大数据分析得出。该指数有可能会影响合作视频的后期制作水平、达人的镜头表现力等；
                              </div>
                            </li>
                            <li class="value-analysis-intro  pr-md-8">
                              <div class="intro-title">性价比({{writerData.cost}})</div>
                              <div class="intro-text">
                                结合达人报价和其综合指标的比值并通过大数据分析得出。该指数直接反映达人的性价比程度。
                              </div>
                            </li>
                          </ul>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-tab-item>
            <!-- 合作预估 -->
            <v-tab-item>
              <v-card class="forecast-box">
                <v-row>
                  <v-col cols="12">
                    <v-row class="forecast-form">
                      <v-col cols="12" md="3">
                        <label for="">
                          <span>您的产品：</span>
                          <select name="" id="" v-model="category">
                            <option :value = "item" v-for="(item,index) in selectItem" :key="index">{{item}}</option>
                          </select>
                        </label>
                      </v-col>
                      <v-col cols="12" md="3">
                        <label for="">
                          <span>产品售价：</span>
                          <input type="text" v-model="price" placeholder="请输入产品售价">
                        </label>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-btn color="primary" @click="getYuguData">数据预估</v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" class="mt-8">
                    <v-row class="forecast-value">
                      <v-col cols="12" md="5" class="mb-3 mb-md-0">
                        <p class="forecast-title">预估播放量：</p>
                        <v-number :number="`${yuguData.yuguViews}`"></v-number>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on">
                              <v-icon class="icon-help">help</v-icon>
                            </v-btn>
                          </template>
                          <span>
                            数据基于大数据分析进行预估，实时佣金与预估佣金可能会有一定出入。该预估数据仅供参考。
                          </span>
                        </v-tooltip>
                      </v-col>
                      <v-col cols="12" md="5" class="mb-3 mb-md-0">
                        <p class="forecast-title">预估摄影佣金：</p>
                        <v-number :number="`${yuguData.yuguPrice}`"></v-number>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on">
                              <v-icon class="icon-help">help</v-icon>
                            </v-btn>
                          </template>
                          <span>
                            数据基于大数据分析进行预估，实时佣金与预估佣金可能会有一定出入。请以达人或平台客服报价为准。
                          </span>
                        </v-tooltip>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
          <!-- 达人热词 -->
          <v-row :class="[isBarrage ? 'showBarrage' : 'hideBarrage' ]">
            <v-col col="12">
              <v-card>
                <div class="text-left">
                  <h3 class="px-5 py-1 writer-title" @click="isPause = !isPause">达人热词</h3>
                </div>
                <div class="baberrage-box">
                  <v-barrage ref="VBarrage" :arr="barrageList" :isPause="isPause" :percent="100"></v-barrage>
                </div>
              </v-card>
            </v-col>
          </v-row>
          <!-- 达人视频 -->
          <video-list :mid="mid"></video-list>
        </v-col>
      </v-row>
    </div>
    <v-overlay :value="overlay" color="#fff" opacity="0.3">
      <v-progress-circular indeterminate size="64" color="#f55345"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
  import { setNumber} from '../../utils/chatUtils';
  import interpolation from "../../charts/util/interpolation";
  import getOptions from "../../charts/cloud-charts.js";
  import getMultiChartOptions from "@/charts/biliob-multi-line-chart.js";
  import getChartOptions from "@/charts/biliob-line-chart.js";
  import getRadarOptions from "@/charts/biliob-radar-line-chart.js";
  import getAuthorFansEfficiencyOptions from "@/charts/author-fans-efficiency.js";
  import formatNumber from "@/utils/format-number";
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
      VBarrage: () => import('@/components/VBarrage/index.vue'),
      VNumber: () => import('@/components/number/index.vue'),
    },
    data() {
      return {
        overlay: false,
        tab: null,
        hotTab: null,
        loadTime: "",
        mid: 0,
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
        writerData: {}, // 达人详情信息
        fansDataOptions: {},// 粉丝数-折线图
        viewDataOptions: {},// 播放量-折线图
        likeDataOptions: {},// 获赞数-折线图
        authorFansRateOptions: {},// 历史变化速率
        authorData: {}, // 达人每日数据
        valueAnalysisOptions: {},// 达人价值分析
        contribute: {},// 作者投稿数据
        videoNumByMonthOptions: {},// 月度投稿数-折线图
        chartData: {},// 视频分析数据
        avgViewRate: 0,// 播放率（平均播放 / 粉丝数）
        viewListOptions: {},// 播放数据分析
        interactListOptions: {},// 互动数据
        isBarrage: true, // 是否显示达人热词
        barrageList: [],// 达人热词
        isPause: false,// 控制是否暂停弹幕
        isJs: false,// 是否解析html
        direction: 'default',// 方向  default | top
        fansDataByMid: {}, // 粉丝分析数据
        fansLis: {
          fansAgeOptions:{},
          fansGenderOptions:{},
          fansRegionOptions:{},
          fansLivefansOptions:{},
        },
        selectItem: ['请选择产品','美食','宠物','手机平板','影音智能','汽车','运动户外','绘画手工','游戏','教育培训'],
        category: '请选择产品',
        price: '',
        yuguData: {
          yuguViews: '000000',
          yuguPrice: '000000',
        },
      }
    },
    computed: {

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
      // 获取达人详情
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
            self.valueAnalysisOptions =  getRadarOptions ([[tadarArray, "达人价值分析"]]);
          }

        });
      },
      setWriter () {
        let self = this;
        let parameter = ["archiveView","like","fansRank","archiveViewRank","likeRank","estimate"];
        parameter.forEach(function (item) {
          if(self.writerData[item] != null&& item != "estimate"){
            self.writerData[item] = setNumber(self.writerData[item]);
          }else if(self.writerData[item] != null && item == "estimate"){
            self.writerData[item].like = setNumber(self.writerData[item].like);
            self.writerData[item].view = setNumber(self.writerData[item].view);
            self.writerData[item].profit = setNumber(self.writerData[item].profit);
          }
        });
        self.writerData['newTag'] = self.writerData.tag.split(',');
        self.writerData['newFans'] = setNumber(Math.abs(self.writerData.fans));
        self.writerData['newFansChange'] = setNumber(self.writerData.fansChange);
        self.writerData['newArchiveViewChange'] = setNumber(self.writerData.archiveViewChange);
        self.writerData['newLikeChange'] = setNumber(self.writerData.likeChange);
        self.writerData['newArchiveNum'] = setNumber(self.writerData.archiveNum);

        self.writerData['newFansRankChange'] = setNumber(Math.abs(self.writerData.fansRankChange));
        self.writerData['newArchiveViewRankChange'] = setNumber(Math.abs(self.writerData.archiveViewRankChange));
        self.writerData['newLikeRankChange'] = setNumber(Math.abs(self.writerData.likeRankChange));
      },
      // 获取达人每日数据
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
                fansArray.push([val.day, val.fans]);
              }
              if (val.like != undefined && val.like != 0) {
                likeArray.push([val.day, val.like]);
              }
              if (val.view != undefined && val.view != 0) {
                viewArray.push([val.day, val.view]);
              }
            });
            fansArray = fansArray.reverse();
            viewArray = viewArray.reverse();
            likeArray = likeArray.reverse();
            // 粉丝数
            self.fansDataOptions = getMultiChartOptions([[fansArray, "", "#1e88e5"]]);
            // 播放数
            self.viewDataOptions = getMultiChartOptions([[viewArray, "", "#1e88e5"]]);
            // 获赞数
            self.likeDataOptions = getMultiChartOptions([[likeArray, "", "#1e88e5"]]);
            self.authorFansRateOptions = getMultiChartOptions(
              [
                [interpolation(fansArray), "粉丝数增长", "#1e88e5"],
                [interpolation(viewArray), "播放数增长", "#2b821d"],
                [interpolation(likeArray), "获赞数增长", "#c12e34"]
              ],
              "line","areaStyle"
            );
          }
        });

      },
      // 获取达人热词数据
      getPreferKeyword () {
        let self = this;
        self.axios.get(`/api/author/${self.mid}/prefer-keyword`).then(r => {
          let data = r.data.data;
          self.barrageList = [];
          for (var item in data){
            let tiem = Math.floor(Math.random() * (6 - 3) + 3);
            let opacity = Math.random();
            opacity = opacity > 0.5 ? opacity : opacity + .2
            self.barrageList.push(
              {
                content: item, // 弹幕内容
                direction: self.direction, // 方向  default | top
                isSelf: true, // 是否是自己发的弹幕
                style: {
                  color: 'red',
                  fontSize: `${tiem}${tiem}px`,
                  opacity: opacity,
                },
                isJs: false  // 是否解析html
              }
            );
          }
          if(!self.barrageList.length){
            self.barrageList.push({
              content: "暂无数据", // 弹幕内容
              direction: 'top', // 方向  default | top
              isSelf: true, // 是否是自己发的弹幕
              style: {
                color: 'red',
                top: '40%',
                background: '#000',
              },
              isJs: false  // 是否解析html
            });
          }
        });
      },
      // 获取投稿数据
      getVideoNumByMonth (){
        let self = this;
        self.axios.get(`/api/video/${self.mid}/getVideoNumByMonth`).then(r => {
          let data = r.data;
          let videoNumByMonth = [];
          self.contribute = {
            totalNums: data.totalNums,
            monthUp: data.monthUp,
            newMonthUp: setNumber(data.monthUp)
          };
          data.videoNums.forEach(function (val) {
            if (val.nums != undefined && val.nums != 0) {
              videoNumByMonth.push([val.mont, val.nums]);
            }
          });
          videoNumByMonth = videoNumByMonth.reverse();
          self.videoNumByMonthOptions = getMultiChartOptions([[videoNumByMonth, "", "#1e88e5"]]);
        });
      },
      // 获取视频分析数据
      getChartData (){
        let self = this;
        let alikeRateArray = [];
        let commentRateArray = [];
        let danmakuRateArray = [];
        self.axios.get(`/api/video/${self.mid}/getChartData`).then(r => {
          let data = r.data;
          let avgViewRate = (data.avgView / self.writerData.fans) * 100 ;
          self.avgViewRate = `${avgViewRate.toFixed(3)}%`;
          self.chartData = data;
          self.chartData['newAvgView'] = setNumber(Math.abs(self.chartData.avgView));
          self.setViewListOptions();
          self.chartData.interactList.forEach(function (val) {
            if (val.alikeRate != undefined) {
              alikeRateArray.push([val.datetime, (val.alikeRate * 100).toFixed(2)]);
            }
            if (val.commentRate != undefined) {
              commentRateArray.push([val.datetime, (val.commentRate * 100).toFixed(2)]);
            }
            if (val.danmakuRate != undefined) {
              danmakuRateArray.push([val.datetime, (val.danmakuRate * 100).toFixed(2)]);
            }
          });
          alikeRateArray = alikeRateArray.reverse();
          commentRateArray = commentRateArray.reverse();
          danmakuRateArray = danmakuRateArray.reverse();
          self.interactListOptions = getChartOptions(
            [
              [alikeRateArray, "点赞率","#ffa414"],
              [commentRateArray, "评论率","#30903f"],
              [danmakuRateArray, "弹幕率","#c12e34"],
            ]
          );
        });
      },
      // 获取粉丝分析数据
      getFansDataByMid (){
        let self = this;
        self.axios.get(`/api/author/${self.mid}/getFansDataByMid`).then(r => {
          self.fansDataByMid = r.data;
          let livefans = {
            '活跃粉丝': self.fansDataByMid.livefans,
            '其他': self.fansDataByMid.fans - self.fansDataByMid.livefans,
          };
          let itemStyle = {
            normal:{
              color:function(params) {
                //自定义颜色
                var colorList = [
                  '#16a085', '#3398DB'
                ];
                return colorList[params.dataIndex]
              }
            }
          };
          let pieList = [
            {
              title: '粉丝性别分布',
              name: '粉丝性别',
              data: self.fansDataByMid.gender,
              optionName: 'fansGenderOptions',
              itemStyle: {},
            },
            {
              title: '粉丝地域分布',
              name: '粉丝性别',
              data: self.fansDataByMid.region,
              optionName: 'fansRegionOptions',
              itemStyle: {},
            },
            {
              title: '活跃粉丝占比',
              name: '活跃粉丝',
              data: livefans,
              optionName: 'fansLivefansOptions',
              itemStyle: itemStyle,
            },
          ];
          self.setFansAgeOptions();// 粉丝年龄段
          pieList.forEach(function (value) {
            self.fansLis[value.optionName] = self.setPieOptions(value.title,value.name,value.data,value.itemStyle);
          });



        });
      },
      //获取数据预估
      getYuguData (){
        let self = this;
        if(self.category == '请选择产品' || !self.price) return;
        self.overlay = true;
        self.axios.get('/api/author/getYuguData',{
          params: {
            mid: self.mid,
            category: self.category,
            price: self.price,
          }
        }).then(r => {
          let data = r.data;
          console.log(data);
          if(data.msg == 'success'){
            self.overlay = false;
            self.yuguData.yuguViews = data.yuguViews;
            self.yuguData.yuguPrice = data.yuguPrice;
          }
        });
      },
      // 设置播放数据-柱状图
      setViewListOptions (){
        let self = this;
        let xAxisData = [];
        let dataData = [];
        self.chartData.viewList.forEach(value => {
          let newDatetime=/\d{4}-\d{1,2}-\d{1,2}/g.exec(value.datetime);
          self.$set(value,'newView',setNumber(Number(value.view)));
          self.$set(value,'newDatetime',newDatetime[0]);
          xAxisData.push(value.datetime);
          dataData.push(value.view);
        });
        self.viewListOptions = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            enterable: true,
            padding: 0,
            position: function(pt) {
              return [pt[0], pt[1]];
            },
            formatter: function (params) {
              let index = params[0].dataIndex;
              let item = self.chartData.viewList[index];
              let res  = '<a href="/video?aid='+item.aid+'" style="padding: 10px;\n' +
                '    display: block;\n' +
                '    width: 140px;\n' +
                '    font-size: 14px;\n' +
                '    color: #333;\n' +
                '    text-align: left;\n' +
                '    box-shadow: 0 0 8px 2px #999;\n' +
                '    background-color: #fff">\n' +
                '        <img style="margin-bottom: 5px;display: block;width: 100%" src="'+item.pic+'" alt="视频封面">\n' +
                '        <p style="margin-bottom: 0">'+item.newDatetime+'</p>\n' +
                '        <p style="margin-bottom: 0">观看量：'+item.newView+'</p>\n' +
                '      </a>';
              return res;
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: xAxisData,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: formatNumber
              }
            },
          ],
          series: [
            {
              type: 'bar',
              barWidth: '60%',
              data: dataData,
            }
          ]
        }
      },
      // 设置粉丝年龄段分布-柱状图
      setFansAgeOptions (){
        let self = this;
        let xAxisData = [];
        let seriesData = [];
        for (let item in self.fansDataByMid.age){
          xAxisData.push(item);
          seriesData.push((self.fansDataByMid.age[item] * self.fansDataByMid.fans).toFixed(3));
        }
        self.fansLis.fansAgeOptions = {
          title: {
            text: '粉丝年龄段分布',
            left: 'center'
          },
          color: ['#3398DB'],
          tooltip: {
            trigger: "axis",
            confine: true,
            formatter: function (params) {
              let tar = params[0];
              let value = (tar.value / 10000).toFixed(3);
              return tar.name + ' : ' + value + '万';
            }
          },
          xAxis: {
            type: 'category',
            data: xAxisData,
            axisLabel: {    //重点在这一块，其余可以忽略
              interval: 0,   //这个一定要有，别忘记了
              rotate: 0,
              textStyle: {
                color: '#000',
                fontSize: 12
              }
            },
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: formatNumber
            }
          },
          series: [{
            data: seriesData,
            type: 'bar'
          }]
        };
      },
      // 设置饼图参数
      setPieOptions(title,name,data,itemStyle){
        let self = this;
        let legendData = [];
        let seriesData = [];
        for (let item in data){
          let value;
          if(data[item] > 1){
            value = Number(data[item]).toFixed(3);
          }else {
            value = (data[item] * self.fansDataByMid.fans).toFixed(3);
          }

          legendData.push(item);
          seriesData.push({value: value, name: item});
        }
        let option = {
          title: {
            text: title,
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              let tar = params;
              let value = (tar.value / 10000).toFixed(3);
              return `${name}<br/>${tar.name} : ${value}万(${tar.percent})%`;
            }
          },
          legend: {
            left: 'center',
            bottom: 0,
            data: legendData
          },
          series: [
            {
              type: 'pie',
              radius: '55%',
              center: ['50%', '46%'],
              data: seriesData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              itemStyle: itemStyle,
            }
          ]
        };
        return option;
      },
      // 返回上一页
      goBack() {
        this.$router.go(-1);
        this.$cookies.set("writerMId",this.mid);
      },
      // 导航切换
      changeTab(){
        let self = this;
        if(self.tab == 0 ){
          self.isPause = false;
          self.isBarrage = true;
        }else {
          self.isPause = true;
          self.isBarrage = false;
        }
      },
    },
    mounted() {
      let self = this;
      self.mid = self.$route.query.mid * 1;
      self.getWriter();
      self.getAuthorData();
      self.getPreferKeyword();
      self.getVideoNumByMonth();
      self.getFansDataByMid();
      self.getChartData();
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
    color: #41ba47
  }
  .goUp{
    color: #f55345;
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
  .v-card__text{
    padding: 0 !important;
  }
  .text-left{
    text-align: left;
  }
  .mg-grade{
    font-size: 14px;
    font-weight: bold;
    color: #333 !important;
  }
  .user-official span{
    color: #8c8c8c;
  }
  .user-official{
    font-size: 14px;
    color: #333;
  }
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
  .worse i{
    background: url("../../assets/icon/worse.png") no-repeat;;
    background-size: 100% 100%;
  }
  .header-btn{
    color: #fff;
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
  .baberrage-box{
    position: relative;
    height: 400px;
  }
  .barrageStyle1{
    font-size: 12px;
  }
  .barrageStyle2{
    font-size: 22px;
  }
  .barrageStyle3{
    font-size: 32px;
  }
  .barrageStyle4{
    font-size: 20px;
  }
  /* 合作预估 */
  .forecast-box{
    padding: 32px 0 100px 0;
  }
  .forecast-box .row{
    margin: 0;
  }
  .forecast-form{
    font-size: 14px;
  }
  .forecast-form input,.forecast-form select{
    padding: 5px;
    display: inline-block;
    width: 180px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 14px;
    color: #666;
    outline: none;
  }
  .forecast-value{
    text-align: left;
    display: flex;
    justify-content: space-around;
  }
  .forecast-value .col-12{
    position: relative;
    padding-left: 110px;
    padding-right: 40px;
    border: 1px solid #ccc;
    border-radius: 10px;
    color: #fff;
    background-color: #706fd3;
  }
  /*.forecast-value .col:first-child{
    background-color: #5352ed;
  }
  .forecast-value .col:last-child{
    background-color: #ff6348;
  }*/

  .forecast-title{
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  .forecast-value .v-btn{
    position: absolute;
    top: 0;
    right: 0;
  }
  .v-tooltip__content{
    padding: 5px 10px;
    width: 180px;
  }
  /* 达人热词 */
  .showBarrage{
    position: relative;
    z-index: 1;
    opacity: 1;
  }
  .hideBarrage{
    position: absolute;
    z-index: -100;
    opacity: 0;
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
  @media screen and (max-width: 750px){
    .v-application ul{
      padding-left: 0;
    }
    .v-card__text{
      /*padding: 0;*/
    }
  }
</style>