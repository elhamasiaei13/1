import React from 'react';
import Gantt1 from './Gantt1';

export default class BaseData extends React.PureComponent {
    constructor(props){
        super(props);
        this.state={
           _duration: 2,

        }
    }


    componentDidMount() {

    }
    _set (){

        let starta=this.props.startWork;
        console.log(starta);
        let endb=this.props.endWork;
        console.log(endb);
        this.setState({_duration: starta-endb});
        console.log(duration);

    }


render(){
    return(
        <div>


            <Gantt1

                _duration11={'duration'}
                startField={'start'}
                dataProvider={
                    [{
                        category: 'Elham',
                        segments: [{
                            start: 9,
                            duration: this.state._duration,
                            color: '#40615e',
                            task: 'Task #1',
                        }, {
                            start: 15,
                            duration: 3,
                            color: '#117d6f',
                            task: 'Task #2',
                        }, {
                            duration: 5,
                            color: '#8dc49f',
                            task: 'Task #3',
                        }],
                    }, {
                        category: 'Kyle',
                        segments: [{
                            start: 6,
                            duration: 3,
                            color: '#107d6f',
                            task: 'Task #2',
                        }],
                    }, {
                        category: 'Anita',
                        segments: [{
                            start: 12,
                            duration: 2,
                            color: '#227d6f',
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
                    ]
                }
            />

        </div>
    );
}

}

