<template>
  <div id="box">
    <search-search ref="search" :title="'作者'" @goToSearch="goToSearch" @setParamsData="setParamsData"></search-search>
    <search-writer-filtrate ref="writerFiltrate" class="d-none d-sm-block" @setParamsData="setParamsData"></search-writer-filtrate>
    <div class="wtiter-content">
      <ul class="wrap" v-if="writerList.length > 0">
        <!--<li class="wtiter-list">
          <div class="wtiter-list-header">
            <img src="https://i2.hdslb.com/bfs/face/bc5ca101313d4db223c395d64779e76eb3482d60.jpg@80w_80h.jpg" alt="">
          </div>
          <div class="wtiter-list-user">
            <div class="d-block d-sm-flex">
              <span>
                <i class="icon-man"></i>
                老番茄
              </span>
              <v-rating
                      v-model="rating"
                      class="ml-5"
                      background-color="orange lighten-3"
                      color="orange"
                      length="6"
                      size="20px"
                      readonly
                      medium
              ></v-rating>
            </div>
            <div class="d-flex wtiter-list-user-classify">
              <div class="text-truncate">
                <v-icon color="#FBC02D" small>mdi-flash-circle</v-icon>
                <span class="fs_14 pl-1">发过火撒看几点</span>
              </div>
              <div class="text-truncate ml-8" >
                <v-icon color="#2981f4" small>mdi-book-variant</v-icon>
                <span class="fs_14 pl-1">公司开了寄到公司50</span>
              </div>
            </div>
            <div class="d-none d-sm-flex wtiter-list-user-number">
              <span class="mr-5 fs_12">
                <span class="fs_16">1022</span> 粉丝数
              </span>
              <span class="mr-5 fs_12">
                <span class="fs_16">20452</span> 总播放量
              </span>
              <span class="mr-5 fs_12">
                <span class="fs_16">102</span> 粉丝排名
              </span>
              <span class="mr-5 fs_12">
                <span class="fs_16">124</span> 播放量排名
              </span>
              <span class="mr-5 fs_12">
                <span class="fs_16">123</span> 点赞
              </span>
              <span class="mr-5 fs_12">
                <span class="fs_16">1756</span> 充电
              </span>
            </div>
            <div class="d-flex d-sm-none fs_14">
              <div class="mr-2"><v-icon small>mdi-account-multiple</v-icon>12345</div>
              <div class="mr-2"><v-icon small>mdi-thumb-up</v-icon>12345</div>
              <div><v-icon small>mdi-arrow-right-drop-circle</v-icon>12345</div>
            </div>
          </div>
        </li>-->
        <li class="wtiter-list cursorP" v-for="(item,index) in writerList" :key="index" @click="goTo('/writer',{mid: item.mid})">
          <div class="wtiter-list-header" >
            <img :src="item.face" alt="">
          </div>
          <div class="wtiter-list-user">
            <div class="d-flex">
              <span class="wtiter-list-user-name text-truncate">
                <i v-if="item.sex == '男' || item.sex == '女'" :class="item.sex == '男' ? 'icon-man' : 'icon-woman'"></i>
                {{item.name}}
              </span>
              <v-rating
                      v-model="item.level"
                      class="ml-2 mt-1 mt-sm-0 ml-sm-5"
                      background-color="orange lighten-3"
                      color="orange"
                      length="6"
                      :size="ratingSize"
                      readonly
                      medium
              ></v-rating>
            </div>
            <div class="d-flex wtiter-list-user-classify">
              <div class="text-truncate" v-if="item.official">
                <v-icon color="#FBC02D" small>mdi-flash-circle</v-icon>
                <span class="fs_14 pl-1">{{item.official}}</span>
              </div>
              <div class="text-truncate" :class="{'ml-8': item.official}" v-if="item.keywords">
                <v-icon color="#2981f4" small>mdi-book-variant</v-icon>
                <span class="fs_14 pl-1">{{item.keywords}}</span>
              </div>
            </div>
            <div class="d-none d-sm-flex wtiter-list-user-number text-truncate">
              <div class="mr-5 fs_12" v-if="item.fans">
                <span class="fs_14">{{item.fans}}</span> 粉丝数
              </div>
              <div class="mr-5 fs_12" v-if="item.archiveView">
                <span class="fs_14">{{item.archiveView}}</span> 总播放量
              </div>
              <div class="mr-5 fs_12" v-if="item.fansRank">
                <span class="fs_14">{{item.fansRank}}</span> 粉丝排名
              </div>
              <div class="mr-5 fs_12" v-if="item.archiveViewRank">
                <span class="fs_14">{{item.archiveViewRank}}</span> 播放量排名
              </div>
              <div class="mr-5 fs_12" v-if="item.like">
                <span class="fs_14">{{item.like}}</span> 点赞
              </div>
            </div>
            <div class="d-flex d-sm-none fs_14">
              <div class="mr-2" v-if="item.fans"><v-icon small>mdi-account-multiple</v-icon>{{item.fans}}</div>
              <div class="mr-2" v-if="item.archiveView"><v-icon small>mdi-thumb-up</v-icon>{{item.archiveView}}</div>
              <div v-if="item.like"><v-icon small>mdi-arrow-right-drop-circle</v-icon>{{item.like}}</div>
            </div>
            <div class="wtiter-list-user-video">
              <img v-if="item.pic" :src="item.pic" alt="" @click.stop="goTo('/video',{aid: item.aid})">
              <div v-else class="wtiter-list-user-video-img">
                <img src="@/assets/icon/noHave.png" alt="">
                <p>近暂无更新</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div v-else="">
        <div>暂无数据</div>
      </div>
      <div class="wrap clearfix" v-if="Number(writerListData.totalpage) > 1">
        <v-row>
          <v-col cols="8">
            <v-pagination
                    v-model="paramsData.current"
                    :length="Number(writerListData.totalpage)"
                    :total-visible="7"
                    color="#f55345"
                    class="fr"
                    @input="changPaging"
            ></v-pagination>
          </v-col>
          <v-col cols="4">
            <div class="jump-box">
              <span class="jump-title">前往：</span>
              <input class="jump-input" type="text" @input="jumpValue=jumpValue.replace(/[^\d]/g,'')" v-model="jumpValue">
              <span class="go-btn v-pagination__item" @click="setJumpValue()">确定</span>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
    <v-overlay :value="overlay" color="#fff" opacity="0.3">
      <v-progress-circular indeterminate size="64" color="#f55345"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {setNumber} from '../../utils/chatUtils';
  export default {
    name: "",
    components: {
      SearchSearch: () => import('@/components/search/Search'),
      SearchWriterFiltrate: () => import('@/components/search/WriterFiltrate'),
    },
    data() {
      return {
        rating: 4,
        ratingSize: '20px',
        paramsData: {
          channel: '',
          current: 1,
          keyword: '',
          max: 0,
          min: 0,
          size: 10,
          sort: 0,
          effect: 0,
          interact: 0,
          profession: 0,
          show: 0,
          cost: 0,
        },
        totalpage: 0,
        writerListData: {},
        writerList: [],
        overlay: true,
        jumpValue: 1
      }
    },
    watch:{
      paramsData: {
        handler: function() {
          this.overlay = true;
          this.getWriter();
        },
        deep: true
      },
    },
    methods: {
      ...mapMutations(['setSearchTitle']),
      // 跳转页面
      goTo (url,obj) {
        if(url.indexOf("writer") != -1){
          self.$cookies.set("writerSearchMId",obj.mid);
        }
        this.$router.push(
          {
            path: url,
            query : obj
          }
        );
      },
      // 跳转视频搜索
      goToSearch (n) {
        let self = this;
        let path = '';
        this.$router.push({
          path:'/videoSearch',
        });
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
      scrollToTop () {
        const self = this;
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        self.scrollTop = scrollTop;
      },
      getWriter(){
        let self = this;
        self.$cookies.set("writerSearchParamsData",self.paramsData);
        self.axios.get(`/api/author/upPage`,{
          params: self.paramsData
        }).then(r => {
          let data = r.data;
          self.overlay = false;
          if(data.success){
            self.writerListData = data.data;
            self.writerList = data.data.data;
            self.setWriter();
          }
        });
      },
      setWriter () {
        let self = this;
        self.writerList.forEach(function (val) {
          val.fans = setNumber(val.fans);
          val.archiveView = setNumber(val.archiveView);
          val.like = setNumber(val.like);
        })
      },
      setParamsData (value) {
        let self = this;
        self.paramsData.current = 1;
        if(value.type == 'number' || value.type == 'value'){
          for (let i = 0; i < value.key.length ; i++){
            self.paramsData[value.key[i]] = value.value[i];
          }
          return
        }
        let key = value.key;
        let content = value.value == '全部' ? '' : value.value;
        self.paramsData[key] = content;
      },
      changPaging () {
        let self = this;
        self.backTop();
        self.getWriter();
      },
      // 跳转分页
      setJumpValue() {
        let self = this;
        if(self.jumpValue > Number(self.writerListData.totalpage) || self.jumpValue < 1){
          self.getWriter();
        }else {
          self.paramsData.current= Number(self.jumpValue);
        }
      },
    },
    mounted() {
      let self = this;
      let isMobile = self.$store.getters.getMobile;
      let writerSearchMId = this.$cookies.get('writerSearchMId');
      let writerMId = this.$cookies.get('writerMId');
      let writerSearchParamsData = self.$cookies.get("writerSearchParamsData");
      if(writerSearchMId == writerMId && writerMId && writerSearchMId){

        // 判断是否是达人详情页返回
        self.paramsData = writerSearchParamsData;
        self.$cookies.set("writerSearchMId",0);
        self.$refs.writerFiltrate.setActive(self.paramsData);
        self.$refs.search.setSearchActive(self.paramsData);
      }
      if(self.$store.state.searchValue){
        self.paramsData.keyword = self.$store.state.searchValue;
      }
      isMobile ? self.ratingSize = '14px' : self.ratingSize = '20px';
      self.setSearchTitle('作者');
      self.getWriter();
      window.addEventListener('scroll', self.scrollToTop);
    },
    destroyed () {
      window.removeEventListener('scroll', this.scrollToTop)
    },
  }
</script>

<style scoped>
  .cursorP{
    cursor: pointer;
  }
  .v-pagination{
    justify-content: flex-end !important;
  }
  .v-application ul{
    padding: 0;
  }
  .wtiter-content{
    padding: 20px 0;
    background-color: #f7f8fa;
  }
  .wtiter-list{
    margin-bottom: 30px;
    position: relative;
    padding: 16px 20px 16px 120px;
    background-color: #fff;
  }
  .wtiter-list-header{
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0,-50%);
    padding: 0 20px;
  }
  .wtiter-list-header img{
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .wtiter-list-user{
    position: relative;
    padding-right: 180px;
    min-height: 103px;
    line-height: 34px;
    text-align: left;
  }
  .icon-man{
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url("../../assets/icon/man.png") no-repeat;
    background-size: 100% 100%;
  }
  .icon-woman{
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url("../../assets/icon/woman.png") no-repeat;
    background-size: 100% 100%;
  }
  .wtiter-list-user-classify>div{
    max-width: 50%;
  }
  .wtiter-list-user-number{
    color: #666;
  }
  .wtiter-list-user-number .fs_14{
    color: #333;
  }
  .wtiter-list-user-video{
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0,-50%);
    width: 170px;
    height: 100px;
    overflow: hidden;
    box-shadow: 0 0 2px #ccc;
  }
  .wtiter-list-user-video img{
    width: 100%;
    height: 100%;
  }
  .wtiter-list-user-video-img{
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .wtiter-list-user-video-img p{
    font-size: 14px;
    color: #999;
  }
  .wtiter-list-user-video-img img{
    margin: 0 auto;
    width: 70px;
    height: 70px;
  }
  /* 分页跳转 */
  .jump-box{
    text-align: left;
    line-height: 43px;
  }
  .jump-input{
    width: 55px;
    height: 26px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
  }
  .go-btn{
    margin-left: 10px;
    padding: 6px 14px;
    width: 40px;
    height: 40px;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    background-color: #fff;
  }
  @media screen and (max-width:768px) {
    .wtiter-list{
      padding: 12px 5px 12px 85px;
    }
    .wtiter-list-header{
      padding: 0;
      left: 5px;
    }
    .wtiter-list-user{
      padding: 0 3px 0;
      line-height: 22px;
      min-height: 80px;
    }
    .wtiter-list-user-name{
      font-size: 15px;
    }
    .wtiter-list-user .ml-5,.wtiter-list-user .ml-8{
      margin: 0!important;
    }
    .wtiter-list-user-video{
      display: none;
    }
    .wtiter-list-user-classify>div{
      /*max-width: 100%;*/
    }
  }
</style>