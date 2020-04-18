import React from 'react';
import './amchart/amcharts';
import './amchart/serial';
import './amchart/gantt';
import './amchart/export.min';
import './Gantt.css';
import jMomet from 'moment-jalaali';

@autobind

export default class Gantt extends React.Component {
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

    componentDidUpdate() {

    }


    _addUserName(_clockings) {
        let clockings = _clockings;

        clockings.map((clock) => {
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


    _addJalaliDateFormat(_clockings) {
        let clockings = _clockings;

        clockings.map((clock) => {
            // clock._jDate = clock._date ? jMomet(clock._date).add(10, 'days').calendar() : '0001-01-01';
            clock._jDate = clock._date ? jMomet(clock._date, 'YYYY-MM-DD').format('jYYYY-jMM-jDD') : '0001-01-01';

        });

        return clockings;
    }


    _addTimeToClocings(_clockings) {
        let clockings = _clockings;

        clockings.map((clock) => {
            let dateTime = clock.datetime.split(' '); // بریدن تاریخ و ساعت تردد با کارکتر فاصله - خروجی آرایه میده
            clock._date = dateTime[0] ? dateTime[0] : '0001-01-01'; // اگر اندیس صفر آرایه از مرحله بالا وجود داشت اون اندیس تاریخ هست
            clock._time = dateTime[1] ? dateTime[1] : '00:00:00';
        });

        return clockings;
    }


    // tabdile saat be number
    _changeTimeFormat(_clockings) {
        let clockings = _clockings;

        clockings.map((clock) => {
            let splitTime = clock._time.split(':');
            clock._numberTime = (`${splitTime[0]}.${splitTime[1]}`) * 1;
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
                    return chiled.category === clock._jDate;
                });


                if (a < 0) {
                    arrayDay.push({category: clock._jDate, segments: [clock]});
                } else {
                    arrayDay[a].segments.push(clock);
                }
            });
        }
        return arrayDay;
    }


    // _clockFake(_clockings) {
    //     let clockings = _clockings;
    //     clockings.map((clock) => {
    //             let i;
    //             for (i = 0; i < clock.segments.length; i++) {
    //                 let y = clock.segments.length;
    //                 // let x = y % 2;
    //                 if (y === 1 ){
    //                     //&& clock.segments[0].entry_type === 'in') {
    //                     let obj =
    //                         {
    //                             datetime: clock.segments[i].datetime,
    //                             entry_type: 'out',
    //                             typeTaradod: clock.segments[i].typeTaradod, // type ro begirim
    //                             _date: clock.segments[i]._date,
    //                             _jDate: clock.segments[i]._jDate,
    //                             _numberTime: 23.59,
    //                             _time: 23.59,
    //                             _user: clock.segments[i]._user,
    //                         };
    //
    //
    //                     clock.segments = [obj, ...clock.segments];
    //                 }
    //                 // if ( clock.segments.length === 1 && clock.segments[i].entry_type === 'out') {
    //                 //     clock.segments.push({
    //                 //         datetime: clock.segments[i].datetime,
    //                 //         entry_type: 'in',
    //                 //         typeTaradod: clock.segments[i].typeTaradod, //type ro begirim
    //                 //         _date: clock.segments[i]._date,
    //                 //         _jDate: clock.segments[i]._jDate,
    //                 //         _numberTime: 0,
    //                 //         _time: 0,
    //                 //         _user: clock.segments[i]._user,
    //                 //     });
    //                 // }
    //
    //                 // if (x === 0 && clock.segments[0].entry_type === 'out') {
    //                 //     clock.segments.push({
    //                 //         datetime: clock.segments[i].datetime,
    //                 //         entry_type: 'in',
    //                 //         typeTaradod: clock.segments[i].typeTaradod, //type ro begirim
    //                 //         _date: clock.segments[i]._date,
    //                 //         _jDate: clock.segments[i]._jDate,
    //                 //         _numberTime: 0,
    //                 //         _time: 0,
    //                 //         _user: clock.segments[i]._user,
    //                 //     });
    //                 //     if (i === clock.segments.length && clock.segments.entry_type === 'in') {
    //                 //         clock.segments.push({
    //                 //             datetime: clock.segments[i].datetime,
    //                 //             entry_type: 'out',
    //                 //             typeTaradod: clock.segments[i].typeTaradod, //type ro begirim
    //                 //             _date: clock.segments[i]._date,
    //                 //             _jDate: clock.segments[i]._jDate,
    //                 //             _numberTime: 23.59,
    //                 //             _time: 23.59,
    //                 //             _user: clock.segments[i]._user,
    //                 //         });
    //                 //     }
    //                 // }
    //                 // do vorod posht sar ham yani yek khoroj nazade
    //                 // // ghanon hnja beporsam
    //                 // if (x === 1 && clock.segments[i].entry_type === 'in') {
    //                 //     if (clock.segments[i + 1].entry_type === 'in')
    //                 //         clock.segments.push({
    //                 //             datetime: clock.segments[i].datetime,
    //                 //             entry_type: 'out',
    //                 //             typeTaradod: clock.segments[i].typeTaradod, //type ro begirim
    //                 //             _date: clock.segments[i]._date,
    //                 //             _jDate: clock.segments[i]._jDate,
    //                 //             _numberTime: clock.segments[i]._numberTime,
    //                 //             _time: clock.segments[i]._time,
    //                 //             _user: clock.segments[i]._user,
    //                 //         });
    //                 // }
    //                 // if (x === 1 && clock.segments[0].entry_type === 'out') {
    //                 //     if (clock.segments.length === 1 ) {
    //                 //         clock.segments.push({
    //                 //             datetime: clock.segments[i].datetime,
    //                 //             entry_type: "in",
    //                 //             typeTaradod: clock.segments[i].typeTaradod, //type ro begirim
    //                 //             _date: clock.segments[i]._date,
    //                 //             _jDate: clock.segments[i]._jDate,
    //                 //             _numberTime: 0,
    //                 //             _time: 0,
    //                 //             _user: clock.segments[i]._user,
    //                 //
    //                 //         });
    //                 //     }
    //                 // }
    //             }
    //         }
    //     );
    //     return clockings;
    // }

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
                let b;
                // if (clock.entry_type === 'in') {
                let time = clock._time.split(':');
                // b = (((`${time[0]}.${time[1]}`) * 1).toFixed(0)) * 1;
                // this.setState({_startin: b});
                // clock.start=1;

                clock.start = ((`${time[0]}.${time[1]}`) * 1);

                // }
                // else(clock.entry_type === 'in'){
                //     clock.start=this.state._startin;
                // }
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
            });
        });


        return arrayDay;
    }


    _createDurationIn(_arrayDay) {
        let arrayDay = _arrayDay;

        arrayDay.map((category) => {
            category.segments.map((clock) => {
                // category._end ? clock.duration = category._end - category._startDuration : clock.duration = 5;
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
            // console.log('cc'+clock.typeTaradod);

            category.segments.map((clock) => {
                if (clock.entry_type === 'in') {
                    // let c = clock.typeTaradod;
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

// renmove enntry_type==in;

    //
    // _removeClocking(_clockings) {
    //     let clockings = _clockings;
    //     clockings.map((category) => {
    //         category.segments.map((clock, index) => {
    //
    //             if( clock.entry_type === 'in') {
    //                 category.segments.splice(index,1);
    //                 // delete clock;
    //             }
    //             // let y = findIndex((clock) => {
    //             //     return clock.entry_type === 'in';
    //             //
    //             // });
    //         });
    //     });
    //     return clockings;
    // }

    // _removeClocking(_clockings) {
    //     let clockings = _clockings;
    //     clockings.map((category) => {
    //         let i;
    //         for (i = 0; i < category.segments.length; i++) {
    //             let y = findIndex((clock) = {
    //                 category.segments.entry_type === 'out';
    //         })
    //             ;
    //
    //
    //         }
    //     });
    // }


    _reder() {
        let _dataChart = [];
        let {clockings} = this.props;


        // 3 ta tabe
        // tabe aval karesh ine ke time ro az tarikh joda kone
        clockings = this._addTimeToClocings(clockings); // افزودن ساعت به تردد ها
        clockings = this._addJalaliDateFormat(clockings); // افزودن فرمت تاریخ شمسی
        clockings = this._addUserName(clockings); // افزودن نام کاربر
        clockings = this._changeTimeFormat(clockings); // تبدیل ساعت به ثانیه
        clockings = this._changeDateToDay(clockings); // استخراج روز
        clockings = this._sort(clockings);
        clockings = this._clockFake(clockings); // clock fake
        clockings = this._createColor(clockings); // color
        clockings = this._createStart(clockings); // ایجاد start ,
        clockings = this._sort(clockings);
        clockings = this._createStartOut(clockings); // ایجاد start در out,
        clockings = this._createDuration(clockings); // duration
        clockings = this._createDurationIn(clockings); // ایجاد DurationIn ,
        // clockings = this._removeClocking(clockings);        // remove in ,


        // clockings = this._arrayDayToDay(_clo);    //moadel kardan day ba arrayday


        // clockings = this.????????(clockings);           //تبدیل ساعت به دیوریشن

        console.log('test:', clockings[0].segments); // تست اولیت رکورد تردد

        console.log('test2:', clockings); // تست اولیت رکورد تردد

        _dataChart =
            [
                {
                    category: 'Tom',
                    segments: [{
                        start: 9,
                        duration: 4,
                        color: '#46615e',
                        task: 'Task #1',
                    }, {
                        start: 15,
                        duration: 3,
                        color: '#727d6f',
                        task: 'Task #2',
                    }, {
                        duration: 5,
                        color: '#8dc49f',
                        task: 'Task #3',
                    }],
                },
                {
                    category: 'Kyle',
                    segments: [{
                        start: 6,
                        duration: 3,
                        color: '#727d6f',
                        task: 'Task #2',
                    }],
                }, {
                category: 'Anita',
                segments: [{
                    start: 12,
                    duration: 2,
                    color: '#727d6f',
                    task: 'Task #2',
                }, {
                    start: 16,
                    duration: 2,
                    color: '#FFE4C4',
                    task: 'Task #4',
                }],
            }, {
                category: 'Jack',
                segments: [{
                    start: 8,
                    duration: 10,
                    color: '#46615e',
                    task: 'Task #1',
                }, {
                    duration: 2,
                    color: '#727d6f',
                    task: 'Task #2',
                }],
            }, {
                category: 'Kim',
                segments: [{
                    start: 12,
                    duration: 2,
                    color: '#727d6f',
                    task: 'Task #2',
                }, {
                    duration: 3,
                    color: '#8dc49f',
                    task: 'Task #3',
                }],
            },
                //     {

                //     category: 'Aaron',
                //     segments: [{
                //         start: 18,
                //         duration: 2,
                //         color: '#727d6f',
                //         task: 'Task #2',
                //     }, {
                //         duration: 2,
                //         color: '#FFE4C4',
                //         task: 'Task #4',
                //     }],
                // }, {
                //     category: 'Simon',
                //     segments: [{
                //         start: 10,
                //         duration: 3,
                //         color: '#727d6f',
                //         task: 'Task #2',
                //     }, {
                //         start: 17,
                //         duration: 4,
                //         color: '#FFE4C4',
                //         task: 'Task #4',
                //     }],
                // },
            ];


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

