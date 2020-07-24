import Vue from 'vue'
import Router from 'vue-router'
const Cooperation = () => import("../views/master/cooperation.vue");
const MasterIndex = () => import("../views/master/index.vue");
const Versus = () => import("../views/master/versus.vue");
const VideoRanking = () => import("../views/master/videoRanking.vue");
const VideoSearch = () => import("../views/master/videoSearch.vue");
const VideoSimilarity = () => import("../views/master/videoSimilarity.vue");
const Video = () => import("../views/master/video.vue");
const VideoOld = () => import("../views/master/video-old.vue");
const Writer = () => import("../views/master/writer.vue");
const WriterOld = () => import("../views/master/writer-old.vue");
const WriterRanking = () => import("../views/master/writerRanking.vue");
const WriterSearch = () => import("../views/master/writerSearch.vue");
const WriterSimilarity = () => import("../views/master/writerSimilarity.vue");
const test = () => import("../views/master/test.vue");




Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      name: "首页",
      path: "/",
      component: MasterIndex,
      meta:{
        title:'首页'
      }
    },
    {
      name: "合作",
      path: "/cooperation",
      component: Cooperation,
      meta:{
        title:'合作'
      }
    },
    {
      name: "达人查询",
      path: "/writerSearch",
      component: WriterSearch,
      meta:{
        title:'达人查询'
      }
    },
    {
      name: "相似达人",
      path: "/writerSimilarity",
      component: WriterSimilarity,
      meta:{
        title:'相似达人'
      }
    },
    {
      name: "视频查询",
      path: "/videoSearch",
      component: VideoSearch,
      meta:{
        title:'视频查询'
      }
    },
    {
      name: "相似视频",
      path: "/videoSimilarity",
      component: VideoSimilarity,
      meta:{
        title:'相似视频'
      }
    },
    {
      name: "作者详情",
      path: "/writer",
      component: Writer,
      meta:{
        title:'作者详情'
      }
    },
    {
      name: "作者详情old",
      path: "/writer-old",
      component: WriterOld,
      meta:{
        title:'作者详情old'
      }
    },
    {
      name: "视频详情",
      path: "/video",
      component: Video,
      meta:{
        title:'视频详情'
      }
    },
    {
      name: "视频详情old",
      path: "/VideoOld",
      component: VideoOld,
      meta:{
        title:'视频详情old'
      }
    },
    {
      name: "作者排行",
      path: "/writerRanking",
      component: WriterRanking,
      meta:{
        title:'作者排行'
      }
    },
    {
      name: "视频排行",
      path: "/videoRanking",
      component: VideoRanking,
      meta:{
        title:'视频排行'
      }
    },
    {
      name: "榜首粉丝对比",
      path: "/versus",
      component: Versus,
      meta:{
        title:'榜首粉丝对比'
      }
    },
    {
      name: "测试",
      path: "/test",
      component: test,
      meta:{
        title:'测试'
      }
    },
  ]
})
