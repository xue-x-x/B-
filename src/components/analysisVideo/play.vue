<template>
  <div>{{msg}}</div>
  <!--<someComponent></someComponent>-->
</template>

<script>
  //import someComponent from './someComponent'
  export default {
    name: "",
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

</style>