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
                根据达人历史视频表现及同类型产品的视频表现，并通过大数据分析得出，
                该指数代表视频发布时的热度等级，不会随着发布时间的推移而衰减。
              </span>
            </v-tooltip>
            <v-card-text>
              <Chart
                      class="mb-2"
                      title=""
                      :options="reduOption"
                      style="width: 100%"
              />
            </v-card-text>
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
                根据视频周期时间内的点赞数、弹幕数、分享数、收藏数等数据并通过大数据分析得出，
                该指数代表视频后续的数据增长潜力，会随着发布时间的推移而衰减。
              </span>
            </v-tooltip>
            <v-card-text>
              <Chart
                      class="mb-2"
                      title=""
                      :options="qianliOption"
                      style="width: 100%"
              />
            </v-card-text>
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
        hotData: {},
        view7backOption:{},
        view7foreOption:{},
        reduOption: {},
        qianliOption: {},
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
          if(data.msg == 'success'){
              self.hotData = data.data;
              for(let item in data.data.view7back){
                viewback.push([item, data.data.view7back[item]]);
              }
              for(let item in data.data.view7fore){
                viewfore.push([item, data.data.view7fore[item]]);
              }
              self.view7backOption = getMultiChartOptions([[viewback, "", "#1e88e5"]],"近7日单日播放量变化");
              self.view7foreOption = getMultiChartOptions([[viewfore, "", "#1e88e5"]],"前7日单日播放量变化");
              self.reduOption = self.setGauge(data.data.redu,'视频热度指数');
              self.qianliOption = self.setGauge(data.data.qianli,'视频潜力指数');
              console.log(self.reduOption);
          }
        });
      },
      setGauge (value,subtext) {
        let option = {
          title: {
            text: `${value}分`,
            subtext: subtext,
            left: 'center',
            top: 'center', //top待调整
            textStyle: {
              color: '#fff',
              fontSize: 18,
              fontFamily: 'DINAlternate-Bold',
              lineHeight: 30,
            },
            subtextStyle: {
              color: '#fff',
              fontSize: 14,
              fontFamily: 'PingFangSC-Regular',
              top: 'center'
            },
            itemGap: -10 //主副标题间距
          },
          xAxis: {
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisLine: {
              show: false
            }
          },
          yAxis: {
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisLine: {
              show: false
            }
          },
          series: [
            // 内圆
            {
              type: 'pie',
              radius: ['0', '50%'],
              center: ['50%', '50%'],
              z: 0,
              hoverOffset: 2,
              itemStyle: {
                normal: {
                  color: '#1867c0',
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  }
                },
              },
              label: {
                normal: {
                  position: "center",

                }
              },
              data: [100],
            },
            // 进度圈
            {
              type: 'pie',
              clockWise: true,
              radius: ["70%", "65%"],
              hoverOffset: 2,
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              data: [{
                value: value,
                itemStyle: {
                  normal: {
                    borderWidth: 10,
                    borderColor: {
                      colorStops: [{
                        offset: 0,
                        color: '#7940FE' || '#00cefc' // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: '#2A69EC' || '#367bec' // 100% 处的颜色
                      }]
                    },
                    color: { // 完成的圆环的颜色
                      colorStops: [{
                        offset: 0,
                        color: '#7940FE' || '#00cefc' // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: '#2A69EC' || '#367bec' // 100% 处的颜色
                      }]
                    },

                  },
                }
              },
                {
                  name: 'gap',
                  value: 100 - value,
                  itemStyle: {
                    normal: {
                      label: {
                        show: false
                      },
                      labelLine: {
                        show: false
                      },
                      color: 'rgba(0, 0, 0, 0)',
                      borderColor: 'rgba(0, 0, 0, 0)',
                      borderWidth: 0,
                    }
                  },
                }
              ]
            },
            //刻度尺
            {
              // name: "白色圈刻度",
              type: "gauge",
              radius: "96%",
              startAngle: 225, //刻度起始
              endAngle: -134.8, //刻度结束
              z: 4,
              axisTick: {
                show: true,
                lineStyle: {
                  width: 2,
                  color: 'rgba(1,244,255, 0.9)'
                }
              },
              splitLine: {
                length: 14, //刻度节点线长度
                lineStyle: {
                  width: 2,
                  color: 'rgba(1,244,255, 0.9)'
                } //刻度节点线
              },
              axisLabel: {
                color: 'rgba(255,255,255,0)',
                fontSize: 12,
              }, //刻度节点文字颜色
              pointer: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  opacity: 0
                }
              },
              detail: {
                show: false
              },
              data: [{
                value: 0,
                name: ""
              }]
            },
          ]
        };

        return option;
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