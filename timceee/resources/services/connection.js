let message;
let online = false;
let offline = false;

window.addEventListener('online', () => {
  if (message) {
    offline = false;
    message();
  }

  if (!online) {
    online = true;
    message = app.message(app.translate('main.Online'), 'info');
  }
});

window.addEventListener('offline', () => {
  if (message) {
    online = false;
    message();
  }

  if (!offline) {
    offline = true;
    message = app.message(app.translate('main.Offline'), 'warning', 0);
  }
});
