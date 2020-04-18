import React from 'react';
import PropTypes from 'prop-types';
import List from './List';
import Form from './Form';
import {emptyCategories} from './Module';
import {connect} from 'react-redux';
import {Row, Col} from 'antd';


@authorize
@connect(null, {
    emptyCategories,
})
@autobind
/**
 *
 */
export default class Category extends React.PureComponent {
    static propTypes = {
        emptyCategories: PropTypes.func,
        can: PropTypes.func,
    };

    /**
     *
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this.state = {
            category: null,
            status: null,
        };
    }

    /**
     *
     */
    componentWillUnmount() {
        super.componentWillUnmount();

        this.props.emptyCategories();
    }

    /**
     *
     * @private
     */
    _onCancel() {
        this.setState({
            category: null,
            status: null,
        });
    }

    /**
     *
     * @return {XML}
     */
    render() {
        const {category, status} = this.state;
        const {can} = this.props;

        return (
            <Row
                gutter={16}
                style={{
                    height: '100%',
                    margin: 0,
                }}
            >
                <Col
                    md={8}
                    style={{
                        height: '100%',
                    }}
                >
                    <List
                        statusForm={status}
                        activeItem={category && category.id}
                        onAdd={() => this.setState({status: 'editing'})}
                        onClick={(category) => can('PostCategory@update') && this.setState({
                            category,
                            status: 'editing'
                        })}
                        onEdit={(category) => this.setState({category, status: 'editing'})}
                        onCancel={this._onCancel}
                    />
                </Col>
                {status === 'editing' &&
                <Col
                    md={8}
                    style={{
                        height: '100%',
                    }}
                >
                    <Form
                        item={category}
                        onCancel={this._onCancel}
                    />
                </Col>
                }

            </Row>
        );
    }
}
