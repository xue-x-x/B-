<template>
  <div class="wrap">
    <div class="section-title">{{title}}</div>
    <div class="ranking-video-list">
      <ul class="clearfix d-flex flex-wrap ">
        <li class="ranking-video-item" v-for="(item,index) in videoList" :key="index" @click="goTo(item.aid)">
          <img v-if="item.pic" class="video-item-img" :src="item.pic" alt="">
          <img v-else class="video-item-img" src="https://i1.hdslb.com/bfs/archive/0ef2f1640c05e4f670e6d595041f9da685b41d2f.jpg@160w_100h.jpg" alt="">
          <p class="video-item-title">{{item.title}}</p>
          <div class="video-item-usre">
            <span>{{item.datetime}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <!--<someComponent></someComponent>-->
</template>

<script>
  //import someComponent from './someComponent'
  export default {
    name: "",
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
        isMobile: false,
        videoList:[]
      }
    },
    methods: {
      goTo (aid) {
        this.$router.push(
          {
            path: '/video',
            query : {
              aid: aid
            }
          }
        );
      },
    },
    mounted() {
      let self = this;
      self.isMobile = self.$store.getters.getMobile;
      self.axios.get(`/api/site/video/recommend`).then(r => {
        let data = r.data.data;
        if(r.data.success){
          self.isMobile ? self.videoList = data.slice(0,4) : self.videoList = data.slice(0,8);
        }
      });
    }
  }
</script>

<style scoped>
  .ranking-video-item{
    margin-bottom: 10px;
    padding: 10px;
    /*float: left;*/
    width: 25%;
    cursor: pointer;
  }
  .video-item-img{
    width: 100%;
    height: 171px;
  }
  .video-item-title{
    margin: 10px 0;
    height: 48px;
    color: #333;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-align: left  ;
  }
  .video-item-usre{
    text-align: right;
    font-size: 14px;
    color: #666;
  }
  @media screen and (max-width:768px) {
    .ranking-video-item{
      margin-bottom: 10px;
      position: relative;
      padding: 10px 10px 10px 36vw;
      width: 100%;
    }
    .video-item-img{
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(0,-50%);
      width: 36vw;
      max-height: 98%;
    }
    .video-item-title{
      padding-left: 10px;
      margin: 0;
      font-size: 14px;
    }
  }
  @media screen and (max-width:330px) {
    .ranking-video-item{
      margin-bottom: 5px;
      padding: 5px 5px 5px 27vw;
    }
    .video-item-img{
      width: 27vw;
    }
  }
</style>