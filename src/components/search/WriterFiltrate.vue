<template>
  <div class="wrap mt-10">
    <div class="fans-number filter-list clearfix">
      <div class="fl filter-title text-left">粉丝数：</div>
      <div class="fl filter-label">
        <ul class="d-flex justify-space-around">
          <li class="filter-label-li" :class="{'active':item.active}" v-for="(item,index) in filterList" :key="index" @click="changeFilter(item,index)">{{item.name}}</li>
        </ul>
      </div>
      <div class="fr filter-manual">
        <div>
          <span class="filter-manual-input filter-manual-span text-left" @click="setManualShow('least')">{{leastText}}</span>
          <span>-</span>
          <span class="filter-manual-input filter-manual-span text-left" @click="setManualShow('maximum')">{{maximumText}}</span>
        </div>
        <div class="filter-manual-hidden" :class="{'filter-manual-show':manualShow}">
          <div>
            <input class="filter-manual-input least" ref="least" type="text" v-model="leastValue" @input="setLeastValue" placeholder="最小值">
            <span>-</span>
            <input class="filter-manual-input maximum" ref="maximum" type="text" v-model="maximumValue" @input="setMaximumValue" placeholder="最大值">
          </div>
          <div class="filter-manual-error" :class="{'filter-manual-error-show':errorShow}">输入范围有误</div>
          <div class="filter-manual-btn d-flex justify-space-around">
            <div class="btn text-center" @click="reset">重置</div>
            <div class="btn btn-confirm text-center" @click="confirm">确定</div>
          </div>
        </div>
        <div v-if="manualShow" class="filter-manual-pop" @click="closeInput"></div>
      </div>
    </div>
    <div class="filter-list clearfix">
      <div class="fl filter-title text-left">分类：</div>
      <div class="fl classify-list">
        <ul class="d-flex flex-wrap">
          <li :class="{'filter-list-li-active':item.active}" v-for="(item,index) in channels" :key="index" @click="changeClassify(item,index)">
            <v-chip
                  class="ma-2"
            >
              {{item.name}}
            </v-chip>
          </li>
        </ul>
      </div>
    </div>
    <div class="filter-list clearfix">
      <div class="fl filter-title text-left">排序选项：</div>
      <div class="fl">
        <v-chip
                v-for="(item,index) in otherOptions"
                :key="index"
                class="ma-2"
                :color="item.active ? '#f55345' : '#f2f2f2'"
                :text-color="item.active ? 'white' : ''"
                @click="changOtherOptions(item,index)"
        >
          <v-icon left>{{item.icon}}</v-icon>
          {{item.name}}
        </v-chip>
      </div>
    </div>
    <div class="filter-list clearfix">
      <div class="fl filter-title text-left">
        价值权重：
        <p>(权重总值为10)</p>
      </div>
      <div class="fl">
        <ul class="clearfix">
          <li class="fl value-analysis-classify" v-for="(item,index) in valueAnalysisClassify" :key="index">
            <input type="number" v-model="item.value" max="10" min="0" @input="setValueAnalysisValue()">
            <p>{{item.name}}</p>
          </li>
          <li class="fl ml-4">
            <v-tooltip v-model="show" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="ma-1" rounded color="#f55345" style="color: #fff" @click="changeValueAnalysis()">（总值：{{valueAnalysisValue}}）确定</v-btn>
              </template>
              <span>请设置正确的权重</span>
            </v-tooltip>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        value:'视频',
        filterList:[
          {
            active: true,
            name:'全部',
            least: 0,
            maximum: 0,
          },
          {
            active: false,
            name:'1万-5万',
            least: 10000,
            maximum: 50000,
          },
          {
            active: false,
            name:'5万-10万',
            least: 50000,
            maximum: 100000,
          },
          {
            active: false,
            name:'10万-20万',
            least: 100000,
            maximum: 200000,
          },
          {
            active: false,
            name:'20万-50万',
            least: 200000,
            maximum: 500000,
          },
          {
            active: false,
            name:'50万-100万',
            least: 500000,
            maximum: 1000000,
          },
          {
            active: false,
            name:'100万+',
            least: null,
            maximum: null,
          },
        ],
        leastText: '最小值',
        maximumText: '最大值',
        manualShow: false,
        errorShow: false,
        leastValue: null,
        maximumValue: null,
        otherOptions: [
          {
            value: 0,
            active: true,
            icon: 'mdi-account-heart',
            name: '粉丝总量',
          },
          {
            value: 1,
            active: false,
            icon: 'mdi-play-circle-outline',
            name: '播放总量',
          },
          {
            value: 2,
            active: false,
            icon: 'mdi-thumb-up-outline',
            name: '点赞总量',
          },
          {
            value: 3,
            active: false,
            icon: 'mdi-account-multiple-plus',
            name: '涨粉总量',
          },
          {
            value: 4,
            active: false,
            icon: 'mdi-account-multiple-minus',
            name: '掉粉总量',
          },
        ],
        valueAnalysisValue: 0,
        valueAnalysisClassify: [
          {
            name: "影响力",
            items: [1,2,3,4,5],
            type: "effect",
            value:0,
          },
          {
            name: "互动性",
            items: [1,2,3,4,5],
            type: "interact",
            value:0,
          },
          {
            name: "专业度",
            items: [1,2,3,4,5],
            type: "profession",
            value:0,
          },
          {
            name: "表现力",
            items: [1,2,3,4,5],
            type: "show",
            value:0,
          },
          {
            name: "性价比",
            items: [1,2,3,4,5],
            type: "cost",
            value:0,
          },
        ],
        valueAnalysisTitle: "",
        show: false,
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      }
    },
    computed:{
      channels() {
        if (this.$store.state.channels == undefined) {
          return {};
        }
        return this.$store.state.channels;
      },
    },
    methods: {
      /* 设置粉丝数值 */
      setManualShow (text) {
        let self = this;
        self.manualShow = true;
        text == 'least' ? this.$refs.least.focus() : this.$refs.maximum.focus()

      },
      /* 关闭粉丝数值输入 */
      closeInput () {
        this.manualShow = false;
      },
      /* 重置粉丝数 */
      reset () {
        this.leastValue = null;
        this.maximumValue = null;
        this.manualShow = false;
        let value = {
          type:'number',
          key:['max','min'],
          value: [0,0]
        };
        this.$emit('setParamsData', value);
      },
      /* 确定粉丝数范围 */
      confirm () {
        let self = this;
        var reg = /(^[1-9]\d*$)/;
        if (self.leastValue > self.maximumValue || self.leastValue == null || self.maximumValue == null) {
          self.errorShow = true;
          return false;
        }
        self.errorShow = false;
        self.leastText = self.leastValue;
        self.maximumText = self.maximumValue;
        self.manualShow = false;
        let value = {
          type:'number',
          key:['max','min'],
          value: [self.maximumValue,self.leastValue]
        };
        this.$emit('setParamsData', value);
      },
      /* 粉丝数筛选 */
      changeFilter (item,index) {
        let self = this;
        let arrIndex = index;
        let value = {
          type:'number',
          key:['max','min'],
          value: [item.maximum,item.least]
        };
        this.$emit('setParamsData', value);
        self.filterList.forEach(function(val){
          val.active = false;
        });
        self.filterList[arrIndex].active = true;
      },
      /* 分类筛选 */
      changeClassify (item,index) {
        let self = this;
        let value = {
          type:'channel',
          key:'channel',
          value: item.name
        };
        this.$emit('setParamsData', value);
        self.channels.forEach(function(val){
          val.active = false;
        });
        self.channels[index].active = true;
      },
      /* 排序选项筛选 */
      changOtherOptions (item,index) {
        let self = this;
        let value = {
          type:'sort',
          key:'sort',
          value: item.value
        };
        this.$emit('setParamsData', value);
        self.otherOptions.forEach(function(val){
          val.active = false;
        });
        self.otherOptions[index].active = true;
      },
      /* 价值分析筛选 */
      changeValueAnalysis (){
        let self = this;
        let key = [];
        let valueArr = [];
        if(self.valueAnalysisValue > 10 || self.valueAnalysisValue < 10){
          self.show = true;
          return
        }
        self.valueAnalysisClassify.forEach(function (item) {
          key.push(item.type);
          valueArr.push(item.value);
        });
        let value = {
          type:'value',
          key: key,
          value: valueArr
        };
        this.$emit('setParamsData', value);
      },
      setValueAnalysisValue (){
        let self = this;
        self.valueAnalysisValue = 0;
        self.show = false;
        self.valueAnalysisClassify.forEach(function (item) {
          self.valueAnalysisValue += item.value * 1;
        })
      },
      /* 设置粉丝数最小值 */
      setLeastValue () {
        let self = this;
        var reg = /(^[1-9]\d*$)/;
        if (!reg.test(self.leastValue) || self.leastValue < 0) {
          self.leastValue = null;
          return false;
        }
      },
      /* 设置粉丝数最大值 */
      setMaximumValue () {
        let self = this;
        var reg = /(^[1-9]\d*$)/;
        if (!reg.test(self.maximumValue) || self.maximumValue < 0) {
          self.maximumValue = null;
          return false;
        }
      },

    },
    mounted (){
      let self =this;
      if (self.$store.state.channels == undefined) {
        self.$store.dispatch("getChannels");
      }
    }
  }
</script>

<style scoped>
  .v-application ul{
    padding: 0;
  }
  .filter-list{
    padding: 15px 0;
    border-bottom: 1px dashed #e9e9e9;
    text-align: left;
  }
  .filter-title{
    width: 100px;
  }
  .filter-title p{
    font-size: 12px;
    color: #f55345;
  }
  .filter-label{
    width: 60%;
  }
  .filter-label-li{
    padding: 2px 8px;
    line-height: 22px;
    font-size: 14px;
    color: #666;
    cursor: pointer;
    border-radius: 4px;
  }
  .active{
    background-color: #f55345;
    color: #fff;
  }
  .filter-manual{
    position: relative;
  }
  .filter-manual-hidden{
    position: absolute;
    left: -16px;
    top: -16px;
    z-index: -1;
    opacity: 0;
    padding: 16px;
    width: calc(100% + 32px);
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0,0,0,.2);
  }
  .filter-manual-show{
    z-index: 10;
    opacity: 1;
  }
  .filter-manual-pop{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0);
  }
  .filter-manual-span:hover{
    border: 1px solid #f55345;
    color: #f55345;
    cursor: pointer;
  }
  .filter-manual-input{
    padding-left: 8px;
    display: inline-block;
    width: 88px;
    height: 32px;
    line-height: 32px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    color: #666;
    cursor: text;

  }
  .filter-manual-error{
    opacity: 0;
    font-size: 12px;
    color: #f55345;
    line-height: 16px;
  }
  .filter-manual-error-show{
    opacity: 1;
  }
  .filter-manual-btn .btn{
    width: 88px;
    border: none;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
  }
  .filter-manual-btn .btn.btn-confirm{
    color: #fff;
    background-color: #f55345;
    margin-left: 10px;
  }
  .classify-list{
    width: calc(100% - 144px);
  }
  .v-application .ma-2{
    margin: 0 8px 8px !important;
  }
  .filter-list-li-active .theme--light.v-chip:not(.v-chip--active){
    background-color: #f55345;
    color: #fff;
  }
  .value-select{
    margin: 0 8px;
    width: 100px;
    font-size: 14px;
    border-radius: 24px;
  }
  .v-select__slot{
    font-size: 14px !important;
  }
  .value-analysis-classify{
    margin: 0 8px 8px;
    width: 80px;
    text-align: center;
  }
  .value-analysis-classify input{
    padding-left: 20px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 13px;
  }
  .value-analysis-classify input:focus{
    border: 1px solid #f55345;
    outline: 0;
    box-shadow: 0 0 3px 0 #f55345;
    -webkit-box-shadow: 0 0 3px 0 #f55345;
  }
  .value-analysis-classify p{
    margin-top: 5px;
    font-size: 14px;
  }
</style>