import {version} from '../../package.json';

const hostName = window.location.hostname;

export default {
  name: app.translate('main.Jahan Gostar Pars Raden'),
  url: `http://${hostName}`,
  versionName: version,
  version: 11,
  checkInterval: 10000 * 1000,
};
