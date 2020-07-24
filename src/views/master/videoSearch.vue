<template>
  <div>
    <search-search ref="search" :title="'视频'" @goToSearch="goToSearch" @setParamsData="setParamsData"></search-search>
    <search-video-filtrate ref="videoFiltrate" class="d-none d-sm-block" @setParamsData="setParamsData"></search-video-filtrate>
    <div class="video-content">
      <ul class="wrap" v-if="videoList.length > 0">
        <!--<li class="video-list">
          <div class="video-list-img">
            <img src="http://i2.hdslb.com/bfs/archive/e2ef4dcfd62eeba381154120ee8125348fe3e8d7.jpg" alt="">
          </div>
          <div class="text-left video-list-content">
            <div class="mb-1 pt-2 pt-sm-6 font-weight-bold video-list-content-title">教你制作超爽的巧克力！学会了就做一份送给对象吧！</div>
            <div class="d-none d-sm-flex video-list-user-number mb-1">
              <div class="mr-5 fs_12">
                <span class="fs_14 font-weight-bold" style="color: #888">1022</span> 播放量
              </div>
              <div class="mr-5 fs_12">
                <span class="fs_14 font-weight-bold" style="color: #888">20452</span> 点赞
              </div>
              <div class="mr-5 fs_12">
                <span class="fs_14 font-weight-bold" style="color: #888">102</span> 分享
              </div>
              <div class="mr-5 fs_12">
                <span class="fs_14 font-weight-bold" style="color: #888">124</span> 收藏
              </div>
              <div class="mr-5 fs_12">
                <span class="fs_14 font-weight-bold" style="color: #888">123</span> 投币
              </div>
              <div class="mr-5 fs_12">
                <span class="fs_14 font-weight-bold" style="color: #888">1756</span> 评论
              </div>
            </div>
            <div  class="d-flex d-sm-none video-list-user-number">
              <div class="mr-2 fs_14 color-8"><v-icon small>mdi-arrow-right-drop-circle</v-icon>12345</div>
              <div class="mr-2 fs_14 color-8"><v-icon small>mdi-thumb-up</v-icon>12345</div>
              <div class="fs_14 color-8"><v-icon small>mdi-share-circle</v-icon>12345</div>
            </div>
            <div class="video-list-user-time fs_14 color-8">2020-03-13 14:49:58</div>
          </div>
          <div class="d-none d-sm-block video-list-user">
            <img src="http://i0.hdslb.com/bfs/face/ba180574fda73feedbc19ab62449fb30de026247.jpg" alt="">
            <div class="video-list-user-name">小Sue酱</div>
            <div class="d-flex video-list-user-icon">
              <div>
                <v-icon :size="iconSize" :color="iconColor">mdi-account-multiple</v-icon>
                123456
              </div>
              <div>
                <v-icon :size="iconSize" :color="iconColor">mdi-thumb-up</v-icon>
                123456
              </div>
            </div>
          </div>
        </li>-->
        <li class="video-list cursorP" v-for="(item,index) in videoList" :key="index"  @click="goTo('/video',{aid: item.aid})">
          <div class="video-list-img">
            <img :src="item.pic" alt="">
          </div>
          <div class="text-left video-list-content">
            <div class="mb-2 pt-2 pt-sm-6 font-weight-bold video-list-content-title" v-html="item.title"></div>
            <div class="d-none d-sm-flex video-list-user-number mb-1">
              <div class="mr-5 fs_12" v-if="item.view">
                <span class="fs_14 font-weight-bold color-8">{{item.view}}</span> 播放量
              </div>
              <div class="mr-5 fs_12" v-if="item.like">
                <span class="fs_14 font-weight-bold color-8">{{item.like}}</span> 点赞
              </div>
              <div class="mr-5 fs_12" v-if="item.favorite">
                <span class="fs_14 font-weight-bold color-8">{{item.favorite}}</span> 收藏
              </div>
              <div class="mr-5 fs_12 d-none d-md-block" v-if="item.share">
                <span class="fs_14 font-weight-bold color-8">{{item.share}}</span> 分享
              </div>
              <div class="mr-5 fs_12 d-none d-lg-block" v-if="item.coin">
                <span class="fs_14 font-weight-bold color-8">{{item.coin}}</span> 投币
              </div>
              <div class="mr-5 fs_12 d-none d-lg-block" v-if="item.comment">
                <span class="fs_14 font-weight-bold color-8">{{item.comment}}</span> 评论
              </div>
            </div>
            <div  class="d-flex d-sm-none video-list-user-number">
              <div class="mr-2 fs_14 color-8" v-if="item.view"><v-icon small>mdi-arrow-right-drop-circle</v-icon>{{item.view}}</div>
              <div class="mr-2 fs_14 color-8" v-if="item.like"><v-icon small>mdi-thumb-up</v-icon>{{item.like}}</div>
              <div class="fs_14 color-8" v-if="item.share"><v-icon small>mdi-share-circle</v-icon>{{item.share}}</div>
            </div>
            <div class="video-list-user-time fs_14 color-8">{{item.datetime}}</div>
          </div>
          <div class="d-none d-sm-block video-list-user cursorP" v-if="item.face || item.name || item.fans || item.level" @click.stop="goTo('/writer',{mid: item.mid})">
            <img v-if="item.face" :src="item.face" alt="">
            <div class="video-list-user-name">{{item.name}}</div>
            <div class="d-flex video-list-user-icon">
              <div>
                <v-icon :size="iconSize" :color="iconColor">mdi-account-multiple</v-icon>
                {{item.fans}}
              </div>
              <div v-if="item.level">
                <i class="iocn-level"></i>
                {{item.level}}<span v-if="item.level == 6" class="fs_12">(满级)</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div v-else="">
        <div>暂无数据</div>
      </div>
      <div class="wrap clearfix" v-if="Number(videoListData.totalpage) > 1">
        <v-pagination
                v-model="paramsData.current"
                :length="Number(videoListData.totalpage)"
                :total-visible="7"
                color="#f55345"
                class="fr"
                @input="changPaging"
        ></v-pagination>
      </div>
    </div>
    <v-overlay :value="overlay" color="#fff" opacity="0.3">
      <v-progress-circular indeterminate size="64" color="#f55345"></v-progress-circular>
    </v-overlay>
  </div>

</template>

<script>
  import {mapMutations} from 'vuex'
  import { setNumber,HtmlDecode} from '../../utils/chatUtils';
  export default {
    name: "",
    components: {
      SearchSearch: () => import('@/components/search/Search'),
      SearchVideoFiltrate: () => import('@/components/search/videoFiltrate'),
    },
    data() {
      return {
        iconSize: '22px',
        iconColor: '#939393',
        paramsData: {
          channel: '',
          current: 1,
          keyword: '',
          size: 10,
          sort: 0,
          tag: ''
        },
        videoListData: {},
        videoList: [],
        overlay: true
      }
    },
    watch:{
      paramsData: {
        handler: function() {
          this.overlay = true;
          this.getVideo();
        },
        deep: true
      },
    },
    methods: {
      ...mapMutations(['setSearchTitle']),
      goTo (url,obj) {
        if(url.indexOf("video") != -1){
          self.$cookies.set("videoSearchMId",obj.aid);
        }
        this.$router.push(
          {
            path: url,
            query : obj
          }
        );
      },
      goToSearch (n) {
        let self = this;
        this.$router.push({
          path:'/writerSearch'
        });
      },
      setParamsData (value) {
        let self = this;
        if(value.type == 'number'){
          for (let i = 0; i < value.key.length ; i++){
            self.paramsData[value.key[i]] = value.value[i];
          }
          return
        }
        let key = value.key;
        let content = value.value == '全部' ? '' : value.value;
        self.paramsData[''+key] = content;
      },
      getVideo () {
        let self = this;
        self.$cookies.set("videoSearchParamsData",self.paramsData);
        self.axios.get(`/api/video`,{
          params: self.paramsData
        }).then(r => {
          let data = r.data;
          self.overlay = false;
          if(data.success){
            self.videoListData = data.data;
            self.videoList = data.data.data;
            self.setVideo();
          }
        });
      },
      setVideo () {
        let self = this;
        self.videoList.forEach(function (val) {
          val.view = setNumber(val.view);
          val.like = setNumber(val.like);
          val.share = setNumber(val.share);
          val.comment = setNumber(val.comment);
          val.coin = setNumber(val.coin);
          val.favorite = setNumber(val.favorite);
          val.title = HtmlDecode(val.title);
        })
      },
      changPaging () {
        let self = this;
        self.overlay = true;
        self.backTop();
        self.getVideo();
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
    },
    mounted() {
      let self = this;
      let videoSearchMId = this.$cookies.get('videoSearchMId');
      let videoMId = this.$cookies.get('videoMId');
      let videoSearchParamsData = self.$cookies.get("videoSearchParamsData");
      if(videoSearchMId == videoMId && videoMId && videoSearchMId){
        self.paramsData = videoSearchParamsData;
        self.$cookies.set("videoSearchMId",0);
        self.$refs.search.setSearchActive(self.paramsData);
        self.$refs.videoFiltrate.setActive(self.paramsData);
      }else if(self.$store.state.searchValue){
        self.paramsData.keyword = self.$store.state.searchValue;
      }else {
        self.getVideo();
      }

      self.setSearchTitle('视频');
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
  .color-8{
    color: #888;
  }
  .video-content{
    padding: 20px 0;
    background-color: #f7f8fa;
  }
  .video-list{
    margin-bottom: 30px;
    position: relative;
    padding: 16px 220px 16px 200px;
    background-color: #fff;
  }
  .video-list-img{
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    padding: 0 20px;
    width: 200px;
    max-height: 116px;
    overflow: hidden;
  }
  .video-list-img img{
    width: 100%;
    height: 100% !important;
  }
  .video-list-content{
    position: relative;
    width: 100%;
    min-height: 116px;
  }
  .video-list-user-time{
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .video-list-user-number{
    position: absolute;
    left: 0;
    bottom: 24px;
    line-height: 20px;
  }
  .video-list-user-number span{
    vertical-align: bottom;
  }
  .video-list-user{
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    padding: 10px 20px;
    width: 220px;
    border-left: 1px solid #ccc;
  }
  .video-list-user img{
    margin: 0 auto;
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .video-list-user-name{
    padding: 10px 0;
    font-size: 16px;
  }
  .video-list-user-icon{
    font-size: 14px;
  }
  .video-list-user-icon>div{
    width: 50%;
    text-align: center;
  }
  .iocn-level{
    display: inline-block;
    width: 22px;
    height: 22px;
    background: url("../../assets/icon/level.png") no-repeat;
    background-size: 100% 100%;
    vertical-align: middle;
  }
  @media screen and (max-width:768px) {
    .video-list{
      padding: 12px 5px 12px 120px;
    }
    .video-list-img{
      padding: 0 5px;
      width: 120px;
    }
    .video-list-content{
      min-height: 80px;
    }
    .video-list-content-title{
      font-size: 14px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .video-list-user-number{
      position: relative;
      bottom: 0;
    }
    .video-list-user-time{
      position: relative;
    }
  }
</style>