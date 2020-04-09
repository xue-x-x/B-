import axios from "axios";
import drawSitePlay from "../charts/site_play.js";
export default {
  state: {
    siteInfo: null,
    siteGroupInfo: null
  },
  mutations: {
    setSiteInfo(state, info) {
      state.siteInfo = info;
    },
    setData(state, payload) {
      console.log(state[payload.name]);
      state[payload.name] = payload.data;
    }
  },
  getters: {
    bigestWatching(state) {
      console.log(state.siteGroupInfo);
      if (state.siteGroupInfo != null && state.siteGroupInfo.maxView != null) {
        return `约为${(state.siteGroupInfo.maxView / 10000).toFixed(2)}万人`;
      } else {
        return "载入中..";
      }
    },
    bigestOnline(state) {
      if (state.siteGroupInfo != null && state.siteGroupInfo.maxOnline != null) {
        return `约为${(state.siteGroupInfo.maxOnline / 10000).toFixed(2)}万人`;
      } else {
        return "载入中..";
      }
    },
    currentMonthTop(state) {
      console.log(state.siteGroupInfo == null);
      if (state.siteGroupInfo == null || state.siteGroupInfo.monthlyMaxView == null) {
        return "载入中..";
      } else {
        return `约${(state.siteGroupInfo.monthlyMaxView / 10000).toFixed(
          3
        )}万人`;
      }
    },
    compareWithLastMonth(state) {
      console.log(state);
      if (state.siteGroupInfo == null || state.siteGroupInfo.prevMonthMaxViewRate == null) {
        return "载入中..";
      }
      let prevMonthMaxViewRate = Math.abs(state.siteGroupInfo.prevMonthMaxViewRate);
      let text = prevMonthMaxViewRate > 10000 ?`${(state.siteGroupInfo.prevMonthMaxViewRate / 10000).toFixed(3)}万人`:`${(state.siteGroupInfo.prevMonthMaxViewRate).toFixed(3)}人`;

      if (text[0] == "-") {
        text = "↓  " + text.replace("-", "");
      } else {
        text = "↑  " + text;
      }
      return text;
    },
    compareWithLastYear(state) {
      console.log(state)
      if (state.siteGroupInfo == null || state.siteGroupInfo.prevYearMaxViewRate == null) {
        return "载入中..";
      } else {
        let prevYearMaxViewRate = Math.abs(state.siteGroupInfo.prevYearMaxViewRate);
        let text = prevYearMaxViewRate > 10000 ?`${(state.siteGroupInfo.prevYearMaxViewRate / 10000).toFixed(3)}万人`:`${(state.siteGroupInfo.prevYearMaxViewRate).toFixed(3)}人`;

        if (text[0] == "-") {
          text = "↓  " + text.replace("-", "");
        } else {
          text = "↑  " + text;
        }
        return text;
      }
    }
  },
  actions: {
    getSiteInfo(context) {
      axios.get("/api/site").then(response => {
        if(response.data.success){
          context.commit("setSiteInfo", drawSitePlay(response.data.data))
        }
      });
    },
    getSiteGroupInfo(context) {
      axios.get("/api/site/group").then(response => {
        context.commit("setData", {
          data: response.data.data,
          name: "siteGroupInfo"
        });
      });
    }
  }
};
