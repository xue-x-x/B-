import { format } from 'date-fns';
import formatNumber from "../utils/format-number";
import { setNumber} from '../utils/chatUtils';
function drawChart(data, title, type = "line", areaStyle,) {
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
    title: {
      text: title,
      left: 'center'
    },
    legend: {
      selectedMode: "single"
    },
    grid: {
      left: "10px",
      right: "4%",
      top: "30px",
      containLabel: true
    },
    tooltip: {
      trigger: "axis",
      confine: true,
      formatter: function (params) {
        let tar = params[0];
        return tar.data[0] + ' : ' + setNumber(tar.data[1]);

      }
    },
    xAxis: {
      type: "time",
      axisPointer: {
        label: {
          formatter: function(params) {
            return "日期：" + format(params.value, "yyyy-MM-dd");
          }
        }
      }
    },
    yAxis: {
      type: "value",
      min: "dataMin",
      axisLabel: {
        formatter: formatNumber
      }
    },
    series: series
  };
  return Chart;
}
export default drawChart;
