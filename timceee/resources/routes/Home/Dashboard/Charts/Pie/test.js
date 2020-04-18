app.mock.onPost('/runRule/pie').reply(function (config) {
  console.warn('pie chart api tests');
  return [200, JSON.stringify({
    subtitle: 'test123',
    data: [{
      name: 'Brands',
      colorByPoint: true,
      data: [{
        name: 'Microsoft Internet Explorer',
        y: 56.33,
      }, {
        name: 'Chrome',
        y: 24.03,
        sliced: true,
        selected: true,
      }, {
        name: 'Firefox',
        y: 10.38,
      }, {
        name: 'Safari',
        y: 4.77,
      }, {
        name: 'Opera',
        y: 0.91,
      }, {
        name: 'Proprietary or Undetectable',
        y: 0.2,
      }],
    }],
  })];
});
