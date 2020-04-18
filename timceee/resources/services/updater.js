import React from 'react';
import axios from 'axios';
import config from 'config/app';

let newVersion = [1, '0.1.0'];
let message = () => {
};

/**
 *
 */
function check() {
  axios.get(config.url)
    .then((res) => {
      let version = /<meta name="version" content="(.*)">/.exec(res.data)[1];

      version = version.split(';');

      version[0] = version[0] * 1;

      if (version[0] <= config.version) {
        message();
        message = () => {
        };

        newVersion = [1, '0.1.0'];

        return;
      }

      if (version[0] === newVersion[0]) {
        return;
      }

      newVersion = version;

      message();
      message = app.message(<span>
          {app.translate('main.Update Available')}
        &nbsp;
        (
        &nbsp;
        <a
          dir="ltr"
          onClick={() => location.reload(true)}
        >
             {newVersion[1]}
          </a>
        &nbsp;
        )
        </span>, 'info', 0);
    })
    .catch(() => {
      message();
      message = () => {
      };

      newVersion = [1, '0.1.0'];
    });
}

setInterval(() => check(), config.checkInterval);

check();
