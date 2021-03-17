<template>
  <div class="wrap">
    <v-row>
      <v-col cols="12" md="9">
        <v-tabs class="elevation-3 py-0 my-2" v-model="tab" show-arrows color="#f55345">
          <!--<v-tab>总体分布</v-tab>-->
          <v-tab>播放量</v-tab>
          <v-tab>弹幕数</v-tab>
          <v-tab>评论数</v-tab>
          <v-tab>互动数</v-tab>
        </v-tabs>
      </v-col>
      <v-col cols="12" md="3" class="d-flex align-center">
        <AVtime class="AVtime" :onlyShow="false" @setTime="setTime"></AVtime>
      </v-col>
    </v-row>
    <v-tabs-items v-model="tab">
      <!-- 播放量 -->
      <v-tab-item>
        <!--<AVchartTab v-if="views.isShow" :data="views"></AVchartTab>-->
        <AVchartTabPlay v-if="views.isShow || videoDetail.isShow" :data="views" :tableData="videoDetail.data" :overlay="videoDetail.overlay" @setViews="setViews" @setPage="setPage"></AVchartTabPlay>
        <noHave v-else=""></noHave>
      </v-tab-item>
      <!-- 弹幕数 -->
      <v-tab-item>
        <AVchartTab v-if="danmus.isShow" :data="danmus"></AVchartTab>
        <noHave v-else=""></noHave>
      </v-tab-item>
      <!-- 评论数 -->
      <v-tab-item>
        <AVchartTab v-if="comment.isShow" :data="comment"></AVchartTab>
        <noHave v-else=""></noHave>
      </v-tab-item>
      <!-- 互动数 -->
      <v-tab-item>
        <AVchartTab v-if="hudong.isShow" :data="hudong"></AVchartTab>
        <noHave v-else=""></noHave>
      </v-tab-item>
    </v-tabs-items>
  </div>

</template>

<script>
  import getBarChart from '@/charts/biliob-bar-chart.js'
  import { setNumber} from '../../utils/chatUtils';
  export default {
    name: "",
    components: {
      AVtime: () => import('@/components/analysisVideo/timeSelect'),
      AVchartTab: () => import('@/components/analysisVideo/chartTab'),
      AVchartTabPlay: () => import('@/components/analysisVideo/chartTabPlay'),
      AVtab: () => import('@/components/analysisVideo/tab'),
      noHave: () => import('@/components/noHave/noHave'),
    },
    data() {
      return {
        tab: '',
        timeTitle: '',
        time: {
          year: null,
          month: null
        },
        types: ['views','danmus', 'hudong', 'comment'],
        views: {
          apiUrl: '/api/video/getVideoViews',
          axis: {
            yName: '视频数量',
            xName: '总播放量',
          },
          chartTitle: ['一万以下播放量分布','一万以上播放量分布'],
          isShow: true,
          option: [],
          tab:{
            tbody: []
          }
        },
        danmus: {
          apiUrl: '/api/video/getVideoDanmus',
          axis: {
            yName: '视频数量',
            xName: '弹幕数',
          },
          chartTitle: '弹幕数分布',
          isShow: true,
          option: {},
          tab: {
            thead: [
              {
                name:'标题',
                value: 'title',
              },
              {
                name:'达人',
                value: 'name',
                phoneHide: true
              },
              {
                name:'弹幕数',
                value: 'num',
              },
              {
                name:'发布时间',
                value: 'date',
                phoneHide: true
              }
            ],
            tbody: [],
          },
          title: '弹幕数排行',
        },
        hudong: {
          apiUrl: '/api/video/getVideoHudong',
          axis: {
            yName: '视频数量',
            xName: '互动数',
          },
          chartTitle: '互动数分布',
          isShow: true,
          option: {},
          tab: {
            thead: [
              {
                name:'标题',
                value: 'title',
              },
              {
                name:'达人',
                value: 'name',
                phoneHide: true
              },
              {
                name:'互动数',
                value: 'num',
              },
              {
                name:'发布时间',
                value: 'date',
                phoneHide: true
              }
            ],
            tbody: [],
          },
          title: '互动数排行',
        },
        comment: {
          apiUrl: '/api/video/getVideoHudong',
          axis: {
            yName: '视频数量',
            xName: '评论数',
          },
          chartTitle: '评论数分布',
          isShow: true,
          option: {},
          tab: {
            thead: [
              {
                name:'标题',
                value: 'title',
              },
              {
                name:'达人',
                value: 'name',
                phoneHide: true
              },
              {
                name:'评论数',
                value: 'num',
              },
              {
                name:'发布时间',
                value: 'date',
                phoneHide: true
              }
            ],
            tbody: [],
          },
          title: '评论数排行',
        },
        videoDetail: {
          overlay: false,
          isShow: true,
          params: {
            current: 1,
            starttime: '',
            endtime: '',
            viewsMin: '',
            viewsMax: '',
          },
          data: {
            current: null,
            totalpage: null,
            title:  '播放量排行',
            tab: {
              thead: [
                {
                  name:'标题',
                  value: 'title',
                },
                {
                  name:'播放量',
                  value: 'view',
                },
                {
                  name:'发布时间',
                  value: 'datetime',
                  phoneHide: true
                }
              ],
              tbody: [],
            }
          }

        },
      }
    },
    watch: {
      time:{
        handler: function (val, oldVal) {
          let self = this;
          self.types.map(function (item) {
            let views = self.getViews(self[item], self.time, self.timeTitle);
            self[item].isShow = views.isShow;
            self[item].option = views.option;
            self[item].tab.tbody = views.tab.tbody;
          });
        },
        deep: true
      },
      newVideoDetail: function (val, oldVal) {
        this.videoDetail.overlay = true;
        this.getVideoDetail();
      }
    },
    computed: {
      newVideoDetail (){
        return `${this.videoDetail.params.endtime}-${this.videoDetail.params.viewsMin}-${this.videoDetail.params.current}`
      }
    },
    methods: {
      setTime (val){
        let self = this;
        self.videoDetail.params.current = 1;
        self.time = {
          year: val.year,
          month: val.month,
        };
        self.timeTitle = val.title;
        self.videoDetail.params.starttime = val.starttime;
        self.videoDetail.params.endtime = val.endtime;
      },
      setViews (val){
        let self = this;
        self.videoDetail.params.viewsMin = val.viewsMin;
        self.videoDetail.params.viewsMax = val.viewsMax;
      },
      setPage (val){
        this.videoDetail.params.current = val;
      },
      getViews (obj,time,timeTitle){
        let self = this;
        let md = 6;
        obj.option = obj.apiUrl == '/api/video/getVideoViews' ? [] : {};
        obj.tab.tbody = [];
        self.axios.get(obj.apiUrl, {params: time}).then(r => {
          let data = r.data;
          if(data.msg == 'success' && data.data && data.data.length){
            obj.isShow = true;
            obj.tab.tbody = data.top30;
            if(data.over1w){
              let chart1 = getBarChart(
                [{data: data.data, color: '#1e88e5', type: 'bar'}],
                `${obj.chartTitle[0]}(${timeTitle})`,
                { yAxisName: obj.axis.yName, xAxisName: obj.axis.xName}
              );
              let chart2 = getBarChart(
                [{data: data.over1w, color: '#1e88e5', type: 'bar'}],
                `${obj.chartTitle[1]}(${timeTitle})`,
                { yAxisName: obj.axis.yName, xAxisName: obj.axis.xName}
              );
              obj.option.push(chart1,chart2)
            }else {
              obj.option = getBarChart(
                [{data: data.data, color: '#1e88e5', type: 'bar'}],
                `${obj.chartTitle}(${timeTitle})`,
                { yAxisName: obj.axis.yName, xAxisName: obj.axis.xName}
              );
            }
          }else{
            obj.isShow = false;
          }
        });

        return {
          isShow: obj.isShow,
          option: obj.option,
          tab: {
            tbody: obj.tab.tbody
          },
        }
      },
      getVideoDetail (){
        let self = this;
        let params = self.videoDetail.params;
        self.axios.get('/api/video/countVideoDetail', {params: params}).then(r => {
          let data = r.data;
          this.videoDetail.overlay = false;
          if(data.success && data.data.data && data.data.data.length){
            self.videoDetail.isShow = true;
            self.videoDetail.data.tab.tbody = data.data.data;
            self.videoDetail.data.totalpage = data.data.totalpage;
            self.videoDetail.data.current = data.data.current;
          }else {
            self.videoDetail.isShow = false;
          }
        });
      },
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .wrap{
    padding-bottom: 20px;
  }
  .AVtime{
    width: 100%;
  }
  .table-title{
    font-size: 18px;
    color: #333;
    font-weight: bolder;
    text-align: center;
  }
</style>