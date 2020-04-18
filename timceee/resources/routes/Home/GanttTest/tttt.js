import React from 'react';
import './amchart/amcharts';
import './amchart/serial';
import './amchart/gantt';
import './amchart/export.min';
import './Gantt.css';
import jMomet from 'moment-jalaali';

@autobind

export default class Gantt1 extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            _duration: 'duration',
            _startDate: '2018-01-01',
            _time: 1,
            _color: '#9e199e',
        };
    }

    // componentWillReceiveProps() {
    //     // this._set();
    //
    // }
    //
    // componentWillMount() {
    //     // this._set();
    //     console.log('WillMount');
    //
    // }
    //
    // // componentWillUpdate() {
    // //     // this._set();
    // //
    // //     console.log('componentWillUpdate');
    // //
    // // }


    componentDidMount() {
        console.log('didmount');

        this._set();

        this.test();
        // this.setState({lading: true}, ()=>{
        //
        //     //...
        //
        //     this.setState({lading: false});
        // });
    }

    componentDidUpdate() {

    }

    // componentWillUnmount() {
    //     console.log('unmount');
    //
    // }


    _set() {

        let c = this.props.endWork - this.props.startWork;

        //
        // this.setState((prevState)=> {
        //     console.log("HELLO");
        //     return {...prevState, _time: c};
        // }, () => {
        //     console.log("WORLD");
        // });
        this.setState({_time: c});

        console.log('c' + c);

    }


    _setColor() {
        let c = this.props.type;
        switch (c) {

            case 'morakhasi':
                return '#46615e';
                break;
            case 'addi':
                return '#9969ae';
                break;
            case 'mamoriat':
                return '#09610d';
                break;
            case 'takhir':
                return '#4eeeee';
                break;
            default:
                return '#665edd';
                break;

        }
    }


    _addUserName(_clockings) {
        let clockings = _clockings;

        clockings.map((clock) => {
            clock._user = clock.user && clock.user.profile ? `${clock.user.profile.first_name} ${clock.user.profile.last_name}` : '---';
            delete clock.user;
        });

        return clockings;
    }


    _addJalaliDateFormat(_clockings) {
        let clockings = _clockings;

        clockings.map((clock) => {

            clock._jDate = clock._date ? jMomet(clock._date, 'YYYY-MM-DD').format('jYYYY-jMM-jDD') : '0001-01-01';

            //
        });

        return clockings;
    }


    _addTimeToColocings(_clockings) {
        let clockings = _clockings;

        clockings.map((clock) => {
            // let _dateTime = clock.datetime;                         // 2018-06-10 08:59:40
            let dateTime = clock.datetime.split(' ');                    // بریدن تاریخ و ساعت تردد با کارکتر فاصله - خروجی آرایه میده
            // let dateTime = _dateTime.split(' ');                    // بریدن تاریخ و ساعت تردد با کارکتر فاصله - خروجی آرایه میده

            clock._date = dateTime[0] ? dateTime[0] : '0001-01-01'; // اگر اندیس صفر آرایه از مرحله بالا وجود داشت اون اندیس تاریخ هست
            clock._time = dateTime[1] ? dateTime[1] : '00:00:00';
        });

        return clockings;
    }


//     _changeTimeFormat(_clockings)  {
//         let clockings = _clockings;
//          clockings.map((clock) => {
//               let splitTime=new Date(clock._time);
//               let h =splitTime.getHours();
//               let m = splitTime.getMinutes();
//               let s =splitTime.getMiddlePoint();
//
//              clock._numberTime = (h+3600 + m*60 + s*1);
//          });
//
//         return clockings;
// }


    //tabdile saat be sanieh
    _changeTimeFormat(_clockings) {
        let clockings = _clockings;

        clockings.map((clock) => {
            let splitTime = clock._time.split(':');
            clock._numberTime = splitTime[0] ? (splitTime[0] * 3600 + splitTime[1] * 60 + splitTime[2] * 1) : 1;
        });

        return clockings;
    }


    // estekhrag roz va dar sorat tekrar dar arayeh push nemishavad va bad sort mishavad;
    _changeDateToDay(_clockings) {
        let clockings = _clockings;
        let arrayDay = [];
        if (clockings)
            clockings.map((clock) => {
                let a = arrayDay.findIndex((chiled) => {
                    return chiled.day == clock._date;
                });
                if (a < 0) {
                    arrayDay.push({day: clock._date, clocks: [clock]});
                }
                else {
                    arrayDay[a].clocks.push(clock);
                }
            });
        return arrayDay;
    }
    //

    _createStart(_arrayDay) {
        let arrayDay = _arrayDay;

        arrayDay.map((day) => {

            day.clocks.map((clock) => {
                if (clock.entry_type === 'in') {
                    clock.start = clock._time;
                    day._startDuration = clock._numberTime;
                }
                else {
                    day._end = clock._numberTime;
                }
                if (clock.entry_type === 'in') {
                    let a = day._end - day._startDuration;
                    clock.duration = a / 1000;
                }

            });
        });
        return arrayDay;
    }


    _reder() {
        let _dataChart = [];
        let {clockings} = this.props;


        // 3 ta tabe
        // tabe aval karesh ine ke time ro az tarikh joda kone


        clockings = this._addTimeToColocings(clockings);    // افزودن ساعت به تردد ها
        clockings = this._addJalaliDateFormat(clockings);   // افزودن فرمت تاریخ شمسی
        clockings = this._addUserName(clockings);           //افزودن نام کاربر
        clockings = this._changeTimeFormat(clockings);     //تبدیل ساعت به ثانیه
        clockings = this._changeDateToDay(clockings);     //استخراج روز
        clockings = this._createStart(clockings);        //ایجاد start




        // clockings = this._arrayDayToDay(_clo);    //moadel kardan day ba arrayday


        // clockings = this.????????(clockings);           //تبدیل ساعت به دیوریشن


        console.log('test2:', clockings[0]);                // تست اولیت رکورد تردد

        _dataChart = [
            {
                day: '1/1/97',
                segments: [{
                    start: 9,
                    duration: this.state._time,
                    color: this._setColor(),
                    task: 'نوع خروج',
                }, {
                    start: 15,
                    duration: 3,
                    color: this._setColor(),
                    task: 'Task #2',
                }, {
                    duration: 5,
                    color: '#8dc49f',
                    task: 'Task #3',
                }],
            },
            {
                day: '2/1/97',
                segments: [{
                    start: 6,
                    duration: 3,
                    color: '#dddd5d',
                    task: 'Task #2',
                }],
            },
            {
                day: '3/1/97',
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
            },
            {
                day: '4/1/97',
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
                day: '5/1/97',
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
            {
                day: '6/1/97',
                segments: [{
                    start: 18,
                    duration: 2,
                    color: '#727d6f',
                    task: 'Task #2',
                }, {
                    duration: 2,
                    color: '#29d4d4',
                    task: 'Task #4',
                }],
            }, {
                day: '7/1/97',
                segments: [{
                    start: 10,
                    duration: 3,
                    color: '#727d6f',
                    task: 'Task #2',
                }, {
                    start: 17,
                    duration: 4,
                    color: '#FFE4C4',
                    task: 'Task #4',
                }],
            },
        ];


        return clockings;
    }


    test() {

        console.log('test' + this.state._time);

        let chart = AmCharts.makeChart(this.amchart, {
            type: 'gantt',
            theme: 'light',
            marginRight: 70,
            period: 'hh', dataDateFormat: 'YYYY-MM-DD',
            balloonDateFormat: 'JJ:NN',
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
            categoryField: 'day',
            segmentsField: 'clocks', // '2132'
            colorField: 'color',
            startDate: this.state._startDate,
            startField: this.props.startField,
            // endField: this.state.end,
            durationField: this.props._duration,
            valueScrollbar: {
                autoGridCount: true,
            },
            chartCursor: {
                cursorColor: '#55bb76',
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
                {/*{this.test()};*/}

            </div>

        );
    }
};
