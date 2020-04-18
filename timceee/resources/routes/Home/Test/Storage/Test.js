import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Card, Row, Col, Button, Form, Modal} from 'antd';
import {reduxForm, Field} from 'redux-form';
import {Text, Avatar, TextArea, Email, WebSite, Phone} from 'components/redux-form';
import MaterialIcon from 'components/common/MaterialIcon';
import Cropper from 'components/common/Cropper';
import AntTable from 'components/common/Table/AntTable';
import uuidv1 from 'uuid/v1';

@autobind
export default class Test extends React.PureComponent {
  static propTypes = {
    style: PropTypes.object,
    workingHours: PropTypes.object,
  };

  static defaultProps = {
    style: {height: '20px', borderRadius: 4},
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  _timeToSecond(time) {
    let value = time.split(':');
    return ((parseInt(value[0]) * 3600) + (value[1] ? (parseInt(value[1]) * 60) : 0) + (value[2] ? parseInt(value[2]) : 0));
  }

  _renderDiagramsItem(right = 0, width = '100%', color = '#665544', min, dif) {
    let _min = (min * -1 );
    return (<div
      key={uuidv1()}
      style={Object.assign({}, {
        position: 'relative',
        height: '10px',
        top: 0,
        margin: '3px',
        marginRight: `${parseInt((_min + right) / dif * 100)}%`,
        width: `${parseInt(width / dif * 100)}%`,
        opacity: 1,
        background: color,
        borderRadius: 4,
      }, this.props.style)}
    />);
  }

  _render() {
    const colors = [
      'aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 'silver', 'teal', 'yellow',
      'aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 'silver', 'teal', 'yellow',
      'aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 'silver', 'teal', 'yellow',
      'aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 'silver', 'teal', 'yellow',
      'aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 'silver', 'teal', 'yellow',
      'aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 'silver', 'teal', 'yellow'];
    const data = this.props.workingHours;
    const mainWidth = 100;
    let _helps = [];
    let _diagrams = [];
    let mainStart = this._timeToSecond(data.time_from);
    let length = (parseInt(data.day_to) * 86400 ) + (mainStart * -1) + this._timeToSecond(data.time_to);
    let proportion = parseInt(mainWidth) / parseInt(length);
    let margin = 0;
    let color = data.color;
    let width = length * proportion;
    let min = 0;
    let max = 0;
    let _data = [];
    _helps.push(<div
      style={{
        margin: '3px',
        padding: '1px',
      }}
      key={uuidv1()}
    ><span
      style={Object.assign({}, {
        padding: '0px 7px',
        margin: '3px',
        height: '10px',
        display: 'inline',
        background: data.color,
        borderRadius: 3,
      }, this.props.style)}
    /><b>{data.time_from} - {data.time_to} ..... {data.name}</b></div>);

    _data.push({
      margin: parseInt(margin), width: parseInt(width), color,
    });

    data.factors.map((item, index) => {
      margin = 0;
      width = 0;
      margin = parseInt(this._timeToSecond(item.time_from) - mainStart) * proportion;
      min = margin < min ? margin : min;
      width = (margin * -1) + ( (item.duration_to ? item.duration_to : parseInt((this._timeToSecond(item.time_to) - data.duration )) ) * proportion);
      max = (width + margin) > max ? (width + margin) : max;
      color = (item.color ? item.color : colors && colors[index] ? colors[index] : '#665544');

      _data.push({
        margin: parseInt(margin), width: parseInt(width), color,
      });
      _helps.push(<div
        style={{
          margin: '3px',
          padding: '1px',
        }}
        key={uuidv1()}
      ><span
        style={Object.assign({}, {
          padding: '0px 7px',
          margin: '3px',
          background: color,
          borderRadius: 3,
          height: '10px',
          display: 'inline',
        }, this.props.style)}
      />{item.time_from} - {item.time_to} ..... {item.name} </div>);
    });

    let dif = parseInt(max - min);
    _data.map((item, index) => {
      _diagrams.push(this._renderDiagramsItem(item.margin, item.width, item.color, parseInt(min), dif));
    });

    return {help: _helps, diagram: _diagrams};
  }

  render() {
    const items = this._render();

    return (
      <Row
        style={{
          height: '100%',
          overflow: 'auto',
        }}>
        <Col sm={16}
             style={{
               height: '100%',
             }}
        >
          {items.diagram}
        </Col>
        <Col sm={8}
             style={{
               height: '100%',
             }}
        >
          {items.help}
        </Col>
      </Row>
    );
  }
}
