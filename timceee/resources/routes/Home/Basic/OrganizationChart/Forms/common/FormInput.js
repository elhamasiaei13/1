import React from 'react';
import PropTypes from 'prop-types';
import {Form, Row, Col, Input, Radio} from 'antd';
import Toggle from 'components/common/Toggle';


@autobind
/**
 *
 */
export default class FormInput extends React.PureComponent {
  static propTypes = {
    positions: PropTypes.array,
    onToggle: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.string,
    department: PropTypes.bool,
  };

  static defaultProps = {
    positions: [],
    department: false,
    value: '',
    onToggle: () => {
    },
    onChange: () => {
    },
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      positions: props.positions.pluck('title'),
      validateStatus: '',
      help: '',
    };
  }

  /**
   *
   */
  componentDidMount() {
    let {positions} = this.state;
    let {value} = this.props;
    if (positions.indexOf(value) > -1) {
      positions[positions.indexOf(value)] = '--------------';
      this.setState({positions});
    }
  }

  /**
   *
   * @param {element} e
   * @private
   */
  _onChange(e) {
    const {onChange} = this.props;
    const {validateStatus, positions} = this.state;
    let val = e.target.value;
    let error = false;

    if (positions.indexOf(val) > -1) {
      if (validateStatus !== 'error') {
        this.setState({validateStatus: 'error', help: app.translate('routes.home.basic.organization-chart.Position Name Error') });
        error = true;
      }
    } else {
      if (validateStatus === 'error') {
        this.setState({validateStatus: '', help: ''});
        error = false;
      }
    }

    onChange(e, error);
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {onToggle, value, department} = this.props;
    const {validateStatus, help} = this.state;

    return (
      <Row>
        <Col
          sm={18}
        >
          <Form
            className="permission-form"
          >
            <Form.Item
              labelCol={{
                sm: {span: 5},
              }}
              wrapperCol={{
                sm: {span: 19},
              }}
              hasFeedback={validateStatus === 'error' ? true : false }
              validateStatus={validateStatus}
              help={help}
            >
              <Input
                placeholder={app.translate('routes.home.basic.organization-chart.Position Name')}
                onChange={this._onChange}
                value={value}
              />
            </Form.Item>
          </Form>
        </Col>
        <Col
          sm={6}
        >
          <Radio.Group onChange={(e) => onToggle(e.target.value)} value={department}>
            <Radio style={{display: 'block'}} value={true}>{app.translate('routes.home.basic.organization-chart.Department')}</Radio>
            <Radio style={{display: 'block'}} value={false}>{app.translate('routes.home.basic.organization-chart.Post')}</Radio>
          </Radio.Group>
          { /* <Toggle
            label={app.translate('routes.home.basic.organization-chart.Department')}
           // size="small"
           // inline={true}
            onChange={onToggle}
            checked={department}
          /> */ }
        </Col>
      </Row>
    );
  }
}
