import { format } from 'date-fns';
import formatNumber from "../utils/format-number";
function drawChart(data, type = "line", areaStyle) {
    let legendData = [];
    let xAxisData = [];
    let series = data.map(e => {
      let dataData = [];
      xAxisData = [];
        if(e[0] !== undefined){
            e[0].map(item => {
                xAxisData.push(item[0]);
                dataData.push(item[1]);
                // return [item[0], item[1]];
            });
        }
        legendData.push(e[1]);
        let data = {
            name: e[1],
            data: dataData,
            color: e[2],
            type: type,
            smooth: true,
            showSymbol: false,
        };
        if(areaStyle){
            data['areaStyle'] = {}
        }
        return data;
    });
    let Chart =  {
      tooltip: {
        trigger: 'axis',
        formatter: '{b0}<br/>{a0}: {c0}%<br />{a1}: {c1}%<br />{a2}: {c2}%'
      },
      legend: {
        data: legendData
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxisData,
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          textStyle: {
            color: "#4572A7"
          },
          show: true,
          interval: "auto",
          formatter: "{value}%"
        },
      },
      series: series
    };
    return Chart;
}
export default drawChart;
