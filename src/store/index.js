import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import siteInfoModule from "./site.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: require('@/data/articles.json'),
    drawer: false,
    isMobile: false,
    searchItems: ['视频','作者'],
    searchTitle: '',
    searchValue: '',
    channels: null,
    channelsRanking: null,
    fansNumber: null
  },
  getters: {
    categories: state => {
      const categories = [];
      for (const article of state.articles) {
        if (
          !article.category ||
          categories.find(category => category.text === article.category)
        ) continue

        const text = article.category

        categories.push({
          text,
          to: `/category/${text}`
        })
      }

      return categories.sort().slice(0, 4)
    },
    links: (state) => {
      return state.items
    },
    getMobile: (state) =>{
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag
    },
    getSearchTitle: (state) =>{
      return state.searchTitle
    },
    getSearchItems: (state) => {
      return state.searchItems
    },
    getSearchValue: (state) => {
      return state.searchValue
    }
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    setSiteInfo: (state, info) => (state.siteInfo = info),
    setSearchTitle: (state, info) =>{state.searchTitle = info},
    setSearchValue: (state, info) =>{state.searchValue = info},
    setChannels: (state, info) =>{state.channels = info},
    setChannelsRanking: (state, info) =>{state.channelsRanking = info},
    setNumber: (state, info) =>{
      console.log(info);
      console.log(info.archiveView);
      let number = undefined;
      if(info.archiveView){
        number = info.archiveView;
      }
      // if(info.length > 4){
      //   let number = Math.round((info /10000) * 100) / 100;
      //   state.number = number + "万";
      // }else {
        state.number.fans = number;
        state.number.archiveView = number;
      // }

    },
    toggleDrawer: state => (state.drawer = !state.drawer)

  },
  actions: {
    getChannels(context) {
      axios.get("/api/video/getChannels").then(response => {
        console.log(response);
        if(response.data.success){
          let data = response.data.data;
          let channels = [];
          data.forEach(function(val){
            channels.push({active : false,name : val});
          });
          channels[0].active = true;
          context.commit("setChannelsRanking", data);
          context.commit("setChannels", channels)
        }
      });
    },
  },
  modules: {
    site: siteInfoModule
  }
})
