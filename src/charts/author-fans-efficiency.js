import { format } from 'date-fns';
var { convertDateToUTC } = require("./util/convertDateToUTC");

function drawChart(data) {
  /*let data = [
    {
      archive: null,
      view: 31834866,
      article: null,
      articleView: 0,
      attention: null,
      datetime: "2020-04-02",
      fans: 3754278,
      like: 5189518,
      mid: null
    },
    {
      archive: null,
      view: 31834866,
      article: null,
      articleView: 0,
      attention: null,
      datetime: "2020-04-01",
      fans: 3737774,
      like: 5155712,
      mid: null
    },
    {
      archive: null,
      view: 31101558,
      article: null,
      articleView: 0,
      attention: null,
      datetime: "2020-03-31",
      fans: 3621337,
      like: 4715434,
      mid: null
    },
    {
      archive: null,
      view: 29956836,
      article: null,
      articleView: 0,
      attention: null,
      datetime: "2020-03-30",
      fans: 3544494,
      like: 4527148,
      mid: null
    }
  ];*/
  data = data.data;
  console.log(data);
  data = data.filter(function(item) {
    return (
      item.fans != null && item.view != null
    );
  });
  console.log(data);
  let fansEfficiency = [];
  var step = 7;
  if (data.length <= 7) {
    step = 1;
  }
  for (let index = step; index < data.length; index++) {
    var efficiency = Math.round(
      (10000 * (data[index].fans - data[index - step].fans)) /
        (data[index].view - data[index - step].view)
    );
    if (efficiency != Infinity && efficiency != -Infinity) {
      fansEfficiency.push([data[index].day, efficiency]);
    }
  }

  let Chart = {
    // legend: {
    //   data: ["万点击涨粉数"],
    //   bottom: "5px"
    // },
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
    xAxis: {
      type: "time",
      axisPointer: {
        label: {
          formatter: function(params) {
            return (
              "日期：" +
              format(convertDateToUTC(new Date(params.value)), "yyyy-MM-dd")
            );
          }
        }
      }
    },
    yAxis: [
      {
        type: "value",
        min: function(value) {
          if (value.min > 0) {
            return 0;
          } else {
            return value.min;
          }
        },
        splitLine: {
          show: true
        }
      }
    ],
    series: [
      {
        name: "万点击涨粉数",
        data: fansEfficiency,
        smooth: true,
        showSymbol: false,
        type: "line",
        smoothMonotone: "x",
        areaStyle: {},
        markLine: {
          label: {
            position: "middle",
            formatter: "平均吸粉率 {c}",

            show: true
          },
          symbol: "",
          data: [
            {
              name: "平均线",
              // 支持 'average', 'min', 'max'
              type: "average",
              lineStyle: { color: "#444" }
            }
          ]
        }
      }
    ]
  };
  return Chart;
}
export default drawChart;
