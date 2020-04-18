import {Data} from 'routes/Home/Attendance/Device/Modules/Components';

@autobind
/**
 *
 */
export default class Send extends Data.Integration {
  /**
   *
   * @param {Function} [callback=(function())]
   */
  submit(callback = () => {
  }) {
    const _this = this.getWrappedInstance();
    const {request, device} = _this.props;

    let loader = app.loading(app.translate('routes.home.attendance.device.Sending Fingerprints'));

    request(device.id, 'setFingerprints', {users: _this.usersList.getSelected()}, (err) => {
      loader.hide(() => {
        if (err) {
          return app.message(app.translate('routes.home.attendance.device.Sending Fingerprints Failed'), 'error');
        }

        app.message(app.translate('routes.home.attendance.device.Sending Fingerprints Was Successful'));
      });

      callback();
    });
  }
}
