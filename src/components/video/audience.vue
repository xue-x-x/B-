<template>
  <div>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-1 pa-md-4">
          <div>
            <v-card-text>
              <Chart
                      class="mb-2"
                      :options="hotWordsOption"
                      style="width: 100%"
              />
            </v-card-text>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-1 pa-md-4">
          <div>
            <v-card-text>
              <Chart
                      class="mb-2"
                      :options="ageOption"
                      style="width: 100%"
              />
            </v-card-text>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-1 pa-md-4">
          <v-card-text>
            <Chart
                    class="mb-2"
                    :options="regionOption"
                    style="width: 100%"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-1 pa-md-4">
          <v-card-text>
            <Chart
                    class="mb-2"
                    :options="sexOption"
                    style="width: 100%"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>

</template>

<script>
  import formatNumber from "@/utils/format-number";
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
        ageOption: {},
        hotWordsOption: {},
        regionOption: {},
        sexOption: {},
      }
    },
    watch:{
      aid(){
        this.getViewer();
      },
    },
    methods: {
      getViewer () {
        let self = this;
        let age = {
          title: "观众年龄区间图",
          isPercent: true,
          xAxisData: [],
          seriesData: [],
        };
        let hotWords = {
          title: "评论热词TOP10",
          isPercent: false,
          xAxisData: [],
          seriesData: [],
        };
        let region = {
          title: '观众地域分布',
          name: '地域分布',
          data: {},
          optionName: 'fansGenderOptions',
          itemStyle: {},
        };
        let sex = {
          title: '观众男女比例',
          name: '男女比例',
          data: {},
          optionName: 'fansGenderOptions',
          itemStyle: {},
        };
        self.axios.get(`/api/video/${self.aid}/getViewer`).then(r => {
          let data = r.data;
          console.log(data);
          if(data.msg == 'success'){
            for(let index in data.age){
              age.xAxisData.push(index);
              age.seriesData.push(data.age[index] * 100);
            }
            for(let index in data.hotWords){
              hotWords.xAxisData.push(index);
              hotWords.seriesData.push(data.hotWords[index]);
            }
            region.data = data.region;
            sex.data = data.sex;
            console.log(hotWords);
            self.ageOption = self.setBarOpton(age);
            self.hotWordsOption = self.setBarOpton(hotWords);
            self.regionOption = self.setPieOptions(region.title,region.name,region.data,region.itemStyle);
            self.sexOption = self.setPieOptions(sex.title,sex.name,sex.data,sex.itemStyle);
          }
        });
      },
      setBarOpton(n) {
        let formatter = n.isPercent ? '{value}%' : '{value}';
        let option = {
          title: {
            text: n.title,
            left: 'center'
          },
          color: ['#3398DB'],
          tooltip: {
            trigger: "axis",
            confine: true,
            formatter: function (params) {
              let tar = params[0];
              if(n.isPercent){
                return tar.name + ' : ' + tar.value.toFixed(3) + '%';
              }else {
                return tar.name + ' : ' + tar.value;
              }

            }
          },
          xAxis: {
            type: 'category',
            data: n.xAxisData,
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
              formatter: formatter
            }
          },
          series: [{
            data: n.seriesData,
            type: 'bar'
          }]
        };
        return option;
      },
      setPieOptions(title,name,data,itemStyle){
        let self = this;
        let legendData = [];
        let seriesData = [];
        for (let item in data){
          let value;
          if(data[item] > 1){
            value = Number(data[item]).toFixed(3);
          }else {
            value = (data[item] * 100).toFixed(3);
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
              let value;
              if(title == '观众地域分布'){
                value = (tar.value / 1).toFixed(3);
                return `${name}<br/>${tar.name} : ${value}%`;
              }else {
                value = (tar.value / 1);
                return `${name}<br/>${tar.name} : ${value}`;
              }

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
    },
    mounted(){
      this.aid && this.getViewer();
    }
  }
</script>

<style scoped>

</style>