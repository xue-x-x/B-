<template>
  <v-responsive :aspect-ratio="aspectRatio" :style="`max-height:${height}px`">
    <Chart :autoresize="true" :theme="theme" :options="options" />
  </v-responsive>
</template>

<script>
  export default {
    name: "",
    props: {
      options: {
        type: Object,
        default: function() {
          return {};
        }
      },
      height: {
        type: Number,
        default: function() {
          return this.$vuetify.breakpoint.mdAndDown ? 220 : 300;
        }
      },
    },
    data() {
      return {
        theme: "colorful",
        siteGroupInfo: undefined
      };
    },
    computed: {
      aspectRatio() {
        if (document.body.clientWidth > 768) {
          return 2;
        } else {
          return 5 / 3;
        }
      },
    },
    methods: {},

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
  .echarts{
    width: 100%;
    height: 100%;
  }
</style>