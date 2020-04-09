<template>
  <div class="wrap">
    <div class="section-title">{{title}}</div>
    <div class="mb-4">
      <ul class="d-flex flex-wrap justify-start justify-xl-center justify-lg-center justify-md-center justify-sm-center">
        <li
              class="antistop-list-li mb-2 mr-2 mr-xl-5 mr-lg-5 mr-md-4 mr-sm-4"
              :class="{'antistop-list-li-active':item.active}"
              v-for="(item,index) in antistopList"
              :key="index"
              @click="changeAntistop(item,index)"
        >
          {{item.name}}
        </li>
      </ul>
    </div>
    <div style="position: relative">
      <biliob-detail-charts :options="options"></biliob-detail-charts>

      <v-overlay absolute :value="overlay" color="#fff" opacity="0.3">
        <v-progress-circular indeterminate size="64" color="#f55345"></v-progress-circular>
      </v-overlay>
    </div>

  </div>
</template>

<script>
  import getOptions from "../../charts/cloud-charts.js";
  export default {
    name: "",
    components: {
      BiliobDetailCharts: () => import('@/components/biliob/DetailCharts'),
    },
    props: {
      title: {
        type: String,
        default: function() {
          return "";
        }
      },
    },
    data() {
      return {
        options:{},
        siteGroupInfo: undefined,
        List: ['全部','科技','数码','生活','音乐','娱乐','游戏',' 动画','影视','鬼畜','舞蹈','国创','时尚','纪录片',],
        antistopList: [
          {active: true,name:'全部' },
          {active: false,name:'科技' },
          {active: false,name:'数码' },
          {active: false,name:'生活' },
          {active: false,name:'音乐' },
          {active: false,name:'娱乐' },
          {active: false,name:'游戏' },
          {active: false,name:'动画' },
          {active: false,name:'影视' },
          {active: false,name:'鬼畜' },
          {active: false,name:'舞蹈' },
          {active: false,name:'国创' },
          {active: false,name:'时尚' },
          {active: false,name:'纪录片' },
        ],
        paramsData:{
          channel: ''
        },
        overlay: false
      };
    },
    methods: {
      getoptions () {
        let self = this;
        self.axios.get(`/api/site/prefer-keyword`,{
          params: self.paramsData
        }).then(r => {
          self.overlay = false;
          let data = r.data.data;
          let Array = [];
          for (var item in data){
            Array.push({ name: item, value: data[item] });
          }
          if(JSON.stringify(data) =="{}"){
            Array.push({ name: '暂无数据', value: 0 });
          }
          self.options = getOptions(Array);
        });
      },
      changeAntistop (item,index) {
        let self = this;
        self.paramsData.channel = item.name == '全部' ? '' : item.name;
        self.getoptions();
        self.overlay = true;
        self.antistopList.forEach(function(val){
          val.active = false;
        });
        self.antistopList[index].active = true;
      }
    },
    mounted() {
      let self = this;
      self.getoptions();
    }
  }
</script>

<style scoped>
  .antistop-list-li{
    font-size: 14px;
    color: #1e88e5;
    cursor: pointer;
  }
  .antistop-list-li-active{
    color: #f55345;
  }

</style>