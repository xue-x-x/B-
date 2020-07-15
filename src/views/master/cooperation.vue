<template>
  <div class="wrap">
    <v-card class="container mt-10">
      <div class="container-title mb-4">亿智蘑菇官方约稿服务</div>
      <div class="container-synopsis">
        <p><span>安全放心：</span>佣金由独立的第三方进行担保监管，保障厂商和达人双方的利益！</p>
        <p><span>专业服务：</span>从合作谈判到视频跟稿、视频发布、数据统计、分析反馈全程都有专业人员进行，让厂商更加省心省力！</p>
        <p><span>收费透明：</span>没有中间商赚差价，约稿服务仅向厂商收取6%的信息服务费，无二次收费！</p>
      </div>
      <div class="container-from px-4 px-md-8 py-4">
        <div class="mt-1 from-title">提交您的相关信息</div>
        <div class="mt-1 from-title">稍后会有专员与您联系</div>
        <div class="input-list">
          <label for="username">
            <span>您的称呼：</span>
            <input id="username" type="text" v-model="username" autocomplete="off" placeholder="请输入您的称呼">
          </label>
          <label for="tel">
            <span>联系方式：</span>
            <input id="tel" type="text" v-model="tel" maxlength="11" autocomplete="off" placeholder="请输联系方式">
          </label>
          <label for="productType">
            <span>产品类型：</span>
            <input id="productType" type="text" v-model="productType" autocomplete="on" placeholder="请输入产品类型">
          </label>
        </div>
        <div class="textarea-box">
          <label for="content">
            <span>需求简介：</span>
            <textarea name="" id="content" v-model="content" placeholder="请简单介绍您的品牌、推广需求、推广预算等信息"></textarea>
          </label>
        </div>
        <div class="btn-box">
          <v-btn color="red darken-2" dark @click="submit">确认提交</v-btn>
        </div>
      </div>
    </v-card>
    <div class="overlay-box">
      <v-overlay :value="overlay" color="#000" opacity="0.8">
        {{tooltipText}}
      </v-overlay>
    </div>
    <v-overlay :value="successOverlay" color="#000" opacity="0.6">
      <div class="success-box">
        <v-icon size="100px" color="green">mdi-check-circle</v-icon>
        <p class="mt-3">提交成功</p>
        <v-btn class="mt-12" min-width="160" color="blue darken-2" dark @click="setSuccessOverlay">确定</v-btn>
      </div>
    </v-overlay>
  </div>
</template>

<script>

  export default {
    name: "",
    data() {
      return {
        id: "",
        username: "",
        tel: "",
        productType: "",
        content: "",
        overlay: false,
        successOverlay: false,
        tooltipText: "请将信息填写完整",
      }
    },
    computed:{
      testTel (){
        return /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/.test(this.tel);
      },
    },
    watch:{
      overlay(val) {
        let self = this;
        if(val){
          setTimeout(function () {
            self.overlay = false
          },1500)
        }
      }
    },
    methods: {
      submit(){
        let self = this;
        let pubtime = new Date();
        pubtime = pubtime.toLocaleString();
        if(!self.username || !self.tel || !self.productType){
          self.overlay = true;
          return;
        }else if(!self.testTel){
          self.tooltipText = "请填写正确的联系方式";
          self.overlay = true;
          return
        }
        self.axios.post(`/api/site/saveCooperation`,{
          params: {
            id: self.id,
            content: self.content,
            productType: self.productType,
            tel: self.tel,
            username: self.username,
            pubtime: pubtime,
          }
        }).then(r => {
          let data = r.data;
          if(data.success){
            self.successOverlay = true;
          }
        });

      },
      setSuccessOverlay(){
        this.successOverlay = false;
        this.username =  "";
        this.tel =  "";
        this.productType =  "";
        this.content =  "";
      },
    },
    mounted (){
      let self = this;
      self.id = self.$route.query.id;
    }
  }
</script>

<style scoped>
  .container{
    padding: 32px 100px 100px 100px;
  }
  .container-title{
    text-align: center;
    font-size: 24px;
    font-weight: bold;
  }
  .container-synopsis{
    text-align: left;
  }
  .container-synopsis p{
    color: #474747;
  }
  .container-from{
    margin-bottom: 20px;
    border: 1px solid #ccc;
  }
  .from-title{
    font-weight: bold;
  }
  .input-list{
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
  }
  label{
    display: block;
    font-size: 15px;
    text-align: left;
  }
  .input-list label input{
    padding: 0 5px;
    width: 60%;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: #666;
    outline: none;
  }
  .textarea-box{
    margin-top: 20px;
  }
  .textarea-box span{
    vertical-align: top;
  }
  .textarea-box textarea{
    padding: 5px;
    width: calc(100% - 114px);
    height: 300px;
    color: #666;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    resize: none;
  }
  .btn-box{
    margin: 20px 0 30px 0;
  }
  .overlay-box{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 100;
    min-width: 200px;
    min-height: 60px;
    border-radius: 10px;
    overflow: hidden;
  }
  .success-box{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 100;
    padding: 50px;
    width: 360px;
    height: 400px;
    background-color: #fff;
  }
  .success-box p{
    margin-top: 20px;
    color: #333;
    font-size: 28px;
  }
  .success-box .v-btn{
    font-size: 18px;
  }
  @media screen and (max-width: 750px){
    .container{
      padding: 32px 20px;
    }
    .input-list{
      display: block;
    }
    .input-list label{
      margin-bottom: 10px;
    }
    .input-list label input, .textarea-box textarea{
      width: 70%;
    }
    .textarea-box textarea{
      height: 150px;
    }
    .success-box{
      padding: 50px;
      width: 260px;
      height: 60vh;
    }
  }
</style>