<template>
  <div id="versus">
    <section>
      <v-container class="wrap">
        <v-row>
          <v-col col="3" sm="5">
            <div class="fs_14 color-6">粉丝数</div>
            <div class="comparison-writer-fans">
              <odometer :value="writerA.fans"></odometer>
            </div>
            <v-avatar class="writer-face" size="100px" @click="setOverlay('A')">
              <img :src="writerA.face" alt="John">
            </v-avatar>
            <div class="fs_12 hintColor">点击头像切换作者</div>
            <div class="fs_18 mt-3">{{writerA.name}}</div>
          </v-col>
          <v-col col="3" sm="2">
            <div class="font-weight-black comparison-writer-VS">VS</div>
            <div class="my-2">实时差距</div>
            <div class="comparison-writer-deltaFans ">
              <odometer :value="deltaFans"></odometer>
            </div>
          </v-col>
          <v-col col="3" sm="5">
            <div class="fs_14 color-6">粉丝数</div>
            <div class="comparison-writer-fans">
              <odometer :value="writerB.fans"></odometer>
            </div>
            <v-avatar class="writer-face" size="100px" @click="setOverlay('B')">
              <img :src="writerB.face" alt="John">
            </v-avatar>
            <div class="fs_12 hintColor">点击头像切换作者</div>
            <div class="fs_18 mt-3">{{writerB.name}}</div>
          </v-col>
        </v-row>
      </v-container>
      <v-overlay :value="overlay">
        <div class="overlay-content text-left">
          <div class="overlay-title px-4 fs_16">请输入作者的mid，并确认 <v-icon class="overlay-title-icon" @click="closeOverlay">mdi-close</v-icon></div>
          <div class="overlay-input px-4 my-8">
            <input v-model="mid" type="text">
            <p v-if="isHint" class="fs_12 py-1 hintColor">{{hintText}}</p>
          </div>
          <div class="overlay-btn d-flex justify-end px-4 mb-2">
            <div class="overlay-btn-confirm" @click="changeWriter">确定</div>
            <div class="overlay-btn-cancel" @click="closeOverlay">取消</div>
          </div>
        </div>
      </v-overlay>
    </section>
    <section class="wrap">
      <v-row>
        <v-col>
          <v-card>
            <div class="text-left">
              <h3 class="px-5 py-1 versus-title">下期视频预测对比</h3>
            </div>
            <v-card-text>
              <v-row>
                <v-col col="12" sm="5">
                  <v-row v-if="writerA.estimate != null">
                    <v-col>
                      <div class="text--darken-2">涨粉</div>
                      <div class="text--darken-3 font-weight-bold fs_18 mt-2">{{writerA.estimate.like}}</div>
                    </v-col>
                    <v-col>
                      <div class="text--darken-2">播放</div>
                      <div class="text--darken-3 font-weight-bold fs_18 mt-2">{{writerA.estimate.view}}</div>
                    </v-col>
                    <v-col>
                      <div class="text--darken-2">收益</div>
                      <div class="text--darken-3 font-weight-bold fs_18 mt-2">{{writerA.estimate.profit}}</div>
                    </v-col>
                  </v-row>
                  <v-row v-else>
                    <v-col class="video-no-data">
                      暂无数据
                    </v-col>
                  </v-row>
                </v-col>
                <v-col col="12" sm="2" class="d-flex align-center justify-center">
                  <div class="font-weight-black comparison-video-VS ">vs</div>
                </v-col>
                <v-col col="12" sm="5">
                  <v-row v-if="writerB.estimate != null">
                    <v-col>
                      <div class="text--darken-2">涨粉</div>
                      <div class="text--darken-3 font-weight-bold fs_18 mt-2">{{writerB.estimate.like}}</div>
                    </v-col>
                    <v-col>
                      <div class="text--darken-2">播放</div>
                      <div class="text--darken-3 font-weight-bold fs_18 mt-2">{{writerB.estimate.view}}</div>
                    </v-col>
                    <v-col>
                      <div class="text--darken-2">收益</div>
                      <div class="text--darken-3 font-weight-bold fs_18 mt-2">{{writerB.estimate.profit}}</div>
                    </v-col>
                  </v-row>
                  <v-row v-else>
                    <v-col class="video-no-data">
                      暂无数据
                    </v-col>
                  </v-row>
                </v-col>

              </v-row>
            </v-card-text>

          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col col="12">
          <v-card>
            <div class="text-left">
              <h3 class="px-5 py-1 versus-title">UP主数据对比</h3>
            </div>
            <v-card-text>
              <Chart
                      class="mb-2"
                      title="UP主数据对比"
                      :options="contrastDataOptions"
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
              <h3 class="px-5 py-1 versus-title">UP主收益对比</h3>
            </div>
            <v-card-text>
              <Chart
                      class="mb-2"
                      title="UP主收益对比"
                      :options="profitDataOptions"
                      style="width: 100%"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </section>

  </div>

</template>

<script>
  import versusMainChart from "@/charts/versus-main.js";
  import getMultiChartOptions from "@/charts/biliob-multi-line-chart.js";
  export default {
    name: "",
    components: {
      Odometer: () => import('@/components/common/Odometer'),
    },
    data() {
      return {
        overlay: false,
        isHint: false,
        hintText: '请输入正确的mid',
        type: '',
        mid: null,
        midA:null,
        midB:null,
        mids: [],
        number: 0,
        writerA: Object(),
        writerB: Object(),
        contrastDataOptions: Object(),
        profitDataOptions: Object(),
        contrastData: [],
        profitArray: [],
      }
    },
    computed:{
      deltaFans() {
        if (this.writerA.fans !== 0 || this.writerB.fans !== 0) {
          return Math.abs(this.writerA.fans - this.writerB.fans) + '';
        }else {
          return '0'
        }
      }
    },
    methods: {
      getWriter (mid,name) {
        let self = this;
        self.axios.get(`/api/author/${mid}`).then(r => {
          let data = r.data;
          if(!data.data) {
            self.isHint = true;
            self.hintText = '用户不存在，请输入正确的mid';
            self.mid = null;
          }
          if(data.success && data.data){
            self.closeOverlay();
            self.number++;
            if(name === 'A'){
              self.writerA = data.data;
              self.mids.splice(0,1,mid);
              self.contrastData[0] = {
                name: self.writerA.name,
                data: {
                  product: self.writerA.name,
                  fans: self.writerA.fans,
                  archiveView: self.writerA.archiveView,
                  like: self.writerA.like,
                  favorite: self.writerA.favorite,
                }
              }
            }else {
              self.writerB = data.data;
              self.mids.splice(1,1,mid);
              self.contrastData[1] = {
                name: self.writerB.name,
                data: {
                  product: self.writerB.name,
                  fans: self.writerB.fans,
                  archiveView: self.writerB.archiveView,
                  like: self.writerB.like,
                  favorite: self.writerB.favorite,
                }
              }
            }
            self.contrastDataOptions = versusMainChart(self.contrastData);
            self.number > 1 && self.getAuthorData();
          }
        });
      },
      getAuthorData () {
        let self = this;
        self.mids.map((e,index) => {
          let profitArray = [];
          self.axios.get(`/api/author/${e}/data`).then(r => {
            let data = r.data;
            if(data.success){
              data.data.forEach(function (val) {
                if (val.profit != undefined && val.fans != 0) {
                  profitArray.push([val.day, Number(val.profit)]);
                }
              });
              self.profitArray[index] = profitArray;
              self.setProfitDataOptions();
            }
          });
        });
      },
      setProfitDataOptions (){
        let self = this;
        self.profitDataOptions =  getMultiChartOptions([
          [self.profitArray[0], self.writerA.name +"每日收益", "#1e88e5"],
          [self.profitArray[1], self.writerB.name +"每日收益", "#2b821d"]
        ]);
      },
      setOverlay (type){
        let self = this;
        self.overlay = true;
        self.type = type;
      },
      closeOverlay (){
        this.overlay = false;
        this.isHint = false;
        this.mid = null;
      },
      changeWriter (){
        let self = this;
        let numberReg = /^\d+$|^\d+[.]?\d+$/;
        let value = self.mid;
        if (value !== '') {
          if (!numberReg.test(value)) {
            self.isHint = true;
            self.hintText = '请输入正确的mid';
            self.mid = null;
          } else {
            self.isHint = false;
            self.getWriter(self.mid,self.type);
          }
        } else {
          self.isHint = true;
          self.hintText = '请输入mid';
        }

      }
    },
    mounted (){
      let self = this;
      let midA = self.$route.query.midA;
      let midB = self.$route.query.midB;
      self.mids.push(midA,midB);
      self.getWriter(midA,'A');
      self.getWriter(midB,'B');
    }
  }
</script>

<style scoped>

  .color-6{
    color: #666;
  }
  .hintColor{
    color: red;
  }
  .versus-title{
    font-size: 20px;
    font-weight: bold;
    color: #1e88e5;
    border-bottom: 2px solid #1e88e5;
  }
  .video-no-data{
    line-height: 76px;
  }
  .comparison-writer-fans{
    font-size: 16px;
    font-weight: bold;
    color: #1E88E5;
  }
  .comparison-writer-VS{
     font-size: 80px;
    color: #f44336;
  }
  .comparison-video-VS{
    font-size: 50px;
    color: #f44336;
  }
  .comparison-writer-deltaFans{
    font-size: 22px;
    font-weight: bold;
    color: #1E88E5;
  }
  .writer-face{
    cursor: pointer;
  }
  .overlay-content{
    background-color: #fff;
    border-radius: 2px;
    overflow: hidden;
  }
  .overlay-title{
    position: relative;
    height: 48px;
    line-height: 48px;
    color: #333;
    background-color: #f8f8f8;
    border-bottom: 1px solid #eee;
  }
  .overlay-title-icon{
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    color: #333;
    cursor: pointer;
  }
  .overlay-input input{
    padding: 0 10px;
    width: 280px;
    height: 42px;
    line-height: 42px;
    border: 1px solid #e6e6e6;
    outline: none;
    color: #666;
  }
  .overlay-btn div{
    display: block;
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;
  }
  .overlay-btn-confirm{
    color: #fff;
    background-color: #1E9FFF;
  }
  .overlay-btn-cancel{
    margin-left: 10px;
    border: 1px solid #dedede;
    background-color: #fff;
    color: #333;
  }
  @media screen and (max-width:768px) {
    .comparison-writer-VS{
      font-size: 40px;
    }
  }
</style>