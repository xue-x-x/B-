import formatNumber from "../utils/format-number";
function drawChart(data) {
  let source =[
    [],
    ['粉丝数'],
    ['播放数'],
    ['点赞数'],
    ['收藏数']
  ];

  let dimensions = data.map(e => {
    source[1].push(e.data.fans);
    source[2].push(e.data.archiveView);
    source[3].push(e.data.like);
    source[4].push(e.data.favorite);
    return e.name;
  });
  source[0] = dimensions;
  dimensions.unshift('product');

  let Chart = {
    legend: {},
    tooltip: {},
    dataset: {
      dimensions: dimensions,
      source: source
    },
    xAxis: {type: 'category'},
    yAxis: [
      {
        type: "value",
        min: "dataMin",
        axisLabel: {
          formatter: formatNumber
        }
      }
    ],
    series: [
      {
        type: 'bar',
        color: '#1e88e5'
      },
      {
        type: 'bar',
        color: '#2b821d'
      }
    ]
  };
  return Chart;
}
export default drawChart;
