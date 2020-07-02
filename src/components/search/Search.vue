<template>
  <div class="wrap ">
    <div class="search">
      <div class="search-select">
        <v-select
                v-model="searchTitle"
                :items="getSearchItems"
                label="Solo field"
                dense
                solo
                background-color="rgba(0,0,0,0)"
                @input="changSelect"
        ></v-select>
      </div>
      <div class="search-input">
        <input type="text" v-model="searchValue" :placeholder="placeholder" @keyup.enter="searchClick">
      </div>
      <div class="search-btn">
        <v-btn depressed color="#2981f4" @click="searchClick">
          <v-icon color="#fff">mdi-magnify</v-icon>
        </v-btn>
      </div>
    </div>
  </div>

</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
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
        path: '',
        searchValue:'',
        searchItems: ['视频','作者'],
        placeholder:'您可以搜索任意关键词信息',
      }
    },
    computed: {
      ...mapGetters([
        "getSearchItems",
      ]),
      searchTitle: {
        get () {
          return this.$store.state.searchTitle
        },
        set (val) {
          this.setSearchTitle(val)
        }
      },
    },
    methods: {
      ...mapMutations(['setSearchTitle','setSearchValue']),
      changSelect () {
        let self = this;
        if (self.searchTitle == self.title) return;
        self.setSearchValue(self.searchValue);
        self.$emit('goToSearch',self.searchValue);
      },
      searchClick (){
        let value = {
          type:'keyword',
          key:'keyword',
          value: this.searchValue
        };
        this.setSearchValue('');
        this.$emit('setParamsData', value);
      },
      setSearchActive (data){
        this.searchValue = data.keyword;
      },
    },
    mounted() {
      this.searchValue = this.$store.state.searchValue;
    }
  }
</script>

<style scoped>
  .search{
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
  .search-select{
    position: absolute;
    top:0;
    left: 0;
    width: 100px;
    background-color: rgba(0,0,0,0.1);
  }
  .search-btn{
    position: absolute;
    right: 0;
    top: 0;
    width: 64px;
    height: 100%;
  }
  .search-btn .v-btn:not(.v-btn--round).v-size--default{
    display: block;
    height: 100%;
    border-radius: 0;
  }
  .search-input{
    height: 100%;
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;
  }
  .search-input input{
    padding: 5px 10px;
    width: 100%;
    height: 100%;
    color: #666;
    font-size: 14px;
    outline: none;
  }
  @media screen and (max-width:768px) {
    .search{
      margin: 30px auto;
      padding: 0 54px 0 86px;
      width: 100%;
      font-size: 14px;
    }
    .search .theme--light.v-input{
      font-size: 14px;
    }
    .search-select{
      width: 86px;
    }
    .search-btn{
      width: 54px;
    }

    .comparison-writer-header{
      width: 90%;
    }
  }
</style>