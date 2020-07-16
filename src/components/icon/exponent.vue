<template>
  <div>
    <span class="mg-exponent" :class="mgExponent[index].className">
      <i></i>{{mgExponent[index].title}}
    </span>
  </div>

</template>

<script>
  //import someComponent from './someComponent'
  export default {
    name: "",
    props: {
      index: {
        type: Number
      },
    },
    data() {
      return {
        mgExponent: {
          1:{
            className: 'worse',
            title: '较差',
          },
          2:{
            className: 'ordinary',
            title: '一般',
          },
          3:{
            className: 'good',
            title: '较好',
          },
          4:{
            className: 'excellence',
            title: '优秀',
          },
          5:{
            className: 'wonderfulness',
            title: '极好',
          },
        },
      }
    },
    methods: {},
  }
</script>

<style scoped>
  .mg-exponent{
    position: relative;
    padding-left: 30px;
    display: inline-block;
    width: 70px;
    height: 24px;
    line-height: 24px;
    border-radius: 12px;
    font-size: 14px;
  }
  .mg-exponent i{
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  .wonderfulness{
    color: #43a047 !important;
    background-color: #e8f5e9;
  }
  .wonderfulness i{
    background: url("../../assets/icon/wonderfulness.png") no-repeat;;
    background-size: 100% 100%;
  }
  .excellence{
    color: #43a047 !important;
    background-color: #e8f5e9;
  }
  .excellence i{
    background: url("../../assets/icon/excellence.png") no-repeat;;
    background-size: 100% 100%;
  }
  .good{
    color: #ffab40 !important;
    background-color: #fff3e0;
  }
  .good i{
    background: url("../../assets/icon/good.png") no-repeat;;
    background-size: 100% 100%;
  }
  .ordinary{
    color: #f4511e !important;
    background-color: #fbe9e7;
  }
  .ordinary i{
    background: url("../../assets/icon/ordinary.png") no-repeat;;
    background-size: 100% 100%;
  }
  .worse{
    color: #f4511e !important;
    background-color: #fbe9e7;
  }
  .worse i{
    background: url("../../assets/icon/worse.png") no-repeat;;
    background-size: 100% 100%;
  }
</style>