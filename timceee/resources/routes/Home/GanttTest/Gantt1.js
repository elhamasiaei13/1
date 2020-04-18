import React from 'react';
import './amchart/amcharts';
import './amchart/serial';
import './amchart/gantt';
import './amchart/export.min';
import './Gantt.css';
import jMomet from 'moment-jalaali';
import {connect} from "react-redux";

@autobind

export default class Gantt1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            _startin: 5,

        };
    }


    componentDidMount() {
        console.log('didmount');

        this.test();
    }


    _addUserName(_clockings) {
        let clockings = _clockings;

        clockings.map((clock) => {
            clock._jDate = clock._date ? jMomet(clock._date, '\'dddd DD MMMM YYYY').format('dddd DD MMMM YYYY') : '0001-01-01';
            let dateTime = clock.datetime.split(' '); // بریدن تاریخ و ساعت تردد با کارکتر فاصله - خروجی آرایه میده
            clock._date = dateTime[0] ? dateTime[0] : '0001-01-01'; // اگر اندیس صفر آرایه از مرحله بالا وجود داشت اون اندیس تاریخ هست
            clock._time = dateTime[1] ? dateTime[1] : '00:00:00';
            let splitTime = clock._time.split(':');
            clock._numberTime = (`${splitTime[0]}.${splitTime[1]}`) * 1;

            clock._user = clock.user && clock.user.profile ? `${clock.user.profile.first_name} ${clock.user.profile.last_name}` : '---';
            delete clock.user;
            delete clock.changed;
            delete clock.created_at;
            delete clock.deleted_at;
            delete clock.description;
            delete clock.device_id;
            delete clock.id;
            delete clock.io_id;
            delete clock.status;
            delete clock.type_id;
            delete clock.updated_at;
            delete clock.user_id;
        });

        return clockings;
    }


    // estekhrag roz va dar sorat tekrar dar arayeh push nemishavad va bad sort mishavad;
    _changeDateToDay(_clockings) {
        let clockings = _clockings;
        let arrayDay = [];
        if (clockings) {
            clockings.map((clock) => {
                // a => tarikh taradod ra da araye jadid migardad
                let a = arrayDay.findIndex((chiled) => {
                    return chiled.category == clock._date;
                });


                if (a < 0) {
                    arrayDay.push({category: clock._date, segments: [clock]});
                } else {
                    arrayDay[a].segments.push(clock);
                }
            });
        }
        return arrayDay;
    }


    _clockFake(_clockings) {
        let clockings = _clockings;
        clockings.map((clock) => {
                let y = clock.segments.length;
                let x = y % 2;
                if (x === 1 && clock.segments[0].entry_type === 'in') {
                    let obj =
                        {
                            datetime: clock.segments[0]._date + ' 23:59',
                            entry_type: 'out',
                            typeTaradod: clock.segments[0].typeTaradod, // type ro begirim
                            _date: clock.segments[0]._date,
                            _time: '23:59',
                            _numberTime: 23.59,
                            _jDate: clock.segments[0]._jDate,
                            _user: clock.segments[0]._user,
                        };
                    clock.segments = [...clock.segments, obj];
                }
                if (x === 1 && clock.segments[0].entry_type === 'out') {
                    let obj = {
                        datetime: clock.segments[0]._date + ' 00:00',
                        entry_type: 'in',
                        typeTaradod: clock.segments[0].typeTaradod, //type ro begirim
                        _date: clock.segments[0]._date,
                        _time: '0',
                        _numberTime: 0.0,
                        _jDate: clock.segments[0]._jDate,
                        _user: clock.segments[0]._user,
                    }
                    clock.segments = [obj, ...clock.segments];
                }

                if (x === 0 && clock.segments[0].entry_type === 'out') {

                    let obj1 = {
                        datetime: clock.segments[0]._date + ' 00:00',
                        entry_type: 'in',
                        typeTaradod: clock.segments[0].typeTaradod, //type ro begirim
                        _date: clock.segments[0]._date,
                        _time: '0',
                        _numberTime: 0.0,
                        _jDate: clock.segments[0]._jDate,
                        _user: clock.segments[0]._user,
                    };
                    let obj2 =
                        {
                            datetime: clock.segments[0]._date + ' 23:59',
                            entry_type: 'out',
                            typeTaradod: clock.segments[0].typeTaradod, // type ro begirim
                            _date: clock.segments[0]._date,
                            _time: '23:59',
                            _numberTime: 23.59,
                            _jDate: clock.segments[0]._jDate,
                            _user: clock.segments[0]._user,
                        };

                    clock.segments = [obj1, ...clock.segments, obj2];
                }
            }
        );
        return clockings;
    }


    _sort(_arrayDay) {
        let arrayDay = _arrayDay;
        arrayDay.map((category) => {
            category.segments.sort((a, b) => {
                if (a._numberTime < b._numberTime) {
                    return -1;
                }

                if (a._numberTime > b._numberTime) {
                    return 1;
                } else {
                    return 0;
                }
            });
        });

        return arrayDay;
    }


    _createStart(_arrayDay) {
        let arrayDay = _arrayDay;
        let that = this;
        arrayDay.map((category) => {
            category.segments.map((clock) => {
                let time = clock._time.split(':');
                clock.start = ((`${time[0]}.${time[1]}`) * 1);
            });

        });
        return arrayDay;
    }


    _createStartOut(_arrayDay) {
        let arrayDay = _arrayDay;
        let i;
        arrayDay.map(
            (category) => {
                for (i = 0; i < category.segments.length; i++) {
                    if (category.segments.length === 1) {
                        if (category.segments[i].entry_type === 'out') {
                            category.segments[i].start = 0;
                            category.segments[i].duration = category.segments[i]._numberTime;
                        } else {
                            category.segments[0].start = category.segments[i]._numberTime;
                            category.segments[i].duration = 24 - category.segments[i]._numberTime;
                        }
                    }
                    if (category.segments[i].entry_type === 'out' && i > 0) {
                        category.segments[i].start = category.segments[(i - 1)]._numberTime;
                    }
                }
            }
        );
        return arrayDay;
    }


    _createDuration(_arrayDay) {
        let arrayDay = _arrayDay;

        arrayDay.map((category) => {
            category.segments.map((clock) => {
                clock.entry_type === 'in' ? clock._startDuration = clock._numberTime : clock._end = clock._numberTime;
                if (clock.entry_type === 'out') {
                    clock.duration = ((clock._end - clock.start).toFixed(2)) * 1;
                } else {
                    if (category.segments.length > 1) {
                        delete clock.start;
                    }
                }
            });
        });


        return arrayDay;
    }


    _createColor(_arrayDay) {
        let arrayDay = _arrayDay;

        arrayDay.map((category) => {

            category.segments.map((clock) => {
                if (clock.entry_type === 'in') {
                    switch (clock.typeTaradod) {
                        case 144:
                            clock.color = '#46615e';
                            clock.typeTaradod = 'addi';
                            break;
                        case 154:
                            clock.color = '#9969ae';
                            clock.typeTaradod = 'addi';

                            break;
                        case '155':
                            clock.color = '#09610d';
                            clock.typeTaradod = 'addi';

                            break;
                        case 'addi':
                            clock.color = '#ee1859';
                            clock.typeTaradod = 'addi';

                            break;
                        default:
                            clock.color = '#ff33f9';
                            clock.typeTaradod = 'addi';
                            break;
                    }
                }
            });
        });

        return arrayDay;
    }


    _removeClocking(_clockings) {
        let clockings = _clockings;
        clockings.map((category) => {
            category.segments.map((clock, index) => {
                if (clock.entry_type === 'in') {
                    category.segments.splice(index, 1);
                }
            });
        });
        return clockings;
    }


    _reder() {
        let _dataChart = [];
        let {clockings} = this.props;


        clockings = this._addUserName(clockings); // افزودن نام کاربر
        clockings = this._changeDateToDay(clockings); // استخراج روز
        clockings = this._sort(clockings);
        clockings = this._clockFake(clockings); // clock fake
        clockings = this._createColor(clockings); // color
        clockings = this._createStart(clockings); // ایجاد start ,
        clockings = this._sort(clockings);
        clockings = this._createStartOut(clockings); // ایجاد start در out,
        clockings = this._createDuration(clockings); // duration
        clockings = this._removeClocking(clockings);        // remove in ,


        console.log('test:', clockings[0].segments); // تست اولیت رکورد تردد

        console.log('test2:', clockings); // تست اولیت رکورد تردد


        return clockings;
    }


    test() {
        console.log('test' + this.state);
        let chart = AmCharts.makeChart(this.amchart, {
            type: 'gantt',
            theme: 'light',
            marginRight: 70,
            period: 'hh',
            dataDateFormat: 'jYYYY-jMM-jDD',
            balloonDateFormat: 'hh:mm',
            columnWidth: 0.5,
            valueAxis: {
                type: 'date',
            },
            brightnessStep: 10,
            graph: {
                fillAlphas: 1,
                balloonText: '<b>[[task]]</b>: [[open]] [[value]]',
            },
            rotate: true,
            categoryField: 'category',
            segmentsField: 'segments',
            colorField: 'color',
            startDate: '2018-06-06', // clock._date,
            startField: 'start',
            endField: 'end',
            durationField: 'duration',
            valueScrollbar: {
                autoGridCount: true,
            },
            chartCursor: {
                cursorColor: '#90ecff',
                valueBalloonsEnabled: false,
                cursorAlpha: 0,
                valueLineAlpha: 0.5,
                valueLineBalloonEnabled: true,
                valueLineEnabled: true,
                zoomable: false,
                valueZoomable: true,
            },
            _export: {
                enabled: false,
            },
            dataProvider: this._reder(),
        });
    }

    render() {
        const {_time} = this.state;
        return (
            <div
                id='chartHeight'
                ref={(input) => this.amchart = input}
            >
                {/* {this.test()};*/}

            </div>

        );
    }
}

