<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <Chart
                    class="mb-2"
                    :autoresize="true"
                    :options="timeOption"
                    style="width: 100%"
            />
          </v-card-text>
        </v-card>
        <v-card class="mt-4">
          <v-card-text>
            <AVtab></AVtab>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import getOptions from "../../charts/cloud-charts.js";
  export default {
    name: "",
    props:{
      aid: {
        type: Number,
        default: 0,
      },

    },
    components: {
      AVtab: () => import('@/components/analysisVideo/tab'),
    },
    data() {
      return {
        timeOption: {},
        options:{}
      }
    },
    watch: {},
    computed: {},
    methods: {

    },
    mounted() {
      this.options = getOptions([{ name: '暂无数据', value: 0 }]);
    }
  }
</script>

<style scoped>

</style>