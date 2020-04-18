import FileSaver from 'file-saver/FileSaver';
import jMoment from 'moment-jalaali';

export default class JsonExport {
  constructor(dataTables = [], allHeaders = [], headers = [], props = {}, defaults = null) {
    this.defaults = defaults ? defaults : {
      separator: ',',
      ignoreColumn: [],
      tableName: 'exports',
      type: 'csv',
      pdfFontSize: 14,
      pdfLeftMargin: 20,
      escape: 'false',
      showTitle: 'true',
      showFooter: 'true',
    };

    this.props = props;
    this.headers = allHeaders;
    this.justShowHeaders = headers;
    this.dataTables = dataTables;
  }

  parseString(data) {
    let defaults = this.defaults;
    let _data = data;
    if (defaults.escape === 'true') {
      _data = escape(_data);
    }

    return `\u200c${_data}\u200c`;
  }

  static getMimeType(type = 'csv') {
    switch (type) {
      case 'csv':
        return 'text/csv';
      case 'text':
        return 'text/plain';
      case 'json':
        return 'application/json';
      case 'excel':
        return 'application/vnd.ms-excel';
      case 'doc':
        return 'application/msword';
      case 'powerpoint':
        return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
      case 'png':
        return 'image/png';
      case 'pdf':
        return 'application/pdf';
      case 'sql':
        return 'application/octet-stream';
      default:
        return 'text/csv';
    }
  }

  static getExtension(type = 'csv') {
    switch (type) {
      case 'csv':
        return 'csv';
      case 'txt':
        return 'txt';
      case 'json':
        return 'json';
      case 'excel':
        return 'xls';
      case 'doc':
        return 'doc';
      case 'powerpoint':
        return 'ppt';
      case 'png':
        return 'image/png';
      case 'pdf':
        return 'pdf';
      case 'sql':
        return 'sql';
      default:
        return 'csv';
    }
  }

  static space(len = 0, _str = ' ') {
    let str = '';
    for (let i = 0; i < len; i++) {
      str += _str;
    }
    return str;
  }

  exportAs(type = null, filename = 'noname') {
    type = type ? type : this.defaults.type;
    let defaults = this.defaults;
    let thisObject = this;
    let tdData = '';
    // console.log(this.headers);
    switch (type) {
      case 'csv':
        if (!app._.isEmpty(this.headers) && defaults.showTitle === 'true') {
          this.headers.map((header) => {
            if (defaults.ignoreColumn.indexOf(header.key) === -1 && !(!app._.isEmpty(this.justShowHeaders) && this.justShowHeaders.indexOf(header.key) === -1)) {
              tdData += '"' + thisObject.parseString(header.title) + '"' + defaults.separator;
            }
          });
          tdData += '\n';
        }
        this.dataTables.map((row) => {
          this.headers.map((header) => {
            if (defaults.ignoreColumn.indexOf(header.key) === -1 && !(!app._.isEmpty(this.justShowHeaders) && this.justShowHeaders.indexOf(header.key) === -1)) {
              if (row[header.key]) {
                tdData += '"' + thisObject.parseString(row[header.key]) + '"' + defaults.separator;
              } else {
                tdData += '""' + defaults.separator;
              }
            }
          });
          tdData += '\n';
        });
        break;
      case'txt':
        if (!app._.isEmpty(this.headers) && defaults.showTitle === 'true') {
          this.headers.map((header) => {
            if (defaults.ignoreColumn.indexOf(header.key) === -1 && !(!app._.isEmpty(this.justShowHeaders) && this.justShowHeaders.indexOf(header.key) === -1)) {
              tdData += '"' + thisObject.parseString(header.title) + '"' + defaults.separator;
            }
          });
          tdData += '\n';
        }
        this.dataTables.map((row) => {
          this.headers.map((header) => {
            if (defaults.ignoreColumn.indexOf(header.key) === -1 && !(!app._.isEmpty(this.justShowHeaders) && this.justShowHeaders.indexOf(header.key) === -1)) {
              if (row[header.key]) {
                tdData += '' + thisObject.parseString(row[header.key]) + '' + defaults.separator;
              } else {
                tdData += '' + defaults.separator;
              }
            }
          });
          tdData += '\n';
        });
        break;
      case 'sql':
        tdData = 'INSERT INTO `' + defaults.tableName + '`';
        if (!app._.isEmpty(this.headers) && defaults.showTitle === 'true') {
          tdData += ' (';
          this.headers.map((header) => {
            if (defaults.ignoreColumn.indexOf(header.key) === -1 && !(!app._.isEmpty(this.justShowHeaders) && this.justShowHeaders.indexOf(header.key) === -1)) {
              tdData += '`' + thisObject.parseString(header.key) + '`,';
            }
          });
          tdData = tdData.substr(0, tdData.length - 1);
          tdData += ')';
        }
        tdData += ' VALUES ';

        // Row vs Column
        this.dataTables.map((row) => {
          tdData += '(';
          this.headers.map((header) => {
            if (defaults.ignoreColumn.indexOf(header.key) === -1 && !(!app._.isEmpty(this.justShowHeaders) && this.justShowHeaders.indexOf(header.key) === -1)) {
              if (row[header.key]) {
                tdData += '"' + thisObject.parseString(row[header.key]) + '",';
              } else {
                tdData += '""' + defaults.separator;
              }
            }
          });
          tdData = tdData.substr(0, tdData.length - 1);
          tdData += '),';
        });
        tdData = tdData.substr(0, tdData.length - 1);
        tdData += ';';
        break;
      case 'json':
        let jsonArray = [];
        let jsonRow;

        this.dataTables.map((row) => {
          jsonRow = {};
          this.headers.map((header) => {
            if (defaults.ignoreColumn.indexOf(header.key) === -1 && !(!app._.isEmpty(this.justShowHeaders) && this.justShowHeaders.indexOf(header.key) === -1)) {
              if (row[header.key]) {
                jsonRow[header.key] = thisObject.parseString(row[header.key]);
              } else {
                jsonRow[header.key] = thisObject.parseString('');
              }
            }
          });
          jsonArray.push(jsonRow);
        });
        tdData = JSON.stringify({data: jsonArray});
        break;
      case 'excel':
      case 'doc':
      case 'powerpoint':
        let excel = '<table>';
        // Header
        if (!app._.isEmpty(this.headers) && defaults.showTitle === 'true') {
          excel += '<tr>';
          this.headers.map((header) => {
            if (defaults.ignoreColumn.indexOf(header.key) === -1 && !(!app._.isEmpty(this.justShowHeaders) && this.justShowHeaders.indexOf(header.key) === -1)) {
              excel += '<td>' + thisObject.parseString(header.title) + '</td>';
            }
          });
          excel += '</tr>';
        }
        // Row Vs Column
        let rowCount = 1;
        this.dataTables.map((row) => {
          excel += '<tr>';
          let colCount = 0;
          this.headers.map((header) => {
            if (defaults.ignoreColumn.indexOf(header.key) === -1 && !(!app._.isEmpty(this.justShowHeaders) && this.justShowHeaders.indexOf(header.key) === -1)) {
              if (row[header.key]) {
                if (header.valuesType === 'string' || (header.valuesType !== 'date' && header.valuesType !== 'datetime')) {
                  excel += '<td>' + thisObject.parseString(row[header.key]) + '</td>';
                } else {
                  if (header.valuesType === 'date') {
                    excel += '<td>' + jMoment(row[header.key], 'YYYY-M-D').format('jYYYY/jMM/jDD') + '</td>';
                  }
                  if (header.valuesType === 'datetime') {
                    excel += '<td>' + jMoment(row[header.key], 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss') + '</td>';
                  }
                }
              } else {
                excel += '<td></td>';
              }
            }
            colCount++;
          });
          rowCount++;
          excel += '</tr>';
        });
        excel += '</table>';

        let excelFile = '<html xmlns:o=\'urn:schemas-microsoft-com:office:office\' xmlns:x=\'urn:schemas-microsoft-com:office:' + defaults.type + '\' xmlns=\'http://www.w3.org/TR/REC-html40\'>';
        excelFile += '<head>';
        if (type === 'excel') {
          excelFile += '<!--[if gte mso 9]>';
          excelFile += '<xml>';
          excelFile += '<x:ExcelWorkbook>';
          excelFile += '<x:ExcelWorksheets>';
          excelFile += '<x:ExcelWorksheet>';
          excelFile += '<x:Name>';
          excelFile += '{worksheet}';
          excelFile += '</x:Name>';
          excelFile += '<x:WorksheetOptions>';
          excelFile += '<x:DisplayGridlines/>';
          excelFile += '</x:WorksheetOptions>';
          excelFile += '</x:ExcelWorksheet>';
          excelFile += '</x:ExcelWorksheets>';
          excelFile += '</x:ExcelWorkbook>';
          excelFile += '</xml>';
          excelFile += '<![endif]-->';
        }

        excelFile += '<meta HTTP-EQUIV="Content-Type"  content="application/vnd.ms-word;  charset=utf-8">';

        excelFile += '</head>';
        excelFile += '<body>';
        excelFile += excel;
        excelFile += '</body>';
        excelFile += '</html>';

        tdData = unescape(escape(excelFile));
    }

    let file = new File(
      [tdData],
      filename + '.' + JsonExport.getExtension(type),
      {type: JsonExport.getMimeType(type) + ';charset=utf-8'},
    );
    FileSaver.saveAs(file);
  }

  static removeSp(string) {
    let _string = string;
    _string = _string.replace(':', '');
    _string = _string.replace(/:/g, '');
    _string = _string.replace('-', '');
    _string = _string.replace(/-/g, '');
    return _string;
  }

  customExportAs(type = null, filename = 'noname') {
    type = type ? type : this.defaults.type;
    let defaults = this.defaults;
    let thisObject = this;
    let tdData = '';

    switch (type) {
      case 'csv':
        if (!app._.isEmpty(this.headers) && defaults.showTitle === 'true') {
          this.props.map((header) => {
            if (defaults.ignoreColumn.indexOf(header.dataIndex) === -1 && !(!app._.isEmpty(this.justShowHeaders) && this.justShowHeaders.indexOf(header.dataIndex) === -1)) {
              if (header.reTitle && header.reTitle !== '') {
                tdData += '"' + thisObject.parseString(header.reTitle) + '"' + defaults.separator;
              } else {
                tdData += '"' + thisObject.parseString(header.title) + '"' + defaults.separator;
              }
            }
          });
          tdData += '\n';
        }
        this.dataTables.map((row) => {
          this.props.map((header) => {
            if (defaults.ignoreColumn.indexOf(header.dataIndex) === -1 && !(!app._.isEmpty(this.justShowHeaders) && this.justShowHeaders.indexOf(header.dataIndex) === -1)
              && !(defaults.showFooter === 'false' && row._props && row._props.type && row._props.type === 'footer')
            ) {
              if (row[header.dataIndex]) {
                if (!header.len || header.len === '') {
                  tdData += '"' + thisObject.parseString(row[header.dataIndex]) + '"' + defaults.separator;
                } else {
                  let string = row[header.dataIndex];
                  if (string.length > header.len) {
                    tdData += '"' + thisObject.parseString(string.substr(0, header.len)) + '"' + defaults.separator;
                  } else {
                    string += JsonExport.space(header.len - string.length);
                    tdData += '"' + thisObject.parseString(string) + '"' + defaults.separator;
                  }
                }
              } else {
                let string;
                if (!header.len || header.len === '') {
                  header.len = 0;
                }
                string = JsonExport.space(header.len);
                tdData += '"' + thisObject.parseString(string) + '"' + defaults.separator;
              }
            }
          });
          tdData += '\n';
        });
        break;
      case'txt':
        if (!app._.isEmpty(this.headers) && defaults.showTitle === 'true') {
          this.props.map((header) => {
            if (defaults.ignoreColumn.indexOf(header.dataIndex) === -1 && !(!app._.isEmpty(this.justShowHeaders) && this.justShowHeaders.indexOf(header.dataIndex) === -1)) {
              if (header.reTitle && header.reTitle !== '') {
                tdData += '"' + thisObject.parseString(header.reTitle) + '"' + defaults.separator;
              } else {
                tdData += '"' + thisObject.parseString(header.title) + '"' + defaults.separator;
              }
            }
          });
          tdData += '\n';
        }
        this.dataTables.map((row) => {
          this.props.map((header) => {
            if (defaults.ignoreColumn.indexOf(header.dataIndex) === -1 && !(!app._.isEmpty(this.justShowHeaders) && this.justShowHeaders.indexOf(header.dataIndex) === -1)
              && !(defaults.showFooter === 'false' && row._props && row._props.type && row._props.type === 'footer')
            ) {
              if (row[header.dataIndex]) {
                let string = '';
                if (header.type && header.type === 'def0') {
                  string += JsonExport.removeSp(row[header.dataIndex]);
                } else {
                  string += row[header.dataIndex];
                }
                if (!header.len || header.len === '') {
                  tdData += '' + thisObject.parseString(string) + '' + defaults.separator;
                } else {
                  if (string.length > header.len) {
                    tdData += '' + thisObject.parseString(string.substr(0, header.len)) + '"' + defaults.separator;
                  } else {
                    string = JsonExport.space(header.len - string.length, (header.type && header.type === 'def0' ? '0' : ' ')) + string;
                    tdData += '' + thisObject.parseString(string) + '' + defaults.separator;
                  }
                }
              } else {
                let _string = '';
                if (!header.len || header.len === '') {
                  header.len = 0;
                }
                _string += JsonExport.space(header.len, (header.type && header.type === 'def0' ? '0' : ' '));
                tdData += '' + thisObject.parseString(_string) + '' + defaults.separator;
              }
            }
          });
          tdData += '\n';
        });
        break;
    }


    let file = new File(
      [tdData],
      filename + '.' + JsonExport.getExtension(type),
      {type: JsonExport.getMimeType(type) + ';charset=utf-8'},
    );
    FileSaver.saveAs(file);
  }
}