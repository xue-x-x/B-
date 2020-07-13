<template>
  <div class="aird-digitalscroll">
    <p
            v-for="(item,index) in computeNumber"
            :key="index"
            class="aird-digitalscroll__item"
    >
      <span ref="numberDom">0123456789</span>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'BusiDigitalScroll',
    props: {
      number: {
        type: Number,
        default: 0,
      },
    },
    data () {
      return {
        maxLen: 10, //最大长度
        computeNumber: [], //数字补零后分割为数组，遍历
        timeTicket: null,
      };
    },
    watch: {
      number () {
        this.refresh();
      },
    },
    mounted () {
      this.refresh();
      // this.increaseNumber();
    },
    destroyed () {
      window.clearTimeout(this.timeTicket);
      this.timeTicket = null;
    },
    methods: {
      /**
       * @description: 数字补零操作，返回数组
       * @param {number} num 被操作数
       * @param {number} n 总长度
       * @return:
       */

      prefixZero (num, n) {
        return (Array(n).join('') + num).slice(-n).split('');
        //   return num.slice(-n).split("");
      },
      /**
       * @description: 获取随机数
       * @param {type}
       * @return:
       */
      getRandomNumber (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      },
      // 设置每一位数字的偏移
      setNumberTransform () {
        const numberItems = this.$refs.numberDom;
        for (let index = 0; index < numberItems.length; index++) {
          const elem = numberItems[index];
          elem.style.transform = `translate(-50%,-${Number(
            this.computeNumber[index]
          ) * 10 - 2}%`;
        }
      },
      // 定时增长数字
      increaseNumber () {
        this.refresh();
        this.timeTicket = setTimeout(this.increaseNumber, 1000);
      },
      // 定时刷新数据
      refresh () {
        this.computeNumber = this.prefixZero(this.number, this.maxLen);
        this.$nextTick(() => this.setNumberTransform());
      },
    },
  };
</script>

<style scoped>
  .aird-digitalscroll {
    display: flex;
    justify-content: center;
    line-height: 100%;
    height: 100%;
  }
  .aird-digitalscroll p {
    position: relative;
    margin: 0 5px 0 0;
    display: inline-block;
    width: 24px;
    height: 46px;
    color: #fffffe;
    text-align: center;
    writing-mode: vertical-lr;
    text-orientation: upright;
    overflow: hidden;
    border-radius: 5px;
    background-color: #2a3242;
  }
  .aird-digitalscroll p:last-child {
     margin-right: 0;
   }
  .aird-digitalscroll span {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 2%);
    transition: transform 2s ease 1s;
    letter-spacing: 10px;
    font-size: 28px;
    font-weight: bold;
    color: #9694ff;
  }
</style>
