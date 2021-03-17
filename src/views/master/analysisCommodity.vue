<template>
  <div class="wrap">
    <v-row>
      <v-col cols="12" md="9">
        <v-tabs class="elevation-3 py-0 my-2" v-model="tab" show-arrows color="#f55345">
          <v-tab>品牌视频</v-tab>
          <v-tab>热门产品</v-tab>
        </v-tabs>
      </v-col>
      <v-col cols="12" md="3" class="d-flex align-center">
        <AVtime class="AVtime" :onlyShow="true" @setTime="setTime"></AVtime>
      </v-col>
    </v-row>
    <v-tabs-items v-model="tab">
      <!-- 品牌视频 -->
      <v-tab-item>
        <v-row v-if="video.isShow" justify="center">
          <v-col cols="12" md="6" v-if="JSON.stringify(video.countOptions) != '{}'">
            <v-card>
              <v-card-text>
                <Chart
                        class="mb-2"
                        :autoresize="true"
                        :options="video.countOptions"
                        style="width: 100%;height: 400px"
                />

              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6" v-if="JSON.stringify(video.sumOptions) != '{}'">
            <v-card>
              <v-card-text>
                <Chart
                        class="mb-2"
                        :autoresize="true"
                        :options="video.sumOptions"
                        style="width: 100%;height: 400px"
                />

              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="12" v-if="video.tab.tbody && video.tab.tbody.length">
            <v-card>
              <v-card-text>
                <AVtab :tab="video.tab"></AVtab>
              </v-card-text>
            </v-card>

          </v-col>
        </v-row>
        <noHave v-else=""></noHave>
      </v-tab-item>
      <!-- 热门产品 -->
      <v-tab-item>
        <v-row v-if="product.isShow">
          <v-col cols="12">
            <v-card>
              <v-card-text>
                <Chart
                        class="mb-2"
                        :autoresize="true"
                        :options="product.options"
                        style="width: 100%;height: 400px"
                />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-text>
                <p class="table-title">产品指数</p>
                <v-data-table
                        :headers="product.tab.thead"
                        :items="product.tab.tbody"
                        :loader-height="10"
                        item-key="name"
                        hide-default-footer
                        class="table"
                >
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <noHave v-else=""></noHave>
      </v-tab-item>
    </v-tabs-items>

  </div>
</template>

<script>
  import setPieOptions from '@/charts/biliob-pie-chart.js'
  import { setNumber} from '../../utils/chatUtils';
  export default {
    name: "",
    components: {
      AVtime: () => import('@/components/analysisVideo/timeSelect'),
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
        video: {
          isShow: true,
          count: {
            title: '品牌视频数量占比',
            name: '视频数量',
            data: [],
            itemStyle: {},
            labelShow: true,
          },
          countOptions: {},
          sum: {
            title: '品牌视频播放量占比',
            name: '视频播放量',
            data: [],
            itemStyle: {},
            labelShow: true,
          },
          sumOptions: {},
          tab: {
            thead: [
              {
                name: '品牌名称',
                value: 'pinpai',
              },
              {
                name: '视频数量',
                value: 'count',
                phoneHide: true
              },
              {
                name: '视频数量>1w',
                value: 'count10k',
                phoneHide: true
              }, {
                name: '视频播放量',
                value: 'viewsum'
              },
              {
                name: '视频播放量>1w',
                value: 'viewsum10k'
              },
            ],
            tbody: [],
          },
        },
        product: {
          isShow: true,
          color: ['#f3a683', '#f7d794', '#778beb', '#e77f67', '#cf6a87', '#786fa6', '#f8a5c2', '#63cdda', '#ea8685', '#596275'],
//          color: ['#FFC312', '#C4E538', '#12CBC4', '#FDA7DF', '#ED4C67', '#EE5A24', '#009432', '#0652DD', '#9980FA', '#833471'],
          options: {},
          tab: {
            thead: [],
            tbody: [],
          },
        }
      }
    },
    watch: {
      time:{
        handler: function (val, oldVal) {
          let self = this;
          self.getPinPaiCount();
          self.getProductCount();
        },
        deep: true
      }
    },
    computed: {},
    methods: {
      setTime (val){
        let self = this;
        self.time = {
          year: val.year,
          month: val.month,
        };
      },
      setNumber (n){
        let val = setNumber(n);
        return val;
      },
      getPinPaiCount (){
        let self = this;
        self.video.count.data = [];
        self.video.sum.data = [];
        self.video.tab.tbody = [];
        self.axios.get('/api/author/getPinPaiCount', {params: self.time}).then(r => {
          let data = r.data;
          if(data.msg == 'success' && data.data && data.data.length){
            self.video.isShow = true;
            data.data.forEach(function (item) {
              self.video.count.data.push({name: item.pinpai, value: item.count});
              self.video.sum.data.push({name: item.pinpai, value: item.viewsum});
              self.video.tab.tbody.push(item);
            });
            self.video.countOptions = setPieOptions(self.video.count, false);
            self.video.sumOptions = setPieOptions(self.video.sum, false);
          }else{
            self.video.isShow = false;
          }
        });
      },
      getProductCount (){
        let self = this;
        let fistTh = {
          text: '产品名称',
          align: 'start',
          sortable: false,
          value: 'name',
        };
        self.product.tab.thead = [];
        self.product.tab.thead.push(fistTh);
        self.axios.get('/api/author/getProductCount', {params: self.time}).then(r => {
          let data = r.data;
          if(data.msg == 'success' && data.data && data.data.length){
            self.product.isShow = true;
            self.product.options = self.setLineOptions(data.data,{yAxisName: '指数'});
            data.data.forEach(function (item,index) {
              let dessert = {};
              item.data.forEach(function (val) {
                dessert['name'] = item.product;
                dessert[`${val.createtime.replace('-','')}`] = val.qindex;
              });
              self.product.tab.tbody[index] = dessert;
            });
            data.time.forEach(function (item) {
              self.product.tab.thead.push({text: item, value: item.replace('-','')});
            });
          }else{
            self.product.isShow = false;
          }
        });
      },
      setLineOptions (data, axisName, type = "line"){
        let self = this;
        let legendData = [];
        let xAxisData = [];
        let series = data.map(e => {
          let dataData = [];
          xAxisData = [];
          if(e.data !== undefined){
            e.data.map(item => {
              xAxisData.push(item.createtime);
              dataData.push(item.qindex);
            });
          }
          legendData.push(e.product);
          let data = {
            name: e.product,
            data: dataData,
            type: type,
            smooth: true,
            showSymbol: false,
          };
          return data;
        });
        let Chart =  {
          tooltip: {
            trigger: 'axis',
          },
          color: self.product.color,
          legend: {
            data: legendData
          },
          grid: {
            left: self.isMobile() ? '6%': '3%',
            right: '4%',
            top: self.isMobile() ? '23%': '13%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxisData,
          },
          yAxis: {
            type: 'value',
            name: axisName && axisName.yAxisName ? axisName.yAxisName : '',
            nameLocation: 'middle',
            nameGap: 45,
          },
          series: series
        };
        return Chart;
      },
      isMobile() {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .wrap{
    padding-bottom: 20px;
  }
  .table-title{
    font-size: 18px;
    color: #333;
    font-weight: bolder;
    text-align: center;
  }
  .AVtime{
    width: 100%;
  }
  .table{
    border: 1px solid #ccc;
  }
  .table >>> th,.table >>> td{
    line-height: 48px;
    font-size: 14px;
  }
</style>