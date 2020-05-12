<template>
  <div class="wrap">
    <div class="section-title">排行榜</div>
    <v-card>
      <v-tabs
              v-model="tab"
              background-color="#fff"
              color="#f55345"
              fixed-tabs
      >
        <v-tab class="font-weight-bold fs_16">
          作者
        </v-tab>
        <v-tab class="font-weight-bold fs_16">
          视频
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab" class="mt-4">
        <v-tab-item>
          <v-simple-table light>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left font-weight-bold">基本信息</th>
                <th class="text-center font-weight-bold d-none d-sm-table-cell">粉丝排行</th>
                <th class="text-center font-weight-bold">粉丝数</th>
                <th class="text-center font-weight-bold d-none d-sm-table-cell">观看排行</th>
                <th class="text-center font-weight-bold d-none d-sm-table-cell">观看量</th>
                <th class="text-center font-weight-bold d-none d-sm-table-cell">Nox评级</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in writerList" @click="goTo('/writer',{mid: item.mid})">
                <td class="text-left td-user">
                  <div class="td-user-div">
                    <img class="td-user-header" :src="item.face" alt="">
                    <span class="text-truncate">{{item.name}}</span>
                  </div>
                </td>
                <td class="d-none d-sm-table-cell">{{item.fansRank}}</td>
                <td>
                  {{item.fans != 0 ? item.fans : '暂无数据'}}
                  <span class="decline" :class="{'goUp' : item.fansChange < 0}">
                    <i v-if="parseInt(item.fansChange) < 0">↓</i>
                    <i v-if="parseInt(item.fansChange) > 0">↑</i>
                    {{item.fansChange != 0 ? item.newFansChange : null}}
                  </span>
                </td>
                <td class="d-none d-sm-table-cell">
                  {{item.archiveViewRank != 0 || item.archiveViewRank != null ? item.archiveViewRank : '暂无数据'}}
                </td>
                <td class="d-none d-sm-table-cell">
                  {{item.archiveView != 0 && item.archiveView != null ? item.archiveView : '暂无数据'}}
                  <span class="decline" :class="{'goUp' : item.archiveViewChange < 0}">
                    <i v-if="parseInt(item.archiveViewChange) < 0">↓</i>
                    <i v-if="parseInt(item.archiveViewChange) > 0">↑</i>
                    {{item.archiveViewChange != 0 ? item.newArchiveViewChange : ''}}
                  </span>
                </td>

                <td class="d-none d-sm-table-cell">
                  <v-rating
                          v-model="item.level"
                          background-color="orange lighten-3"
                          color="orange"
                          length="6"
                          size="20px"
                          readonly
                          medium
                  ></v-rating>
                </td>
              </tr>
              <!--<tr>
                <td class="text-left td-user">
                  <div class="td-user-div">
                    <img class="td-user-header" src="@/assets/img/header1.jpg" alt="">
                    <span class="text-truncate">PewDiePie</span>
                  </div>
                </td>
                <td>6135207<span class="decline"><i>↓</i>123</span> </td>
                <td class="d-none d-sm-table-cell">104</td>
                <td class="d-none d-sm-table-cell">6135207<span class="goUp"><i>↑</i>123</span></td>
                <td class="d-none d-sm-table-cell">5</td>
                <td class="d-none d-sm-table-cell">
                  <v-rating
                          v-model="rating"
                          background-color="orange lighten-3"
                          color="orange"
                          length="6"
                          size="20px"
                          readonly
                          medium
                  ></v-rating>
                </td>
              </tr>-->
              </tbody>
            </template>
          </v-simple-table>
        </v-tab-item>
        <v-tab-item>
          <v-simple-table light>
            <template v-slot:default>
              <thead>
               <tr>
                 <th class="text-left font-weight-bold">视频封面</th>
                 <th class="text-center font-weight-bold d-none d-sm-table-cell">视频标题</th>
                 <th class="text-center font-weight-bold">播放量</th>
                 <th class="text-center font-weight-bold d-none d-sm-table-cell">收藏量</th>
                 <th class="text-center font-weight-bold d-none d-sm-table-cell">点赞量</th>
                 <th class="text-center font-weight-bold d-none d-sm-table-cell">弹幕量</th>
                 <th class="text-center font-weight-bold d-none d-sm-table-cell">投币量</th>
               </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in videoList" @click="goTo('/video',{aid: item.aid})">
                <td class="py-2 px-0">
                  <!--<v-img class="mx-auto" max-width="200px" min-width="150px" :src="item.pic" aspect-ratio="2" contain></v-img>-->
                  <img class="mx-auto" :src="item.pic" style="min-width: 140px; max-width: 160px;" alt="">
                </td>
                <td class="text-left d-none d-sm-table-cell px-0">
                  <div v-if="item.title" class="td-video-title text-truncate mx-auto" v-html="">{{item.title}}</div>
                  <div v-else="">-</div>
                </td>
                <td>
                  <div v-if="item.view != 0">{{item.view}}</div>
                  <div v-else="">-</div>
                </td>
                <td class=" d-none d-sm-table-cell">
                  <div v-if="item.favorite != 0">{{item.danmaku}}</div>
                  <div v-else="">-</div>
                </td>
                <td class=" d-none d-sm-table-cell">
                  <div v-if="item.favorite != 0">{{item.like}}</div>
                  <div v-else="">-</div>
                </td>
                <td class=" d-none d-sm-table-cell">
                  <div v-if="item.favorite != 0">{{item.favorite}}</div>
                  <div v-else="">-</div>
                </td>
                <td class=" d-none d-sm-table-cell">
                  <div v-if="item.favorite != 0">{{item.coin}}</div>
                  <div v-else="">-</div>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
  import { setNumber} from '../../utils/chatUtils';
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
        tab:null,
        rating:4,
        theme: "colorful",
        videoList: [],
        writerList: [],
      }
    },
    methods: {
      goTo (url,obj) {
          this.$router.push(
          {
            path: url,
            query : obj
          }
        );
      },
      getVideo(){
        let self = this;
        self.axios.get(`/api/video`,{
          params: {
            size: 6,
            sort: 1
          }
        }).then(r => {
          let data = r.data;
          if(data.success){
            self.videoList = data.data.data;
            self.setVideo();
          }
        });
      },
      getWriter(){
        let self = this;
        self.axios.get(`/api/author`,{
          params: {
            size: 10
          }
        }).then(r => {
          let data = r;
          if(data.data.success){
            self.writerList = data.data.data.data;
            self.setWriter();
          }
        });
      },
      setWriter () {
        let self = this;
        self.writerList.forEach(function (val) {
          val.fans = setNumber(val.fans);
          val.archiveView = setNumber(val.archiveView);
          val.fansRank = setNumber(val.fansRank);
          val.archiveViewRank = setNumber(val.archiveViewRank);
          val['newFansChange'] = setNumber(Math.abs(val.fansChange));
          val['newArchiveViewChange'] = setNumber(Math.abs(val.archiveViewChange));
        });
      },
      setVideo () {
        let self = this;
        self.videoList.forEach(function (val) {
          val.view = setNumber(val.view);
          val.favorite = setNumber(val.favorite);
          val.danmaku = setNumber(val.danmaku);
          val.coin = setNumber(val.coin);
          val.like = setNumber(val.like);
        })
      }
    },
    mounted() {
      let self = this;
      self.getVideo();
      self.getWriter();
      self.axios.get(`/api/site/author/recommend`).then(r => {
        let data = r.data.data;
        if(r.data.success){

        }
      });
    }
  }
</script>

<style scoped>
  td{
    cursor: pointer;
  }
  .v-data-table th,.v-data-table td{
    line-height: 48px;
    font-size: 14px;
    display:table-cell;
    vertical-align:middle
  }
  .td-user-div{
    position: relative;
    padding-left: 40px;
  }
  .td-user-header{
    position: absolute;
    top: 50%;
    left: 0;
    margin-top: -16px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  .td-video-title{
    max-width: 400px;
  }
  .decline{
    color: #f55345;
  }
  .goUp{
    color: #41ba47;
  }
</style>