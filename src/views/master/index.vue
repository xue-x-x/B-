<template>
  <div id="home">
    <section class="banner">
      <div class="wrap">
        <p class="banner-fs-h1">辛巴数据B站营销分析服务平台</p>
        <div class="banner-search">
          <div class="banner-search-select">
            <v-select
                    v-model="searchTitle"
                    :items="getSearchItems"
                    label="Solo field"
                    dense
                    solo
                    @input=""
            ></v-select>
          </div>
          <div class="banner-search-input">
            <input v-model="searchValue" type="text" :placeholder="placeholder" @keyup.enter="goToSearch">
          </div>
          <div class="banner-search-btn">
            <v-btn depressed color="#2981f4" @click="goToSearch">
              <v-icon color="#fff">mdi-magnify</v-icon>
            </v-btn>
          </div>

        </div>
      </div>
    </section>
    <section class="comparison">
      <v-container class="wrap">
        <v-row cols="12" no-gutters>
          <v-col lg="5" sm="5" class="comparison-writer"  @click="goTo('/writer',{mid: writerA.mid})">
            <v-row md="12" sm="12" no-gutters>
              <v-col md="3" sm="4" align-self="center">
                <div>粉丝数</div>
                <div class="comparison-writer-fans">
                  <odometer :value="writerA.fans"></odometer>
                </div>
              </v-col>
              <v-col md="7" sm="6" align-self="center" class="d-none d-sm-block text-right">
                <div>{{writerA.name}}</div>
                <div class="text-truncate">{{writerA.official}}</div>
              </v-col>
              <v-col md="2" sm="2" align-self="center">
                <img class="comparison-writer-header" :src="writerA.face" alt="">
              </v-col>
            </v-row>
          </v-col>
          <v-col lg="2" sm="2" @click="goToVersus">
            <div>榜首粉丝争夺</div>
            <div class="comparison-writer-VS">
              VS
            </div>
            <div>
              <odometer :value="deltaFans"></odometer>
            </div>
          </v-col>
          <v-col lg="5" sm="5" class="comparison-writer"  @click="goTo('/writer',{mid: writerB.mid})">
            <v-row md="12" sm="12" no-gutters>
              <v-col md="2" sm="2" align-self="center">
                <img class="comparison-writer-header" :src="writerB.face" alt="">
              </v-col>
              <v-col md="7" sm="6" align-self="center" class="d-none d-sm-block text-left">
                <div>{{writerB.name}}</div>
                <div class="text-truncate">{{writerB.official}}</div>
              </v-col>
              <v-col md="3" sm="4" align-self="center">
                <div>粉丝数</div>
                <div class="comparison-writer-fans">
                  <odometer :value="writerB.fans"></odometer>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section class="ranking section">
      <div class="wrap">
        <home-ranking :title="'排行榜'" :options="siteInfo"></home-ranking>
      </div>
    </section>
    <section class="information section">
      <home-information :title="'B站全部信息'" :options="siteInfo"></home-information>
    </section>
    <section class="antistop section">
      <home-antistop :title="'全站飙升关键词'"></home-antistop>
    </section>
    <section class="section">
      <home-ranking-video :title="'热门视频'"></home-ranking-video>
    </section>
    <section class="section">
      <home-ranking-writer :title="'热门网红推荐'"></home-ranking-writer>
    </section>
  </div>
</template>

<script>
  import {mapState,mapGetters,mapMutations} from 'vuex'
  import {setNumber} from '../../utils/chatUtils';
  export default {
    name: "",
    components: {
      HomeAntistop: () => import('@/components/home/Antistop'),
      HomeInformation: () => import('@/components/home/Information'),
      HomeRanking: () => import('@/components/home/Ranking'),
      HomeRankingVideo: () => import('@/components/home/RankingVideo'),
      HomeRankingWriter: () => import('@/components/home/RankingWriter'),
      Odometer: () => import('@/components/common/Odometer'),
    },
    props: {
      height: {
        type: Number,
        default: function() {
          return this.$vuetify.breakpoint.mdAndUp ? 350 : 200;
        }
      }
    },
    data() {
      return {
        writerA: {},
        writerB: {},
        email: '',
        searchValue: '',
        placeholder: '您可以搜索任意关键词信息',
        tab:null,
      }
    },
    computed: {
      ...mapGetters([
        "getSearchItems",
      ]),
      ...mapState({
         // 箭头函数可使代码更简练
        searchItems: state => state.searchItems,

        // 传字符串参数 'count' 等同于 `state => state.count`
        countAlias: 'searchItems',

        // 为了能够使用 `this` 获取局部状态，必须使用常规函数
        countPlusLocalState (state) {
           console.log(state);
        return state.searchItems
      }
      }),
      siteInfo() {
        if (this.$store.state.site.siteInfo == undefined) {
          return {};
        }
        return this.$store.state.site.siteInfo;
      },
      searchTitle: {
        get () {
          return this.$store.state.searchTitle
        },
        set (val) {
          this.setSearchTitle(val)
        }
      },
      deltaFans() {
        if (this.writerA.fans !== 0 && this.writerB.fans !== 0) {
          return this.writerA.fans - this.writerB.fans + '';
        } else {
          return '0';
        }
      }
    },
    methods: {
      ...mapMutations(['setSearchTitle','setSearchValue']),
      goTo (url,obj) {
        this.$router.push(
          {
            path: url,
            query : obj
          }
          );
      },
      goToVersus () {
        let self = this;
        self.$router.push({
          path: '/versus',
          query : {
            midA: self.writerA.mid,
            midB: self.writerB.mid,
          }
        })
      },
      goToSearch () {
        let self = this;
        let path = '';
        self.searchTitle == '视频' ? path = '/videoSearch' : path = '/writerSearch';
        self.setSearchValue(self.searchValue);
        this.$router.push({
          path:path
        });
      },
      getWriter(){
        let self = this;
        self.axios.get(`/api/author`,{
          params: {
            size: 6
          }
        }).then(r => {
          let data = r;
          if(data.data.success){
            self.writerA = data.data.data.data[0];
            self.writerB = data.data.data.data[1];
          }
        });
      },
    },
    mounted() {
      let self = this;
      self.setSearchTitle('视频');
      self.getWriter();
      if (self.$store.state.site.siteInfo == undefined) {
        self.$store.dispatch("getSiteInfo");
      }
      if (self.$store.state.site.siteGroupInfo == undefined) {
        self.$store.dispatch("getSiteGroupInfo");
      }
    }
  }
</script>

<style scoped>
  .section{
    padding: 50px 0;
  }
  /* banner */
  .banner{
    padding-top: 60px;
    padding-bottom: 50px;
    background: linear-gradient(to bottom, #1867c0, #5CBBF6);
    text-align: center;
    color: #fff;
  }
  .banner-fs-h1{
    font-size: 40px;
  }
  .banner-fs-h3{
    font-size: 20px;
  }
  .banner-search{
    position: relative;
    margin: 40px auto 0 auto;
    padding: 0 64px 0 100px;
    width: 70%;
    height: 38px;
    line-height: 38px;
    background-color: #fff;
    border-radius: 4px;
    overflow: hidden;
  }
  .banner-search-select{
    position: absolute;
    top:0;
    left: 0;
    width: 100px;
  }
  .banner-search-btn{
    position: absolute;
    right: 0;
    top: 0;
    width: 64px;
    height: 100%;
  }
  .banner-search-btn .v-btn:not(.v-btn--round).v-size--default{
    display: block;
    height: 100%;
    border-radius: 0;
  }
  .banner-search-input{
    height: 100%;
  }
  .banner-search-input input{
    padding: 5px 10px;
    width: 100%;
    height: 100%;
    color: #666;
    font-size: 14px;
    outline: none;
  }
  /* 作者对比 */
  .comparison{
    padding: 30px 0;
    font-size: 14px;
    color: #666;
    cursor: pointer;
    background-color: #fafafa;
  }
  .comparison-writer{
    padding: 10px 0;
  }
  .comparison-writer-fans{
    font-size: 16px;
    font-weight: bold;
    color: #1E88E5;
  }
  .comparison-writer-header{
    margin: 0 auto;
    display: block;
    width: 80%;
    border-radius: 50%;
  }
  .comparison-writer-VS{
    font-size: 20px;
    font-weight: bold;
    color: #D32F2F;
  }

  @media screen and (max-width:768px) {
    .section{
      padding: 30px 0;
    }
    .banner{
      padding-top: 20px;
      padding-bottom: 30px;
    }
    .banner-fs-h1{
      font-size: 32px;
    }
    .banner-search{
      padding: 0 54px 0 86px;
      width: 100%;
      font-size: 14px;
    }
    .banner-search .theme--light.v-input{
      font-size: 14px;
    }
    .banner-search-select{
      width: 86px;
    }
    .banner-search-btn{
      width: 54px;
    }

    .comparison-writer-header{
      width: 90%;
    }
  }
</style>