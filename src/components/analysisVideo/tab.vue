<template class="tab-container">
  <v-simple-table class="table" dense fixed-header :height="height">
    <template class="table-container" v-slot:default>
      <thead>
        <tr>
          <th
                  :class="[item.phoneHide ? 'd-none d-sm-table-cell':'']"
                  v-for="(item,index) in tab.thead" :key="index"
          >
            {{item.name}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in tab.tbody" :key="index">
          <td
                  :class="[
                  'text-left',
                  itemN.phoneHide ? 'd-none d-sm-table-cell':'',
                  itemN.value == 'title' ? 'td-title' : '',
                  itemN.value == 'title' && tab.thead.length < 4 ? 'td-title-max' : '',]"
                  v-for="(itemN,indexN) in tab.thead"
                  @click="goTo(item)"
          >
            {{ typeof (item[itemN.value] * 1) === 'number' ?  setNumber(item[itemN.value]) : item[itemN.value]}}
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
  import { setNumber} from '../../utils/chatUtils';
  export default {
    name: "",
    props:{
      tab: {
        type: Object,
        default: {},
      },
      height: {
        type: String,
        default: "368px",
      }
    },
    data() {
      return {

      }
    },
    watch: {},
    computed: {},
    methods: {
      setNumber (n){
        let val = setNumber(n);
        return val;
      },
      goTo (item) {
        let url = '';
        let obj = {};
        if(item.aid){
          url = '/video';
          obj = {
            aid: item.aid
          }
        }else if(item.mid){
          url = '/writer';
          obj = {
            mid: item.mid
          }
        }
        this.$router.push(
          {
            path: url,
            query : obj
          }
        );
      },
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .tab-container{
    overflow: auto;
  }
  .table{
    border: 1px solid #ccc;
  }
  .v-data-table th,.v-data-table td{
    padding: 10px 16px;
    font-size: 14px;
    line-height: 28px;
    display:table-cell;
    vertical-align:middle
  }
  .v-data-table td{
    cursor: pointer;
  }
  .td-title{
    width: 45%;
  }
  .td-title-max{
    width: 64%;
  }
  @media screen and (max-width:750px) {
    .td-title{
      width: 64%;
    }
  }
</style>