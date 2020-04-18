function _MockData(start, all) {
  let data = [];

  for (let i = start; i <= all; i++) {
    data.push({
      id: 752 + i,
      position_id: 2,
      user_id: 1,
      substitute_id: null,
      key: '1234-201708-54223',
      active: 1,
      done: 0,
      request_type_id: 3,
      description: 'صدور فاکتور ' + i,
      status: 'در حال انتظار',
      created_at: '2017-08-03 14:27:03',
      updated_at: '2017-08-03 14:27:03',
      reject_reasons: [],
      type: {
        id: 23,
        form_id: 7,
        request_type_id: null,
        rule_id: 75,
        rule: {
          id: 75,
          filename: '59423312dbbfb',
          name: 'اضافه کار ساعتی'+i,
          is_report: 0,
          description: null,
          created_at: '2017-06-15 07:11:14',
          updated_at: '2017-06-15 07:11:14',
          deleted_at: null,
          visible: 1,
          is_private: 0,
          rule_module_id: 2,
          module: {
            id: 2,
            name: 'Requests',
            description: null,
            rule_module_id: null,
            created_at: null,
            updated_at: null,
          },
        },
      },
      sender: {
        id: 2,
        title: 'مدیریت',
        position_id: 1,
        type: 'post',
        user_id: 1,
        enabled: 1,
        shift_id: null,
        deleted_at: null,
        created_at: null,
        updated_at: null,
        roles: null,
        shift: null,
      },
      user: {
        id: 1,
        personnel_id: '1',
        company_id: 1,
        insurance_id: null,
        first_name: 'admin',
        last_name: 'admin',
        father_name: null,
        national_code: '1',
        internal_line: null,
        birthday: null,
        birth_certificate_number: '1',
        birth_place: null,
        birth_register_place: null,
        nationality: 'ایرانی',
        married: 1,
        gender: 'male',
        active: null,
        is_member: 1,
        email: 'supervisor@jahangostarpars.com',
        address: null,
        identification_code: '1',
        card_number: null,
        allow_finger: 1,
        allow_card: 0,
        allow_code: 0,
        verify_card: 0,
        shift_id: null,
        deleted_at: null,
        created_at: null,
        updated_at: '2017-05-09 13:03:11',
        has_insurance: 0,
        profile: null,
        military: null,
        education: null,
        recruitment: null,
        rate: null,
        leaving_date: null,
        leaving_reason: null,
        children: null,
        groups: [],
        phones: [],
        insurance: null,
        financial_infos: [],
        contracts: [],
        shift: null,
      },
      values: [
        {
          id: 2373,
          request_id: 752,
          field_id: 16,
          value: '2017-08-03 14:26:38',
          created_at: '2017-08-03 14:27:03',
          updated_at: '2017-08-03 14:27:03',
          field: {
            id: 16,
            name: 'date',
            type: 'DatePicker',
            form_id: 7,
            created_at: '2016-12-26 13:05:37',
            updated_at: '2016-12-26 13:05:37',
          },
        },
        {
          id: 2374,
          request_id: 752,
          field_id: 17,
          value: '13:30:00',
          created_at: '2017-08-03 14:27:03',
          updated_at: '2017-08-03 14:27:03',
          field: {
            id: 17,
            name: 'timeFrom',
            type: 'TimePicker',
            form_id: 7,
            created_at: '2016-12-26 13:05:55',
            updated_at: '2016-12-26 13:05:55',
          },
        },
        {
          id: 2375,
          request_id: 752,
          field_id: 18,
          value: '14:30:00',
          created_at: '2017-08-03 14:27:03',
          updated_at: '2017-08-03 14:27:03',
          field: {
            id: 18,
            name: 'timeTo',
            type: 'TimePicker',
            form_id: 7,
            created_at: '2016-12-26 13:06:00',
            updated_at: '2016-12-26 13:06:00',
          },
        },
      ],
    })
    ;
  }

  return data;
}

let regGetAll = new RegExp('\/requestStatus\/*');
app.mock.onGet(regGetAll).reply(function (config) {

  let rand = parseInt(Math.random() * 10);

  return [200, JSON.stringify({
    requests: _MockData(rand, rand + 5),
  })];
});


app.mock.onPost(/\/request\/accept/).reply(200, JSON.stringify({}));

