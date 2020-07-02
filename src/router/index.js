import Vue from 'vue'
import Router from 'vue-router'
const MasterIndex = () => import("../views/master/index.vue");
const Versus = () => import("../views/master/versus.vue");
const VideoRanking = () => import("../views/master/videoRanking.vue");
const VideoSearch = () => import("../views/master/videoSearch.vue");
const Video = () => import("../views/master/video.vue");
const Writer = () => import("../views/master/writer.vue");
const WriterRanking = () => import("../views/master/writerRanking.vue");
const WriterSearch = () => import("../views/master/writerSearch.vue");




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
      name: "达人查询",
      path: "/writerSearch",
      component: WriterSearch,
      meta:{
        title:'达人查询'
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
      name: "作者详情",
      path: "/writer",
      component: Writer,
      meta:{
        title:'作者详情'
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
  ]
})
