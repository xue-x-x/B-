import { format } from 'date-fns';
import formatNumber from "../utils/format-number";
import { setNumber} from '../utils/chatUtils';
function drawChart(dataObj,legendShow = true) {
  let legendData = [];
  let seriesData = [];
  let label = {
    formatter: '{b}:{d}%',
    rich: {
      b: {
        fontSize: 14,
        lineHeight: 28
      }
    }
  };
  if(dataObj.data !== undefined && dataObj.data instanceof Array){
    dataObj.data.forEach(function (item) {
      let value = Number(item.value);
      if(String(Number(item.value)).indexOf(".") != -1){
        value = Number(item.value).toFixed(3);
      }
      legendData.push(item);
      seriesData.push({value: value, name: item.name});
    })
  }else if(dataObj.data instanceof Object){
    for (let item in dataObj.data){
      let value = Number(dataObj.data[item]).toFixed(3);
      legendData.push(item);
      seriesData.push({value: value, name: item});
    }
  }

  let Chart = {
    title: {
      text: dataObj.title,
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        let tar = params;
        return `${dataObj.name}<br/>${tar.name} : ${formatNumber(tar.value)}(${tar.percent})%`;
      }
    },
    legend: {
      show: legendShow,
      left: 'center',
      bottom: 0,
      data: legendData
    },
    series: [
      {
        type: 'pie',
        radius: '55%',
        center: ['50%', '46%'],
        label: dataObj.labelShow ? label : {},
        data: seriesData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        itemStyle: dataObj.itemStyle,
      }
    ]
  };
  return Chart;
}
export default drawChart;
