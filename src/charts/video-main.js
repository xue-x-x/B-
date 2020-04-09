var parse = require("date-fns/parse");
import { format } from 'date-fns';
var { convertDateToUTC } = require("./util/convertDateToUTC");

function drawChart(data) {
  var datedelta = data.data.length ? parse(data.data[data.data.length - 1].day) - parse(data.datetime) : 0;

  if (datedelta < 60 * 60 * 24 * 30 * 1000) {
    data.data.unshift({
      view: 0,
      danmaku: 0,
      like: 0,
      dislike: 0,

      share: 0,
      favorite: 0,
      coin: 0,
      datetime: data.datetime
    });
  }

  data.data.sort((a, b) => {
    return (
      new Date(a.day.replace("+0000", "")) -
      new Date(b.day.replace("+0000", ""))
    );
  });
  console.log(data.data);
  let Chart = {
    title: {
      left: "center",
      top: "-5px"
    },
    dataset: {
      source: data.data
    },
    dataZoom: [
      {
        type: "inside",
        filterMode: "weakFilter"
      },
      {
        handleSize: "100%",
        handleStyle: {},
        bottom: "10px"
      }
    ],
    tooltip: {
      confine: true,
      trigger: "axis",
      axisPointer: {
        label: {
          formatter: function(params) {
            return Math.round(params.value);
          }
        }
      },
      formatter: function(params) {
        let o = params[0].axisValueLabel;
        let tempData = [];

        params.forEach(e => {
          if (null != e.data[e.seriesId])
            tempData.push([e.seriesName, e.color, e.data[e.seriesId]]);
        });
        tempData
          .sort((a, b) => b[2] - a[2])
          .forEach(e => {
            o += `<div>
          <span style="color:${e[1]};width:10px;height:10px"> ● </span>
          <span">${e[0]}: ${e[2]}</span> 
          </div>
          `;
          });
        return o;
      }
    },
    grid: {
      left: "10px",
      right: "10px",
      top: "10px",
      containLabel: true
    },
    xAxis: {
      type: "time",

      axisPointer: {
        label: {
          formatter: function(params) {
            return (
              "日期：" +
              format(
                convertDateToUTC(new Date(params.value)),
                "yyyy-MM-dd HH:mm"
              )
            );
          }
        }
      }
    },
    yAxis: [
      {
        type: "value",
        name: "其他指标",
        min: "dataMin",
        splitLine: {
          show: false
        },
        axisLabel: {
          formatter: function(params) {
            if (params > 10000) {
              return Math.round(params / 100) / 100.0 + "万";
            } else {
              return params;
            }
          }
        }
      },
      {
        type: "value",
        name: "播放量",
        splitLine: {
          show: false
        },
        min: "dataMin",
        axisLabel: {
          formatter: function(params) {
            if (params > 10000) {
              return Math.round(params / 100) / 100.0 + "万";
            } else {
              return params;
            }
          }
        }
      }
    ],

    series: [
      {
        type: "line",
        dimensions: ["day", "view"],
        name: "播放",
        id: "view",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 1
      },
      {
        type: "line",
        dimensions: ["day", "danmaku"],
        name: "弹幕",
        id: "danmaku",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0
      },
      {
        type: "line",
        dimensions: ["day", "coin"],
        name: "硬币",
        id: "coin",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0
      },
      {
        type: "line",
        dimensions: ["day", "favorite"],
        name: "收藏",
        id: "favorite",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0
      },
      {
        type: "line",
        dimensions: ["day", "share"],
        name: "分享",
        id: "share",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0
      },
      {
        type: "line",
        dimensions: ["day", "like"],
        name: "点赞",
        id: "like",
        smooth: false,
        showSymbol: false,
        yAxisIndex: 0
      }
    ]
  };
  return Chart;
}
export default drawChart;
