app.mock.onPost('/runRule/spider').reply(function(config) {
  console.warn('spider chart api tests');
  return [200, JSON.stringify({
    subtitle: 'test123',
    xAxis:['test1', 'test2', 'test3', 'test4', 'test5'],
      data:[{
        name: 'Name1',
        data: [5, 3, 4, 7, 2],
        pointPlacement: 'on',
      }, {
        name: 'Name2',
        data: [2, 2, 3, 2, 1],
        pointPlacement: 'on',
      }, {
        name: 'Name3',
        data: [3, 4, 4, 2, 5],
        pointPlacement: 'on',
      }],
  })];
});
