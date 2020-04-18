import {Data} from 'routes/Home/Attendance/Device/Modules/Components';

@autobind
/**
 *
 */
export default class Receive extends Data.Integration {
  /**
   *
   * @param {Function} [callback=(function())]
   */
  submit(callback = () => {
  }) {
    const _this = this.getWrappedInstance();
    const {request, device} = _this.props;

    let loader = app.loading(app.translate('routes.home.attendance.device.Getting Cards'));

    request(device.id, 'getCards', {users: _this.usersList.getSelected()}, (err) => {
      loader.hide(() => {
        if (err) {
          return app.message(app.translate('routes.home.attendance.device.Getting Cards Failed'), 'error');
        }

        app.message(app.translate('routes.home.attendance.device.Getting Cards Was Successful'));
      });

      callback();
    });
  }
}
