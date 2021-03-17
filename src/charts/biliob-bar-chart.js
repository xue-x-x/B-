import { format } from 'date-fns';
import formatNumber from "../utils/format-number";
import { setNumber} from '../utils/chatUtils';
function drawChart(data, title, axisName, isPercent) {
  let parameterData = data;
  let legendData = [];
  let xAxisData = [];
  let series = data.map(e => {
    let dataData = [];
    xAxisData = [];
    if(e.data !== undefined && e.data instanceof Array){
      e.data.map(item => {
        xAxisData.push(item.key);
        dataData.push(item.value);
      });
    }else if(e.data instanceof Object) {
      for (var key in e.data){
        var keyData = isPercent ? e.data[key] * 100 : e.data[key];
        xAxisData.push(key);
        dataData.push(keyData);
      }
    }
    parameterData.length > 1 && legendData.push(e.name);
    let lineData = {
      smooth: true,
      showSymbol: false
    };
    let data = {
      name: e.name,
      data: dataData,
      color: e.color,
      type: e.type,
    };
    if(e.type == 'line') Object.assign(data, lineData);
    return data;
  });
  let formatter = isPercent ? '{value}%' : formatNumber;
  let Chart =  {
    title: {
      text: title,
      left: 'center'
    },
    tooltip: {
      trigger: "axis",
      confine: true,
      formatter: function (params) {
        let tar = params[0];
        if(isPercent){
          return tar.name + ' : ' + (tar.value).toFixed(3) + '%';
        }else {
          return tar.name + ' : ' + setNumber(tar.value);
        }

      }
    },
    grid: {
      left: isMobile() ? '6%': '3%',
      right: '4%',
      bottom: '6%',
      containLabel: true
    },
    legend: {
      data: legendData,
      top: '6%'
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      name: axisName && axisName.xAxisName ? axisName.xAxisName : '',
      nameLocation: 'middle',
      nameGap: 30,
      axisLabel: {    //重点在这一块，其余可以忽略
        interval: 'auto',   //这个一定要有，别忘记了
        rotate: 0,
        textStyle: {
          color: '#000',
          fontSize: 12
        }
      },
    },
    yAxis: {
      type: 'value',
      name: axisName && axisName.yAxisName ? axisName.yAxisName : '',
      nameLocation: 'middle',
      nameGap: 40,
      axisLabel: {
        formatter: formatter
      }
    },
    series: series
  };
  return Chart;
}
function isMobile() {
  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  return flag;
}
export default drawChart;
