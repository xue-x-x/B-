<template>
  <div class="wrap wr-container my-6 pa-5">
    <div class="wr-nav">
      <div class="title font-weight-bold">作者榜单</div>
      <v-tabs hide-slider class="pt-12"  show-arrows slider-color="#f55345" color="#f55345">
        <v-tab class="pa-5 fs_16 font-weight-bold" @click="changeWriterLis(0)">
          <v-icon>mdi-account-heart</v-icon>粉丝
        </v-tab>
        <v-tab class="pa-5 fs_16 font-weight-bold" @click="changeWriterLis(3)">
          <v-icon>mdi-account-plus</v-icon>涨粉榜
        </v-tab>
        <v-tab class="pa-5 fs_16 font-weight-bold" @click="changeWriterLis(4)">
          <v-icon>mdi-account-minus</v-icon>掉粉榜
        </v-tab>
      </v-tabs>
    </div>
    <div class="wr-content mt-6">
      <v-simple-table light dense>
        <template>
          <thead>
          <tr>
            <th class="text-center font-weight-bold pa-0">排行</th>
            <th class="text-left font-weight-bold">基本信息</th>
            <th class="text-center font-weight-bold d-none d-lg-table-cell px-0 category">bilibili个人认证</th>
            <th class="text-center font-weight-bold d-none d-md-table-cell">类型</th>
            <th class="text-center font-weight-bold">粉丝</th>
            <th class="text-center font-weight-bold d-none d-sm-table-cell">点赞</th>
            <th class="text-center font-weight-bold d-none d-sm-table-cell">Nox评级</th>
          </tr>
          </thead>
          <tbody>
          <tr class="cursorP" v-for="(item,index) in writerList" @click="goTo(item.mid)">
            <td class="td-ranking pa-0">
              <div class="col-12 clearfix">
                <span v-if="index == 0" class="fl num top3 gold"></span>
                <span v-if="index == 1" class="fl num top3 silver"></span>
                <span v-if="index == 2" class="fl num top3 copper"></span>
                <span v-if="index > 2" class="fl num">{{index+1}}</span>
                <span class="fl change">
                  <span v-if="item.fansRankChange > 0" class="change-mark decline"> ↑ </span>
                  <span v-if="item.fansRankChange < 0" class="change-mark goUp"> ↓ </span>
                  <span v-if="!item.fansRankChange" class="change-mark"> - </span>
                  <span v-if="item.fansRankChange" :class="item.fansRankChange < 0 ? 'goUp' : 'decline'" class="change-num">{{item.fansRankChange}}</span>
                </span>
              </div>
            </td>
            <td class="text-left td-user">
              <div class="td-user-div col-11 text-truncate">
                <img v-if="item.face" class="td-user-header" :src="item.face" alt="">
                <span class="text-truncate td-user-name">{{item.name ? item.name : ''}}</span>
              </div>
            </td>
            <td class="d-none d-lg-table-cell px-0 category">
              <div class="text-truncate mx-auto" style="max-width: 170px">
                {{item.official ? item.official : '暂无数据'}}
              </div>
            </td>
            <td class="d-none d-md-table-cell">
              <div class="text-truncate mx-auto" style="max-width: 170px">
                <span>{{item.channels ? item.channels : '暂无数据'}}</span>
              </div>
            </td>
            <td>
              {{item.fans != 0 ? item.fans : '暂无数据'}}
              <span class="decline" :class="{'goUp':item.fansChange < 0}"  v-if="item.fansChange">
                <i v-if="item.fansChange < 0">↓</i>
                <i v-if="item.fansChange > 0">↑</i>
                {{item.fansChange != 0 ? Math.abs(item.fansChange) : ''}}
              </span>
            </td>
            <td class="d-none d-sm-table-cell">
              {{item.like != 0 ? item.like : '暂无数据'}}
              <span class="decline" :class="{'goUp':item.likeChange < 0}" v-if="item.likeChange">
                <i v-if="item.likeChange < 0">↓</i>
                <i v-if="item.likeChange > 0">↑</i>
                {{item.likeChange != 0 ? Math.abs(item.likeChange) : ''}}
              </span>
            </td>
            <td class="d-none d-sm-table-cell">
              <v-rating
                      v-model="item.level"
                      background-color="orange lighten-3"
                      color="orange"
                      length="6"
                      size="20px"
                      readonly
                      medium
              ></v-rating>
            </td>
          </tr>
          <!--<tr>
            <td class="text-left td-user">
              <div class="td-user-div">
                <img class="td-user-header" src="@/assets/img/header1.jpg" alt="">
                <span class="text-truncate">PewDiePie</span>
              </div>
            </td>
            <td>6135207<span class="decline"><i>↓</i>123</span> </td>
            <td class="d-none d-sm-table-cell">104</td>
            <td class="d-none d-sm-table-cell">6135207<span class="goUp"><i>↑</i>123</span></td>
            <td class="d-none d-sm-table-cell">5</td>
            <td class="d-none d-sm-table-cell">
              <v-rating
                      v-model="rating"
                      background-color="orange lighten-3"
                      color="orange"
                      length="6"
                      size="20px"
                      readonly
                      medium
              ></v-rating>
            </td>
          </tr>-->
          </tbody>
        </template>
      </v-simple-table>
      <div v-if="loadingShow" class="spinner-box mx-auto">
        <div class="pulse-container">
          <div class="pulse-bubble pulse-bubble-1"></div>
          <div class="pulse-bubble pulse-bubble-2"></div>
          <div class="pulse-bubble pulse-bubble-3"></div>
        </div>
      </div>
      <div class="end-mark mt-5" v-if="!isMoreLoad">
        <span class="line line-left"></span>
        <span class="end-text">已经到底啦</span>
        <span class="line line-right"></span>
      </div>
    </div>
  </div>

</template>

<script>
  import { setNumber} from '../../utils/chatUtils';
  export default {
    name: "",
    data() {
      return {
        rating: 4,
        tab: null,
        loadingShow: true,
        isMoreLoad: true,
        scrollTop: 0,
        paramsData: {
          channel: '',
          current: 1,
          keyword: '',
          max: 0,
          min: 0,
          size: 10,
          sort: 0
        },
        writerList: [],
        writerListData: {},
      }
    },
    watch:{
      paramsData: {
        handler: function() {
          this.loadingShow = true;
          this.getWriterList();
        },
        deep: true
      },
    },
    methods: {
      goTo (mid) {
        this.$router.push(
          {
            path: '/writer',
            query : {
              mid: mid
            }
          }
        );
      },
      backTop () {
        const self = this;
        let timer = setInterval(() => {
          let ispeed = Math.floor(-self.scrollTop / 5);
          document.documentElement.scrollTop = document.body.scrollTop = self.scrollTop + ispeed;
          if (self.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 16)
      },
      scrollBottom () {
        let self = this;
        var scr = document.documentElement.scrollTop || document.body.scrollTop; // 向上滚动的那一部分高度
        var clientHeight = document.documentElement.clientHeight; // 屏幕高度也就是当前设备静态下你所看到的视觉高度
        var scrHeight = document.documentElement.scrollHeight || document.body.scrollHeight; // 整个网页的实际高度，兼容Pc端
        var scroll = scr - self.scrollTop;
        self.scrollTop = scr;
        if(scr + clientHeight + 50 >= scrHeight && scroll > 0 && !self.loadingShow){
          if(self.isMoreLoad){
            self.paramsData.current = self.paramsData.current + 1;
          }
        }
      },
      getWriterList(){
        let self = this;
        self.axios.get(`/api/author`,{
          params: self.paramsData
        }).then(r => {
          let data = r.data;
          self.writerListData = data.data;
          if(self.paramsData.current - data.data.totalpage == 0 || data.data.totalpage == 0){
            self.isMoreLoad = false;
          }
          if(data.success){
            self.loadingShow = false;
            self.writerList =self.writerList.concat(data.data.data);
            self.setWriterList();
          }

        });
      },
      setWriterList () {
        let self = this;
        self.writerList.forEach(function (val) {
          val.fans = setNumber(val.fans);
          val.like = setNumber(val.like);
        })
      },
      changeWriterLis(n) {
        this.paramsData.sort = n;
        this.paramsData.current = 1;
        this.writerList = [];
      },
      changPaging () {
        let self = this;
        self.backTop();
        self.getWriter();
      },
    },
    mounted() {
      let self = this;
      self.getWriterList();
      window.addEventListener('scroll', self.scrollBottom);
    }
  }
</script>

<style scoped>
  .cursorP{
    cursor: pointer;
  }

  .wr-nav .title{
    color: #2981f4;
    text-align: center;
    font-size: 26px !important;
  }
  .wr-container{
    box-shadow: 0 0 8px 2px #ccc;
    min-height: 85vh;
  }
  .wr-content{
    border-top: 1px solid #e0e0e0;
  }
  .v-data-table{
    border-bottom: 1px solid #e0e0e0;
  }
  .v-data-table th,.v-data-table td{
    line-height: 48px;
    font-size: 14px;
    display:table-cell;
    vertical-align:middle
  }
  .td-user-div{
    position: relative;
    padding-left: 40px;
  }
  .td-user-header{
    position: absolute;
    top: 50%;
    left: 0;
    margin-top: -16px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  .td-user-name{
    display: block;
    max-width: 150px;
  }
  .decline{
    color: #f55345;
  }
  .goUp{
    color: #41ba47;
  }
  /*.td-ranking>div{*/
    /*width: 60px;*/
  /*}*/
  .td-ranking .num{
    width: 32px;
    line-height: 62px;
    display: inline-block;
    text-align: center;
    font-weight: 600;
  }
  .td-ranking .num.top3{
    height: 62px;
  }
  .td-ranking .num.gold{
    background: url("../../assets/icon/icon-gold.png") 50% no-repeat;
  }
  .td-ranking .num.silver{
    background: url("../../assets/icon/icon-silver.png") 50% no-repeat;
  }
  .td-ranking .num.copper{
    background: url("../../assets/icon/icon-copper.png") 50% no-repeat;
  }
  .td-ranking .change{
    line-height: 62px;
    font-size: 12px;
  }
  .td-ranking .change.up{
      color: #41ba47;
  }
  .td-ranking .change.down{
    color: #f55345;
  }
  @media screen and (max-width:330px) {
    .v-slide-group__prev{
      display: none !important;
    }
    .v-application .pt-12{
      padding-top: 10px !important;
    }
  }
</style>