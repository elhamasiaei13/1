import React from 'react';
import PropTypes from 'prop-types';
import './amchart/amcharts';
import './amchart/serial';
import './amchart/gantt';
import './amchart/export.min';
import './Gantt.css';

@autobind

export default class Gantt extends React.PureComponent {

    static propTypes = {
        category: PropTypes.string,
        color: PropTypes.string,
        task: PropTypes.string,
        duration: PropTypes.number,
        start: PropTypes.number,
        segments: PropTypes.array,

        // chartCursor:PropTypes.object,
        // graph:PropTypes.object,
        // dataProvider:PropTypes.oneOfType([
        //     PropTypes.object,
        // ])
    };

    static defaultProps = {
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
            balloonText: '<b>[[task]]</b>: [[open]] [[value]]'
        },
        rotate: true,
        categoryField: 'category1',
        segmentsField: 'segments',
        colorField: 'color',
        startDate: '2015-01-01',
        startField: 'start',
        endField: 'end',
        durationField: 'duration',
        dataProvider: [],
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
            enabled: true,
        },

    }


    constructor(props) {
        super(props);
        this.state = {
            dataProvider:
                [{
                    category: props.category,
                    segments: [{
                        start: props.start,
                        duration: props.duration,
                        color: props.color,
                        task: props.name,

                    }],
                }],
        };
    }


    componentDidMount() {
        this.test();
    }

    test() {

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
            categoryField: 'category',
            segmentsField: 'segments',
            colorField: 'color',
            startDate: '2015-01-01',
            startField: 'start',
            endField: 'end',
            durationField: 'duration',
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
            dataProvider:
                [
                    {
                    category: 'Tom',
                    segments: [{
                        start: 9.55,
                        duration: 4,
                        color: '#46615e',
                        task: 'Task #1',
                    }, {
                        start: 15.6,
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
                            start: 6.55,
                            duration: 3,
                            color: '#727d6f',
                            task: 'Task #2',
                        }],
                    }, {
                    category: 'Anita',
                    segments: [{
                        start: 12.11,
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
                        start: 8.22,
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
                        start: 12.33,
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
                ],
        });

    }

    render() {

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
