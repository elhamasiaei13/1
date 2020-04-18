import moment from 'moment';

moment.locale(app.lang.locale);

import Pagination from './Pagination';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import Calendar from './Calendar';

export default {
  locale: app.lang.locale,
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: app.translate('main.Filter menu'),
    filterConfirm: app.translate('main.OK'),
    filterReset: app.translate('main.Reset'),
    emptyText: app.translate('main.No data'),
    selectAll: app.translate('main.Select current page'),
    selectInvert: app.translate('main.Invert current page'),
  },
  Modal: {
    okText: app.translate('main.OK'),
    cancelText: app.translate('main.Cancel'),
    justOkText: app.translate('main.OK'),
  },
  Popconfirm: {
    okText: app.translate('main.OK'),
    cancelText: app.translate('main.Cancel'),
  },
  Transfer: {
    notFoundContent: app.translate('main.Not Found'),
    searchPlaceholder: app.translate('main.Search here'),
    itemUnit: app.translate('main.Item'),
    itemsUnit: app.translate('main.Items'),
  },
  Select: {
    notFoundContent: app.translate('main.Not Found'),
  },
  Upload: {
    uploading: `${app.translate('main.Uploading')}...`,
    removeFile: app.translate('main.Remove file'),
    uploadError: app.translate('main.Upload error'),
    previewFile: app.translate('main.Preview file'),
  },
};
