import render from 'services/engines/template';
import jMoment from 'moment-jalaali';

@autobind
export default class ReportPrint {
  /**
   * Constructing ReportPrint object
   * @param options
   */
  constructor(options) {
    this.options = options;
    let tables = options.tables;
    let setting = {};
    let headers = {};
    tables.map((option, index) => {
      setting = option.setting;
      if (setting && setting.rejectedCols) {
        for (let item in setting.rejectedCols) {
          setting.rejectedCols[item] = app._.camelCase(setting.rejectedCols[item]);
        }
        //  console.log('setting.rejectedCols', setting.rejectedCols, option.tableHeader);
        for (let header in option.tableHeader) {
          if (option.tableHeader.hasOwnProperty(header)) {
            if (setting.rejectedCols.indexOf(header.toString()) < 0) {
              headers[header] = option.tableHeader[header];
            }
          }
        }
      }
      tables[index].tableHeader = headers;
    });

    this.options.tables = tables;
  }

  /**
   * Make and print configured table
   */
  print() {
    let document = '';

    document += this.renderHeader(this.options.header);

    this.options.tables.map((layout) => {
      document += this.renderTableLeader(layout.tableLeader);
      document += this.renderTableHeader(layout.tableHeader);
      document += this.renderTableBody(layout.tableBody, layout.tableHeader);
      document += this.renderTableFooter(layout.tableFooter);
    });
    document += this.renderFooter(this.options.footer);

    let w = window.open();

    w.document.write(document);
    w.onload = wl(w, document.length);

    function wl(s, len = 500000) {

      let height = len / 500;

      s.setInterval(() => {
        s.print();
        s.close();
      }, height < 1800 ? 1800 : height > 3000 ? 3500 : height);
    }

    // w.setInterval(() => {
    //   w.print();
    //   w.close();
    // }, 3500);

  }

  /**
   * Render report table leader
   * @returns {string}
   */
  renderTableLeader(leader) {
    let values = {};
    for (let property in leader) {
      if (leader.hasOwnProperty(property)) {
        values[property.toString()] = leader[property];
      }
    }
    if (values['personName'] !== '') {
      return render('report.print.table-leader-personnel', values);
    } else {
      return render('report.print.table-leader', values);
    }
  }

  /**
   * Render print page header items
   * @returns {string}
   */
  renderHeader(header) {
    let values = {};
    for (let property in header) {
      if (header.hasOwnProperty(property)) {
        values[property.toString()] = header[property];
      }
    }
    return render('report.print.header', values);
  }

  /**
   * Render print page footer and return result
   *@return {string}
   */
  renderFooter(footer) {
    return render('report.print.footer');
    // return footerTemplate.toString();
  }

  /**
   * Render report table header and return result
   * @return {string}
   */
  renderTableHeader(tableHeader) {
    let tHeader = '';
    for (let property in tableHeader) {
      if (tableHeader.hasOwnProperty(property)) {
        tHeader +=
          `
         <th>${tableHeader[property].title}</th>
        `;
      }
    }

    return render('report.print.table-header', {tableHeader: tHeader});
  }

  /**
   * Render report table footer and return result
   * @return {string}
   */
  renderTableFooter(footer) {

    let values = {
      fullName0: '', position0: '',
      fullName1: '', position1: '',
      fullName2: '', position2: '',
      fullName3: '', position3: '',
      fullName4: '', position4: '',
    };
    for (let property in footer) {
      if (footer.hasOwnProperty(property)) {
        if (property === 'signers') {
          footer[property].map((signer, index) => {
            let name = `fullName${index}`;
            let post = `position${index}`;
            values[name] = signer.fullName ? signer.fullName : '';
            values[post] = signer.positionName ? signer.positionName : '';
          });
        } else {
          values[property.toString()] = footer[property];
        }
      }
    }


    values['tableFooter'] = '';

    return render('report.print.table-footer', values);
  }

  /**
   * Render report table body and return result
   * @return {string}
   */
  renderTableBody(tableBody, tableHeader) {
    let tBody = '';
    let matched = false;
    let exists = false;
    tableBody.map((body, bodyIndex) => {
      let isTotal = false;
      tBody += `<tr style="color:${body._props && body._props.color ? body._props.color : '#000' }; background:${body._props && body._props.background ? body._props.background : '#fff' };">`;
      for (let headerIndex in tableHeader) {
        matched = false;
        for (let bodyItem in body) {
          isTotal = (body._props && body._props.type && body._props.type==='footer');
          if (body.hasOwnProperty(bodyItem)) {
            if (bodyItem.toString() === headerIndex.toString()) {
              tBody += `<td style="${body.props && body.props[bodyItem] && body.props[bodyItem].color ? `color:${body.props[bodyItem].color}` : '' }; ${( (body.props && body.props[bodyItem] && body.props[bodyItem].background) || isTotal) ? `background:${ isTotal ? 'lightgray' : body.props[bodyItem].background}` : '' };">${body._props && body._props[bodyItem] && body._props[bodyItem].before ? body._props[bodyItem].before : ''}`;
              if (tableHeader[bodyItem].type === 'date' || tableHeader[bodyItem].type === 'datetime' || bodyItem === 'date' || bodyItem === 'datetime') {
                if (tableHeader[bodyItem].type === 'date' || bodyItem === 'date') {
                  tBody += ` ${body[bodyItem] !== '0000-00-00 00:00:00' ? jMoment(body[bodyItem], 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD') : '?'}`;
                }
                if (tableHeader[bodyItem].type === 'datetime' || bodyItem === 'datetime') {
                  tBody += ` ${body[bodyItem] !== '0000-00-00 00:00:00' ? jMoment(body[bodyItem], 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD') : '?'}`;
                }
              } else {
                tBody += ` ${app.translate(`components.common.report-print.${body[bodyItem]}`, `${body[bodyItem]}`)}`;
              }
              tBody += ` ${body._props && body._props[bodyItem] && body._props[bodyItem].after ? body._props[bodyItem].after : ''}</td>`;

              matched = true;
              break;
            }
          }
        }
        if (!matched) {
          if (isTotal) {
            tBody += `<td style="background: lightgray">:</td>`;
          } else {
            tBody += `<td>:</td>`;
          }
        }
      }
      tBody += '</tr>' + '\n';
    });

    return render('report.print.table-body', {tableBody: tBody});
  }
}