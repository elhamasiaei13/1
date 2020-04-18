import React from 'react';
import {Card, Button} from 'antd';
import ReportTable from './ReportTable';
import PropTypes from 'prop-types';

@autobind
export default class ReportTableContainer extends React.PureComponent {
  static propTypes = {
    columns: PropTypes.array,
    dataSource: PropTypes.array,
    properties: PropTypes.object,
    title: PropTypes.string,
    onCancel: PropTypes.func,
    beforeOnCancel: PropTypes.func,
    loading: PropTypes.bool,
  };
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {columns, dataSource, properties, title, onCancel, beforeOnCancel, loading} = this.props;
    return (
      <Card
        extra={
          <Button onClick={(e) => {
            beforeOnCancel();
            onCancel(e);
          }}>{app.translate('main.Cancel')}</Button>
        }
        title={title}
        style={{
          height: '100%',
        }}
      >
        <ReportTable
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          properties={properties}
          title={title}
        />
      </Card>
    );
  }
}
