<template>
  <div>
    <img class="icon-noHave" src="../../assets/icon/noData.png" alt="">
    <p class="fs_30 mt-4 color-6">{{title}}</p>
  </div>
</template>

<script>
  export default {
    name: "",
    props: {
      title: {
        type: String,
        default: '暂无数据'
      }
    },
    components: {
      //someComponent: () => import('@/components/someComponent'),
    },
    data() {
      return {
        msg: "Hello Vue.js"
      }
    },
    watch: {},
    computed: {},
    methods: {},
    mounted() {

    }
  }
</script>

<style scoped>
  .icon-noHave{
    margin: 10% auto 0 auto;
    width: 280px;
  }
  .fs_30{
    font-size: 30px;
  }
  @media screen and (max-width:768px) {
    .icon-noHave{
      width: 180px;
    }
    .fs_30{
      font-size: 20px;
    }
  }
</style>