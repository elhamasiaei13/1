import requireAll from 'services/requireAll';

let plugins = [];

requireAll(require.context('./', true, /\/plugin\.js$/)).map(({data}) => {
  plugins.push(data);
});

// console.log(plugins);

export default plugins;
