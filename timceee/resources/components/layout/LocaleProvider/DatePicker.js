import CalendarLocale from './Calendar';
import TimePickerLocale from './TimePicker';

export default {
  lang: {
    placeholder: app.translate('main.Select date'),
    rangePlaceholder: [app.translate('main.Start date'), app.translate('main.End date')],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};
