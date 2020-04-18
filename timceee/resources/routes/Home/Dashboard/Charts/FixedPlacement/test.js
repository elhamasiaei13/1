app.mock.onPost('/runRule/fixedplacement').reply(function (config) {
  console.warn('fixedplacement chart api tests');
  return [200, JSON.stringify({
    subtitle: 'test123',
    xAxis: [
      'Seattle HQ',
      'San Francisco',
      'Tokyo',
    ],
    data: [{
      name: 'Employees11123',
      color: 'rgba(165,170,217,1)',
      data: [150, 73, 20],
      pointPadding: 0.3,
      pointPlacement: -0.2,
    }, {
      name: 'Employees Optimized',
      color: 'rgba(126,86,134,.9)',
      data: [140, 90, 40],
      pointPadding: 0.4,
      pointPlacement: -0.2,
    }, {
      name: 'Profit',
      color: 'rgba(248,161,63,1)',
      data: [183.6, 178.8, 198.5],
      tooltip: {
        valuePrefix: '$',
        valueSuffix: ' M',
      },
      pointPadding: 0.3,
      pointPlacement: 0.2,
    }, {
      name: 'Profit Optimized',
      color: 'rgba(186,60,61,.9)',
      data: [203.6, 198.8, 208.5],
      tooltip: {
        valuePrefix: '$',
        valueSuffix: ' M',
      },
      pointPadding: 0.4,
      pointPlacement: 0.2,
    }],
  })];
});
