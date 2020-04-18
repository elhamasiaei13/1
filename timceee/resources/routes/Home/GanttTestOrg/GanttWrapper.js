import React from 'react';
import Gantt from './Gantt1';
import {index} from './Moudule';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

@authorize
@connect((state) => ({
        clockings: state.GanttTestOrg.clockings,
    })
    ,
    {
        index,
    }
)

@autobind

export default class GanttWrapper extends React.PureComponent {
    /**
     *
     * @param {object} props
     */
    constructor(props) {
        super(props);
        console.log('PPP', props);
        this.state = {};
    }

    /**
     *
     */
    componentWillMount() {
        this.props.index({
            includes: ['user.profile'],
            filterGroups: [{
                filters: [{
                    key: 'user_id',
                    value: this.props.personnel[0].id,
                    operator: 'eq',
                }]
            }],
        });
    }

    render() {
        return (
            <Gantt
                clockings={this.props.clockings}

            />
        );
    }
}

