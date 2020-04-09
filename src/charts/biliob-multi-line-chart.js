import { format } from 'date-fns';
import formatNumber from "../utils/format-number";
function drawChart(data, type = "line", areaStyle) {

  let series = data.map(e => {
    if(e[0] !== undefined){
      e[0].map(item => {
        return [item[0], item[1]];
      });
    }
    let data = {
      name: e[1],
      data: e[0],
      smooth: true,
      showSymbol: false,
      color: e[2],
      type: type
    };
    if(areaStyle){
      data['areaStyle'] = {}
    }
    return data;
  });

  let Chart = {
    legend: {
      selectedMode: "single"
    },
    grid: {
      left: "10px",
      right: "50px",
      top: "30px",
      containLabel: true
    },
    dataZoom: [
      {
        type: "inside",
        filterMode: "weakFilter"
      },
      {
        handleSize: "100%",
        handleStyle: {},
        bottom: "20px"
      }
    ],
    tooltip: {
      trigger: "axis",
      confine: true,
      axisPointer: {
        label: {
          formatter: function(params) {
            return Math.round(params.value);
          }
        }
      }
    },
    xAxis: {
      type: "time",
      axisPointer: {
        label: {
          formatter: function(params) {
            return "日期：" + format(params.value, "yyyy-MM-dd HH:mm");
          }
        }
      }
    },
    yAxis: [
      {
        type: "value",
        min: "dataMin",
        axisLabel: {
          formatter: formatNumber
        }
      }
    ],
    series: series
  };
  return Chart;
}
export default drawChart;
