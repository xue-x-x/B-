<template>
  <div>
    <v-card>
      <v-row class="wrap" v-if="goods.length > 0">
        <v-col class="commodity" clos="12" md="6" v-for="(item,index) in goods" :key="item.id">
          <div class="commodity-img">
            <img :src="item.img" alt="">
          </div>
          <div class="commodity-introduce text-left">
            <p class="commodity-introduce-title">{{item.title}}</p>
            <p class="commodity-introduce-money">商品售价：<span>￥{{item.price}}</span></p>
            <p class="commodity-introduce-sales">全网销量：{{item.count}}</p>
          </div>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col class="text-center my-8">
          暂无数据
        </v-col>
      </v-row>
    </v-card>
    <v-card class="mt-4 wrap text-left">
      <h3 class="px-5 py-1 text-left">同商品视频</h3>
      <v-row class="wrap text-left"  v-if="videos.length > 0">
        <v-col cols="12" v-for="(item,index) in videos" :key="item.aid">
          <v-row>
            <v-col cols="12" md="10" class="video">
              <div class="video-img">
                <img :src="item.pic" alt="">
              </div>
              <div class="video-introduce">
                <p class="video-introduce-title">{{item.title}}</p>
                <p class="video-introduce-number">
                  <span v-if="item.view">播放数:{{setNumber(item.view)}}</span>
                  <span v-if="item.like">点赞数:{{setNumber(item.like)}}</span>
                  <span v-if="item.danmaku">弹幕数:{{setNumber(item.danmaku)}}</span>
                  <span v-if="item.favorite">收藏数:{{setNumber(item.favorite)}}</span>
                  <span v-if="item.share">分享数:{{setNumber(item.share)}}</span>
                  <span v-if="item.coin">投币数:{{setNumber(item.coin)}}</span>
                </p>
                <p class="video-introduce-time">{{item.datetime}}</p>
              </div>
            </v-col>
            <v-col cols="12" md="2" class="d-flex align-center justify-center">
              <v-btn class="video-btn " dark color="#1abc9c" @click="goTo('/video',{aid: item.aid})">视频分析</v-btn>
            </v-col>
          </v-row>
        </v-col>

      </v-row>
      <v-row v-else>
        <v-col class="text-center my-8">
          暂无数据
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
  import { setNumber} from '../../utils/chatUtils';
  export default {
    props:{
      aid: {
        type: Number,
        default: 0,
      },

    },
    data() {
      return {
        goods:[],
        videos:[],
      }
    },
    watch:{
      aid(){
        this.getVideoGoods();
      },
    },
    methods: {
      // 跳转页面
      goTo (url,obj) {
        this.$router.push(
          {
            path: url,
            query : obj
          }
        );
      },
      getVideoGoods () {
        let self = this;
        self.axios.get(`/api/video/${self.aid}/getVideoGoods`).then(r => {
          let data = r.data;
          if(data.msg == 'success'){
            self.goods = data.goods;
            self.videos = data.sameVideos;
          }
        });
      },
      setNumber (n) {
        return setNumber(n);
      }
    },
    mounted(){
      this.aid && this.getVideoGoods();
    }
  }
</script>

<style scoped>
  /* 商品 */
  .commodity{
    position: relative;
    padding: 0 20px 0 180px;
    margin: 32px 0;

  }
  .commodity:nth-of-type(odd){
    border-right: 1px solid #ccc;
  }
  .commodity-img{
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    width: 150px;
    height: 112px;
  }
  .commodity-img img{
    margin: 0 auto;
    display: block;
    width: auto;
    max-width: 100%;
    height: 100%;
  }
  .commodity-introduce span{
    font-size: 20px;
    font-weight: bolder;
  }
  .commodity-introduce-title{
    font-weight: bolder;
    font-size: 18px;
    color: #000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .commodity-introduce-money span{
    color: #e53935;
  }
  h3{
    font-size: 20px;
    font-weight: bold;
    color: #1e88e5;
    border-bottom: 2px solid #1e88e5;
  }
  /* 视频 */
  .video{
    position: relative;
    padding: 20px 20px 20px 200px;
  }
  .video-img{
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    width: 160px;
    height: 100px;
  }
  .video-img img{
    margin: 0 auto;
    display: block;
    width: 100%;
    height: 100%;
  }
  .video-introduce p{
    margin-bottom: 10px;
  }
  .video-introduce-title{
    font-weight: bolder;
    color: #2f2f2f;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .video-introduce-number span{
    margin-right: 10px;
    font-size: 15px;
    color: #525252;
  }
  .video-introduce-time{
    font-size: 14px;
    color: #8f8f8f;
  }
</style>