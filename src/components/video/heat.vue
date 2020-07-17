<template>
  <div>
    <v-card>
      <v-row>
        <v-col cols="12" md="9">
          <v-card>
            <v-card-text>
              <Chart
                      class="mb-2"
                      title=""
                      :options="view7backOption"
                      style="width: 100%"
              />
            </v-card-text>
          </v-card>

        </v-col>
        <v-col cols="12" md="3">
          <v-card class="d-flex align-center justify-center lest-card">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon class="icon-help">help</v-icon>
                </v-btn>
              </template>
              <span>
                根据达人历史视频表现及同类型产品的视频表现，并通过大数据分析得出，
                该指数代表视频发布时的热度等级，不会随着发布时间的推移而衰减。
              </span>
            </v-tooltip>
            <div>
              视频热度指数：123654
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-card>
      <v-row>
        <v-col cols="12" md="9">
          <v-card>
            <v-card-text>
              <Chart
                      class="mb-2"
                      title=""
                      :options="view7foreOption"
                      style="width: 100%"
              />
            </v-card-text>
          </v-card>

        </v-col>
        <v-col cols="12" md="3">
          <v-card class="d-flex align-center justify-center lest-card">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon class="icon-help">help</v-icon>
                </v-btn>
              </template>
              <span>
                根据视频周期时间内的点赞数、弹幕数、分享数、收藏数等数据并通过大数据分析得出，
                该指数代表视频后续的数据增长潜力，会随着发布时间的推移而衰减。
              </span>
            </v-tooltip>
            <div>
              视频潜力指数：123654
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
  import getMultiChartOptions from "@/charts/biliob-multi-line-chart.js";
  import { setNumber} from '../../utils/chatUtils';
  export default {
    name: "",
    props:{
      aid: {
        type: Number,
        default: 0,
      },

    },
    data() {
      return {
        view7backOption:{},
        view7foreOption:{},
      }
    },
    watch:{
      aid(){
        this.getHotData();
      },
    },
    methods: {
      getHotData () {
        let self = this;
        self.axios.get(`/api/video/${self.aid}/getHotData`).then(r => {
          let data = r.data;
          let viewback = [];
          let viewfore = [];
          console.log(data);
          if(data.msg == 'success'){
              for(let item in data.data.view7back){
                viewback.push([item, data.data.view7back[item]]);
              }
              for(let item in data.data.view7fore){
                viewfore.push([item, data.data.view7fore[item]]);
              }
              self.view7backOption = getMultiChartOptions([[viewback, "", "#1e88e5"]],"前7日单日播放量变化");
              self.view7foreOption = getMultiChartOptions([[viewfore, "", "#1e88e5"]],"近7日单日播放量变化");
          }
        });
      },
    },
    mounted(){
      this.aid && this.getHotData();
    },

  }
</script>

<style scoped>
  .lest-card{
    position: relative;
    height: 100%;
    min-height: 100px;
  }
  .lest-card .v-btn{
    position: absolute;
    top: 0;
    right: 0;
  }
  .v-tooltip__content{
    padding: 5px 10px;
    width: 180px;
  }
</style>