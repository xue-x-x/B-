<template>
  <div class="wrap">
    <v-row>
      <v-col cols="12" md="9">
        <v-tabs class="elevation-3 py-0 my-2" v-model="tab" show-arrows color="#f55345">
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
    <v-tabs-items v-model="tab" >
      <!-- 播放量 -->
      <v-tab-item>
        <!--<AVchartTab v-if="views.isShow" :data="views"></AVchartTab>-->
        <AVchartTabPlay v-if="views.isShow" :data="views" :tableData="authorDetail.data" :overlay="authorDetail.overlay" @setViews="setViews" @setPage="setPage"></AVchartTabPlay>
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
        types: ['views','danmus','comment','hudong'],
        views: {
          apiUrl: '/api/author/getAuthorViews',
          axis: {
            yName: '达人数量',
            xName: '总播放量',
          },
          chartTitle: ['一万以下播放量分布','一万以上播放量分布'],
          isShow: true,
          option: [],
//          order: 'last',
          tab: {
            thead: [
              {
                name:'达人',
                value: 'name',
              },
              {
                name:'播放量',
                value: 'num',
              }
            ],
            tbody: [],
          },
          title: '播放量排行',
        },
        danmus: {
          apiUrl: '/api/author/getAuthoDanmus',
          axis: {
            yName: '达人数量',
            xName: '弹幕数',
          },
          chartTitle: '弹幕数分布',
          isShow: true,
          option: {},
          tab: {
            thead: [
              {
                name:'达人',
                value: 'name',
              },
              {
                name:'弹幕数',
                value: 'num',
              }
            ],
            tbody: [],
          },
          title: '弹幕数排行',
        },
        hudong: {
          apiUrl: '/api/author/getAuthorHudong',
          axis: {
            yName: '达人数量',
            xName: '互动数',
          },
          chartTitle: '互动数分布',
          isShow: true,
          option: {},
          tab: {
            thead: [
              {
                name:'达人',
                value: 'name',
              },
              {
                name:'互动数',
                value: 'num',
              }
            ],
            tbody: [],
          },
          title: '互动数排行',
        },
        comment: {
          apiUrl: '/api/author/getAuthorHudong',
          axis: {
            yName: '达人数量',
            xName: '评论数',
          },
          chartTitle: '评论数分布',
          isShow: true,
          option: {},
          tab: {
            thead: [
              {
                name:'达人',
                value: 'name',
              },
              {
                name:'评论数',
                value: 'num',
              }
            ],
            tbody: [],
          },
          title: '评论数排行',
        },
        authorDetail: {
          overlay: false,
          isShow: true,
          params: {
            current: 1,
            year: '',
            month: '',
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
                  name:'达人',
                  value: 'name',
                },
                {
                  name:'播放量',
                  value: 'view',
                },
              ],
              tbody: [],
            }
          }

        },
      }
    },
    watch: {
      time:{
        handler(val,oldVal){
          let self = this;
          self.types.map(function (item) {
            let views = self.getViews(self[item], self.time, self.timeTitle);
            self[item].isShow = views.isShow;
            self[item].option = views.option;
            self[item].tab.tbody = views.tab.tbody;
          })
        },
        deep: true
      },
      newAuthorDetail: function (val, oldVal) {
        this.authorDetail.overlay = true;
        this.getAuthorDetail();
      }
    },
    computed: {
      newAuthorDetail (){
        return `${this.authorDetail.params.month}-${this.authorDetail.params.viewsMin}-${this.authorDetail.params.current}`
      }
    },
    methods: {
      setTime (val){
        let self = this;
        self.authorDetail.params.current = 1;
        let time = {
          year: val.year,
          month: val.month,
        };
        self.time = time;
        self.timeTitle = val.title;
        self.authorDetail.params.year = val.year;
        self.authorDetail.params.month = val.month;
      },
      setViews (val){
        let self = this;
        self.authorDetail.params.viewsMin = val.viewsMin;
        self.authorDetail.params.viewsMax = val.viewsMax;
      },
      setPage (val){
        this.authorDetail.params.current = val;
      },
      getViews (obj,time,timeTitle){
        let self = this;
        let md = 6;
        obj.option = obj.apiUrl == '/api/author/getAuthorViews' ? [] : {};
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
      getAuthorDetail (){
        let self = this;
        let params = self.authorDetail.params;
        self.axios.get('/api/author/countAuthorDetail', {params: params}).then(r => {
          let data = r.data;
          this.authorDetail.overlay = false;
          if(data.success && data.data.data && data.data.data.length){
            self.authorDetail.isShow = true;
            self.authorDetail.data.tab.tbody = data.data.data;
            self.authorDetail.data.totalpage = data.data.totalpage;
            self.authorDetail.data.current = data.data.current;
          }else {
            self.authorDetail.isShow = false;
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
</style>