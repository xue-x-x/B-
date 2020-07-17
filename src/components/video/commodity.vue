<template>
  <div>
    <v-card>
      <v-row class="wrap">
        <v-col class="commodity">
          <img class="commodity-img" src="http://image.yzmg.com/202007/15/11-29-07-62-10480275.png" alt="">
          <div class="commodity-introduce text-left">
            <p class="commodity-introduce-title">唐麦 W5动铁蓝牙耳机</p>
            <p class="commodity-introduce-money">商品售价：<span>￥399.00</span></p>
            <!--<p class="commodity-introduce-sales">全网销量：<span>123456778</span></p>-->
            <p class="commodity-introduce-sales">全网销量：123456778</p>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="mt-4">
      <v-row class="text-left">
        <v-col cols="12">
          <h3 class="px-5 py-1">同商品视频</h3>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="12" md="10">
              <img src="" alt="">
              <div>

              </div>
            </v-col>
            <v-col cols="12" md="2"></v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
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
  /* 商品 */
  .commodity{
    position: relative;
    padding: 32px 0 32px 250px;

  }
  .commodity-img{
    position: absolute;
    top: 50%;
    left: 20px;
    margin-top: -56px;
    width: 200px;
    height: 112px;
  }
  .commodity-introduce span{
    font-size: 20px;
    font-weight: bolder;
  }
  .commodity-introduce-title{
    font-weight: bolder;
    color: #000;
    font-size: 18px;
  }
  .commodity-introduce-money span{
    color: #e53935;
  }
  h3{
    font-size: 20px;
    font-weight: bold;
    color: #1e88e5;
    border-bottom: 2px solid #1e88e5;
  }

</style>