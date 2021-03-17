<template>
  <div>
    <v-row>
      <v-col cols="12" md="6" v-for="(item,index) in data.option" :key="index">
        <v-card>
          <v-card-text>
            <Chart
                    class="mb-2"
                    :autoresize="true"
                    :options="item"
                    style="width: 100%;height: 400px"
                    @click="setViews"
            />

          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="12">
        <v-card>
          <v-card-text>
            <p class="table-title">{{tableData.title}}</p>
            <div style="min-height: 300px;position: relative">
              <AVtab :class="[data.auto ? 'avtab' : '']" :tab="tableData.tab" :height="height"></AVtab>
              <v-overlay :value="overlay" :absolute="true" opacity="0">
                <v-progress-circular indeterminate color="#f67065" size="64"></v-progress-circular>
              </v-overlay>
            </div>
            <v-container>
              <v-row justify="center">
                <v-col cols="8">
                  <v-container class="max-width">
                    <v-pagination
                            v-model="page"
                            class="my-4"
                            color="#1e88e5"
                            :disabled="overlay"
                            :length="tableData.totalpage * 1"
                    ></v-pagination>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import {setNum} from "../../utils/chatUtils";
  export default {
    name: "",
    props:{
      data: {
        type: Object,
        default: {},
      },
      tableData: {
        type: Object,
        default: {},
      },
      overlay: {
        type: Boolean,
        default: false,
      }
    },
    components: {
      AVtab: () => import('@/components/analysisVideo/tab')
    },
    data() {
      return {
        md: 6,
        page: 1,
        height: "auto"
      }
    },
    watch: {
      data: {
        handler: function (val, oldVal) {
          let self = this;
          let tabData = null;
          if(val.tab.tbody[0]){
            tabData = JSON.parse(JSON.stringify(val.tab.tbody[0]));
            self.md  = tabData.title && tabData.date ? 12 : self.md
          }
        },
        deep: true
      },
      page: function (val) {
        this.setPage(val);
      }
    },
    computed: {},
    methods: {
      setViews(event) {
        let num = setNum(event.name);
        this.page = 1;
        this.$emit('setViews', num);
      },
      setPage (val){
        this.$emit('setPage', val);
      },
      fnReload(n) {
        let self = this;
        self.isShow = false;
        self.$nextTick(() => {
          self.isShow = true;
        })
      }
    },
    mounted() {
      let self = this;
    }
  }
</script>

<style scoped>
  .table-title{
    font-size: 18px;
    color: #333;
    font-weight: bolder;
    text-align: center;
  }

  @media screen and (max-width:750px) {
    .avtab{
      width: 970px;
    }
  }
</style>