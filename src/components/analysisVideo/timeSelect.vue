<template>
  <div>
    <v-select
            class="fs_14 my-2"
            v-model="channelsIndex"
            :items="channels"
            item-value="index"
            item-text="title"
            label="日期"
            solo
            @input="changeSelect"
    ></v-select>
  </div>
</template>

<script>
  export default {
    name: "",
    props:{
      onlyShow: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        length: 6,
        year: null,
        month: null,
        channels: [],
        channelsIndex: '',
      }
    },
    watch: {},
    computed: {},
    methods: {
      getTime() {
        let self = this;
        let date = new Date;
        self.year = date.getFullYear();
        self.month = date.getMonth() + 1;
        self.setTime();
      },
      setTime(){
        let self = this;
        let title;
        var year, maxYear, minYear, month, maxMonth, minMonth, starttime, endtime;
        for (var i = 0; i < self.length; i++){
          month = self.month - i > 0 ? self.month - i : 12 + self.month - i;
          year = self.month - i > 0 ? self.year : self.year - 1;
          maxMonth = self.month - (i + 1);
          minMonth = maxMonth - 2;
          maxYear = maxMonth > 0 ? self.year : self.year - 1;
          minYear = minMonth > 0 ? self.year : self.year - 1;
          maxMonth = maxMonth > 0 ? maxMonth : 12 + maxMonth;
          minMonth = minMonth > 0 ? minMonth : 12 + minMonth;
          starttime =`${minYear}-${minMonth < 10 ? `0${minMonth}` : minMonth}`;
          endtime =`${maxYear}-${maxMonth < 10 ? `0${maxMonth}` : maxMonth}`;

          title = self.onlyShow ? `${maxYear}-${maxMonth < 10 ? `0${maxMonth}` : maxMonth}` : `${minYear}-${minMonth < 10 ? `0${minMonth}` : minMonth} 至 ${maxYear}-${maxMonth < 10 ? `0${maxMonth}` : maxMonth}`;
          self.channels.push(
            {
              title: title,
              month: self.onlyShow ? maxMonth : month,
              year: self.onlyShow ? maxYear : year,
              index: i,
              starttime: starttime,
              endtime: endtime,
            }
          );

        }
        self.$emit('setTime', self.channels[0]);
      },
      changeSelect() {
        let self = this;
        self.$emit('setTime',self.channels[self.channelsIndex]);
      }
    },
    mounted() {
      this.getTime();
    }
  }
</script>

<style scoped>

</style>