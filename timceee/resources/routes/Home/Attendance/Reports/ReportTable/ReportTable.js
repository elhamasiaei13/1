import React from 'react';
import AntTable from 'components/common/Table/AntTable';
import PropTypes from 'prop-types';

@autobind
export default class ReportTable extends React.PureComponent {
  static propTypes = {
    columns: PropTypes.array,
    dataSource: PropTypes.array,
    properties: PropTypes.object,
    loading: PropTypes.bool,
    title: PropTypes.string,
  };
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  _DataSource(dataSource) {
    let data = [];
    dataSource.map((array) => {
      if (!app._.isEmpty(array.body)) {
        data.push(...array.body);
      }
    });
    return data;
  }

  render() {
    const {columns, dataSource, properties, title, loading} = this.props;
    let _dataSource = this._DataSource(dataSource);

    return (
      <AntTable
        loading={loading}
        columns={columns}
        dataSource={_dataSource}
        dataPrint={dataSource}
        dataExport={_dataSource}
        printTitle={title}
        rowKey="key"
        jsPagination={true}
        jsSort={true}
        jsFilter={true}
        rowSelection={false}
        haveSetting={true}
        haveExport={true}
        havePrint={true}
        haveCustomExport={true}
        properties={properties}
        pagination={false}
      />
    );
  }
}
