function drawChart(data, type = "radar", max = 5) {
  let series = data.map(e => {
    if(e[0] !== undefined){
      e[0].map(item => {
        return [item[0], item[1]];
      });
    }
    let data = {
      name: e[1],
      value: e[0],
    };

    return data;
  });
  let Chart = {
    tooltip: {},
    radar: {
      name: {
        textStyle: {
          color: '#fff',
          backgroundColor: '#999',
          borderRadius: 3,
          padding: [3, 5]
        }
      },
      indicator: [
        { name: '影响力', max: max},
        { name: '互动性', max: max},
        { name: '专业度', max: max},
        { name: '表现力', max: max},
        { name: '性价比', max: max}
      ]
    },
    series: [{
      type: type,
      data: series
    }]
  };
  return Chart;
}
export default drawChart;