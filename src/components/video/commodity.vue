<template>
  <div>{{msg}}</div>
  <!--<someComponent></someComponent>-->
</template>

<script>
  //import someComponent from './someComponent'
  export default {
    name: "",
    data() {
      return {
        msg: "商品详情"
      }
    },
    methods: {},
    component: {
      //someComponent
    }
  }
</script>

<style scoped>

</style>