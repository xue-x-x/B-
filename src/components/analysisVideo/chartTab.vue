<template>
  <div>
    <v-row>
      <v-col :order="data.order" cols="12" :md="md">
        <v-card>
          <v-card-text>
            <Chart
                    class="mb-2"
                    :autoresize="true"
                    :options="data.option"
                    style="width: 100%;height: 400px"
                    @click="fnClick"
            />

          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" :md="md">
        <v-card>
          <v-card-text>
            <p class="table-title">{{data.title}}</p>
            <div style="overflow: auto">
              <AVtab :class="[data.auto ? 'avtab' : '']" :tab="data.tab"></AVtab>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    name: "",
    props:{
      data: {
        type: Object,
        default: {},
      },
    },
    components: {
      AVtab: () => import('@/components/analysisVideo/tab')
    },
    data() {
      return {
        md: 6,
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
      }
    },
    computed: {},
    methods: {
      fnClick(event) {
        console.log(event);
      },
      fnReload(n) {
        console.log(n);
        let self = this;
        self.isShow = false;
        self.$nextTick(() => {
          self.isShow = true;
        })
      }
    },
    mounted() {
      let self = this;
      self.md  = self.data.tab.tbody[0] && self.data.tab.tbody[0].title && self.data.tab.tbody[0].date ? 12 : self.md
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