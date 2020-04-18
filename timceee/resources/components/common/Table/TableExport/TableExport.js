import FileSaver from 'file-saver/FileSaver';

export default class TableExport {
  constructor(table = '<table></table>', defaults = null) {
    this.defaults = defaults ? defaults : {
      separator: ',',
      ignoreColumn: [],
      tableName: 'exports',
      type: 'csv',
      pdfFontSize: 14,
      pdfLeftMargin: 20,
      escape: 'false',
      htmlContent: 'false'
    };

    this.table = table;
  }

  parseString(data) {
    let defaults = this.defaults;
    let content_data;

    if (defaults.htmlContent == 'true') {
      content_data = data.html().trim();
    } else {
      content_data = data.text().trim();
    }

    if (defaults.escape == 'true') {
      content_data = escape(content_data);
    }

    return content_data;
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

  exportAs(type = null, filename = 'noname') {
    type = type ? type : this.defaults.type;
    let defaults = this.defaults;
    let thisObject = this;
    let tdData = "";

    switch (type) {
      case 'csv':
      case'txt':
        $(this.table).find('thead').find('tr').each(function () {
          tdData += "\n";
          $(this).find('th').each(function (index, data) {
            if ($(this).css('display') != 'none') {
              if (defaults.ignoreColumn.indexOf(index) == -1) {
                tdData += '"' + thisObject.parseString($(this)) + '"' + defaults.separator;
              }
            }
          });
          tdData = $.trim(tdData);
          tdData = $.trim(tdData).substring(0, tdData.length - 1);
        });

        // Row vs Column
        $(this.table).find('tbody').find('tr').each(function () {
          tdData += "\n";
          $(this).find('td').each(function (index, data) {
            if ($(this).css('display') != 'none') {
              if (defaults.ignoreColumn.indexOf(index) == -1) {
                tdData += '"' + thisObject.parseString($(this)) + '"' + defaults.separator;
              }
            }
          });
          tdData = $.trim(tdData).substring(0, tdData.length - 1);
        });
        break;
      case 'sql':
        tdData = "INSERT INTO `" + defaults.tableName + "` (";
        $(this.table).find('thead').find('tr').each(function () {
          $(this).find('th').each(function (index, data) {
            if ($(this).css('display') != 'none') {
              if (defaults.ignoreColumn.indexOf(index) == -1) {
                tdData += '`' + thisObject.parseString($(this)) + '`,';
              }
            }
          });
          tdData = $.trim(tdData);
          tdData = $.trim(tdData).substring(0, tdData.length - 1);
        });
        tdData += ") VALUES ";
        // Row vs Column
        $(this.table).find('tbody').find('tr').each(function () {
          tdData += "(";
          $(this).find('td').each(function (index, data) {
            if ($(this).css('display') != 'none') {
              if (defaults.ignoreColumn.indexOf(index) == -1) {
                tdData += '"' + thisObject.parseString($(this)) + '",';
              }
            }
          });

          tdData = $.trim(tdData).substring(0, tdData.length - 1);
          tdData += "),";
        });
        tdData = $.trim(tdData).substring(0, tdData.length - 1);
        tdData += ";";
        break;
      case 'json':
        let jsonHeaderArray = [];
        let jsonArrayTd = [];
        $(this.table).find('thead').find('tr').each(function () {

          $(this).find('th').each(function (index, data) {
            if ($(this).css('display') != 'none') {
              if (defaults.ignoreColumn.indexOf(index) == -1) {
                jsonArrayTd.push(thisObject.parseString($(this)));
              }
            }
          });
          jsonHeaderArray.push(jsonArrayTd);
        });

        let jsonArray = [];
        jsonArrayTd = [];
        $(this.table).find('tbody').find('tr').each(function () {
          $(this).find('td').each(function (index, data) {
            if ($(this).css('display') != 'none') {
              if (defaults.ignoreColumn.indexOf(index) == -1) {
                jsonArrayTd.push(thisObject.parseString($(this)));
              }
            }
          });
          jsonArray.push(jsonArrayTd);
        });

        tdData = JSON.stringify({header: jsonHeaderArray, data: jsonArray});
        break;
      case 'excel':
      case 'doc':
      case 'powerpoint':
        let excel = "<table>";
        // Header
        $(this.table).find('thead').find('tr').each(function () {
          excel += "<tr>";
          $(this).find('th').each(function (index, data) {
            if ($(this).css('display') != 'none') {
              if (defaults.ignoreColumn.indexOf(index) == -1) {
                excel += "<td>" + thisObject.parseString($(this)) + "</td>";
              }
            }
          });
          excel += '</tr>';
        });

        // Row Vs Column
        let rowCount = 1;
        $(this.table).find('tbody').find('tr').each(function () {
          excel += "<tr>";
          let colCount = 0;
          $(this).find('td').each(function (index, data) {
            if ($(this).css('display') != 'none') {
              if (defaults.ignoreColumn.indexOf(index) == -1) {
                excel += "<td>" + thisObject.parseString($(this)) + "</td>";
              }
            }
            colCount++;
          });
          rowCount++;
          excel += '</tr>';
        });
        excel += '</table>';

        let excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:" + defaults.type + "' xmlns='http://www.w3.org/TR/REC-html40'>";
        excelFile += "<head>";
        excelFile += "<!--[if gte mso 9]>";
        excelFile += "<xml>";
        excelFile += "<x:ExcelWorkbook>";
        excelFile += "<x:ExcelWorksheets>";
        excelFile += "<x:ExcelWorksheet>";
        excelFile += "<x:Name>";
        excelFile += "{worksheet}";
        excelFile += "</x:Name>";
        excelFile += "<x:WorksheetOptions>";
        excelFile += "<x:DisplayGridlines/>";
        excelFile += "</x:WorksheetOptions>";
        excelFile += "</x:ExcelWorksheet>";
        excelFile += "</x:ExcelWorksheets>";
        excelFile += "</x:ExcelWorkbook>";
        excelFile += "</xml>";
        excelFile += "<![endif]-->";
        excelFile += "</head>";
        excelFile += "<body>";
        excelFile += excel;
        excelFile += "</body>";
        excelFile += "</html>";

        tdData = unescape(escape(excelFile));
    }


    let file = new File(
      [tdData],
      filename + '.' + TableExport.getExtension(type),
      {type: TableExport.getMimeType(type) + ";charset=utf-8"}
    );
    FileSaver.saveAs(file);
  }
}