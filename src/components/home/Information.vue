<template>
  <div class="wrap Information-container">
    <div class="section-title">{{title}}</div>
    <v-container class="grey lighten-5">
      <v-row no-gutters class="d-xs-block">
        <v-col lg="8">
          <v-card flat class="pa-5">
            <Chart
                    :theme="theme"
                    :autoresize="true"
                    :options="options"
                    :style="`height:${height}px; width:100%; `"
            />
          </v-card>
        </v-col>
        <v-col lg="4">
          <v-card flat class="pa-5">
            <ul class="Information-right">
              <li>
                <div class="text-left px-3 caption">
                  一日内最高观看 / MAX VIEW 24H
                </div>
                <div class="text-right title site-aside-value font-weight-bold">{{ bigestWatching }}</div>
              </li>
              <li>
                <div class="text-left px-3 caption">
                  一日内最高在线 / MAX ONLINE 24H
                </div>
                <div class="text-right title site-aside-value font-weight-bold">{{ bigestOnline }}</div>
              </li>
              <li>
                <div class="text-left px-3 caption">
                  本月最值 / MONTHLY MAX
                </div>
                <div class="text-right title site-aside-value font-weight-bold">{{ currentMonthTop }}</div>
              </li>
              <li>
                <div class="text-left px-3 caption">
                  环比上月 / FROM PREV. MONTH
                </div>
                <div class="text-right title site-aside-value font-weight-bold">{{ compareWithLastMonth }}</div>
              </li>
              <li>
                <div class="text-left px-3 caption">
                  环比去年 / FROM PREV. YEAR
                </div>
                <div class="text-right title site-aside-value font-weight-bold">{{ compareWithLastYear }}</div>
              </li>
            </ul>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    name: "",
    components: {
      BiliobDarkInfo: () => import('@/components/biliob/DarkInfo'),
    },
    props: {
      options: {
        type: Object,
        default: function() {
          return {};
        }
      },
      title: {
        type: String,
        default: function() {
          return "";
        }
      },
      subTitle: {
        type: String,
        default: function() {
          return "";
        }
      },
      color: {
        type: String,
        default: function() {
          return "deepblue";
        }
      },
      height: {
        type: Number,
        default: function() {
          return this.$vuetify.breakpoint.mdAndUp ? 350 : 200;
        }
      }
    },
    data() {
      return {
        theme: "colorful",
        siteGroupInfo: undefined
      };
    },
    computed: {
      ...mapGetters([
        "bigestWatching",
        "bigestOnline",
        "currentMonthTop",
        "compareWithLastMonth",
        "compareWithLastYear"
      ]),
    },
    methods: {},
    mounted() {
      let self = this;
      self.axios.get(`/api/site/author/recommend`).then(r => {
        let data = r.data.data;
        if(r.data.success){

        }
      });
    }
  }
</script>

<style scoped>
  .Information-right{
    padding: 0;
  }
  .Information-right .text-left{
    color: #1e88e5 !important;
    caret-color: #1e88e5 !important;
  }
  .Information-right .title{
    margin-bottom: 16px;
    color: rgba(0, 0, 0, 0.6);
  }
</style>