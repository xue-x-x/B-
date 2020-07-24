<template>
  <div class="wrap mt-10">
    <div class="filter-list clearfix">
      <div class="fl filter-title text-left">分类：</div>
      <div class="fl classify-list">
        <ul class="d-flex flex-wrap">
          <li v-if="channels" class="ml-2 mr-2 classify-list-li" :class="{'filter-list-li-active':item.active}" v-for="(item,index) in channels" :key="index" @click="changeClassify(item,index)">
            {{item.name}}
          </li>
        </ul>
      </div>
    </div>
    <div class="filter-list clearfix">
      <div class="fl filter-title text-left">排序选项：</div>
      <div class="fl">
        <span class="ma-3 fs_14 filter-title-span" :class="item.active ? 'filter-title-span-active' : ''" v-for="(item,index) in otherOptions" :key="index" @click="changOtherOptions(item,index)">
          <v-icon left :color="item.active ? '#00a1d6' : '#6d757a'" size="18px">{{item.icon}}</v-icon>{{item.name}}
        </span>
      </div>
    </div>
    <div class="filter-list ">
      <div class="mb-2 clearfix">
        <div class="fl filter-title text-left">热门标签：</div>
        <div class="fr searchTagName-box">
          <label for="tagName">
            <input id="tagName" class="searchTagName" type="text" v-model="tagName" @keyup.enter="searchTag" placeholder="请输入查询标签">
            <v-icon slot="append" color="#00a1d6" style="cursor: pointer" @click="searchTag">mdi-magnify</v-icon>
          </label>
        </div>
      </div>

      <ul class="d-flex flex-wrap" style="margin-left: 100px">
        <li class="classify-list-li" :class="{'filter-list-li-active':item.active}" v-for="(item,index) in hostTagList" :key="index" @click="changeHostTag(item,index)">
          <v-chip
                  class="ma-2"
                  :outlined="item.active ? false : true"
                  :text-color="item.active ? '#fff' : '#666'"
                  :color="item.active ? '#00a1d6' : '#ccc'"
          >
            {{item.name}}
          </v-chip>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>

  export default {
    name: "",
    data() {
      return {
        tagName: '',
        otherOptions: [
          {
            value: 0,
            active: true,
            icon: 'date_range',
            name: '日期',
          },
          {
            value: 1,
            active: false,
            icon: 'mdi-play-circle-outline',
            name: '播放',
          },
          {
            value: 2,
            active: false,
            icon: 'mdi-thumb-up-outline',
            name: '点赞',
          },
          {
            value: 3,
            active: false,
            icon: 'mdi mdi-folder-star',
            name: '收藏',
          },
          {
            value: 4,
            active: false,
            icon: 'mdi-message-bulleted',
            name: '弹幕',
          },
        ],
        hostTagList: [],
      }
    },
    computed: {
      channels() {
        if (this.$store.state.channels == undefined) {
          return {};
        }
        return this.$store.state.channels;
      },
    },
    methods: {
      // 获取热门tag
      getHostTag () {
        let self = this;
        self.axios.get('/api/video/getHostTag').then(r => {
          let data = r.data;
          if(data.success && self.hostTagList.length < 1){
            let hostTagList = data.data;
            hostTagList.forEach(function (val) {
              let setData = {
                active:false,
                name:val,
              };
              self.hostTagList.push(setData);
            });

            self.hostTagList.unshift({active:true,name:'全部'});
            self.$store.commit('setHostTagList', self.hostTagList);
          }
        });
      },
      // 获取tag
      getTag (name) {
        let self = this;
        if(name == '全部'){
          let value = {
            type:'tag',
            key:'tag',
            value: ''
          };
          this.$emit('setParamsData', value);
          return false
        }
        self.axios.get('/api/video/getTag?tagName='+name).then(r => {
          let data = r.data;
          if(data.success && data.data){
            let value = {
              type:'tag',
              key:'tag',
              value: data.data.tag
            };
            this.$emit('setParamsData', value);
          }
        });
      },
      // 切换分类
      changeClassify (item,index) {
        let self = this;
        let value = {
          type:'channel',
          key:'channel',
          value: item.name
        };
        this.$emit('setParamsData', value);
        self.channels.forEach(function(val){
          val.active = false;
        });
        self.channels[index].active = true;
      },
      // 切换排序选项
      changOtherOptions (item,index) {
        let self = this;
        let value = {
          type:'sort',
          key:'sort',
          value: item.value
        };
        this.$emit('setParamsData', value);
        self.otherOptions.forEach(function(val){
          val.active = false;
        });
        self.otherOptions[index].active = true;
      },
      // 切换热门标签
      changeHostTag (item,index) {
        let self = this;
        self.getTag(item.name);
        self.hostTagList.forEach(function(val){
          val.active = false;
        });
        self.hostTagList[index].active = true;
        self.$store.commit('setVidoeIsConfirm', false);
        self.$store.commit('setVideoHostTagListIndex', index);
      },
      // 查询热门标签
      searchTag (){
        let self = this;
        self.getTag(self.tagName);
        self.hostTagList.forEach(function(val){
          val.active = false;
        });
        self.$store.commit('setVidoeIsConfirm', true);
        self.$store.commit('setTagName', self.tagName);
      },
      /* 设置选中值 */
      setActive (data){
        let self = this;
        self.hostTagList = [];
        let hostTagList = self.$store.state.hostTagList;
        let vidoeIsConfirm = self.$store.state.vidoeIsConfirm;
        let videoHostTagListIndex = self.$store.state.videoHostTagListIndex;
        if(vidoeIsConfirm){
          self.tagName = self.$store.state.tagName;
        }
        self.otherOptions.forEach(function (val) {
          val.active = val.value == data.sort ? true : false
        });
        hostTagList.forEach(function (val,index) {
          val.active = videoHostTagListIndex == index  && !vidoeIsConfirm? true : false;
        });

        self.hostTagList = hostTagList;
      },
    },
    mounted () {
      let self = this;

      self.getHostTag();
      if (self.$store.state.channels == undefined) {
        self.$store.dispatch("getChannels");
      }
    }

  }
</script>

<style scoped>
  .v-application ul{
    padding: 0;
  }
  .searchTagName-box{
    border-bottom: 1px solid #ccc;
  }
  .searchTagName{
    font-size: 14px;
    outline: none;
  }
  .filter-list{
    padding: 15px 0;
    border-bottom: 1px dashed #e9e9e9;
    text-align: left;
  }
  .filter-title{
    width: 100px;
  }
  .filter-title-span{
    color: #6d757a;
    cursor: pointer;
  }
  .filter-title-span-active{
    color: #00a1d6;
  }
  .filter-label{
    width: 60%;
  }
  .filter-label-li{
    padding: 2px 8px;
    line-height: 22px;
    font-size: 14px;
    color: #666;
    cursor: pointer;
    border-radius: 4px;
  }
  .active{
    background-color: #f55345;
    color: #fff;
  }
  .filter-manual{
    position: relative;
  }
  .filter-manual-hidden{
    position: absolute;
    left: -16px;
    top: -16px;
    z-index: -1;
    opacity: 0;
    padding: 16px;
    width: calc(100% + 32px);
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0,0,0,.2);
  }
  .filter-manual-show{
    z-index: 10;
    opacity: 1;
  }
  .filter-manual-pop{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0);
  }
  .filter-manual-span:hover{
    border: 1px solid #f55345;
    color: #f55345;
    cursor: pointer;
  }
  .filter-manual-input{
    padding-left: 8px;
    display: inline-block;
    width: 88px;
    height: 32px;
    line-height: 32px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    color: #666;
    cursor: text;

  }
  .filter-manual-error{
    opacity: 0;
    font-size: 12px;
    color: #f55345;
    line-height: 16px;
  }
  .filter-manual-error-show{
    opacity: 1;
  }
  .filter-manual-btn .btn{
    width: 88px;
    border: none;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
  }
  .filter-manual-btn .btn.btn-confirm{
    color: #fff;
    background-color: #f55345;
    margin-left: 10px;
  }
  .classify-list{
    width: calc(100% - 144px);
  }
  .classify-list-li{
    color: #6d757a;
    cursor: pointer;
  }
  .v-application .ma-2{
    margin: 0 8px 8px !important;
  }
  .filter-list-li-active{
    color: #00a1d6  ;
  }
</style>