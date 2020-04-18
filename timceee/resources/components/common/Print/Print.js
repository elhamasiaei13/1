import render from 'services/engines/template';
import jMoment from 'moment-jalaali';

@autobind
export default class Print {
  /**
   * Constructing ReportPrint object
   * @param {Object} options
   */
  constructor(options) {
    this.options = Object.assign({}, {
      pageTitle: '',
      pageStyle: '',
      pageLead: '',
      title: '',
      printDate: jMoment().format('jDD-jMM-jYYYY'),
      data: [`<div></div>`,],
      copyRight: '',
      theme: 'writs.print',
    }, options);
  }

  /**
   * Make and print configured table
   */
  print() {
    let _document = '';

    _document += this.renderPage(`header`, {pageTitle: this.options.pageTitle, pageStyle: this.options.pageStyle});
    this.options.data.map((layout, index) => {
      _document += this.renderPage(`page-header`, {
        pageLead: this.options.pageLead,
        title: this.options.title,
        printDate: this.options.printDate,
        page: index+1,
      });
      _document += this.renderPage(`page-body`, {body: layout});
      _document += this.renderPage(`page-footer`, {copyRight: this.options.copyRight});
    });
    _document += this.renderPage(`footer`, {});
    /*
        let ifrm = document.createElement('iframe');
        ifrm.setAttribute('id', 'iframe');
        ifrm.setAttribute('name', 'iframe');
        ifrm.setAttribute('style', 'display:none');
        ifrm.setAttribute('src', 'data:text/html;charset=utf-8,' + _document);
        document.body.appendChild(ifrm);

        ifrm.remove();
        let x = document.getElementById("myframe");
        x.src='data:text/html;charset=utf-8,'+_document;
        x.contentWindow.print();

        // */

    //let w = (x.contentWindow || x.contentDocument);
    let params = [
      'height=' + screen.height,
      'width=' + screen.width,
      'fullscreen=yes', // only works in IE, but here for completeness
    ].join(',');
    let w = window.open('about:blank', this.options.pageTitle, params);
    // w.document = _document;
    w.document.innerHTML = '';
    w.document.write(_document);
    w.onload = wl(w);

    function wl(s) {
      s.setInterval(() => {
        s.print();
        s.close();
      }, 1800);
    }

    // w.setInterval(() => {
    //   w.print();
    //   w.close();
    // }, 3500);
  }

    /**
     * Render print page header items
     * @param {String} name
     * @param {Object} header
     * @return {string}
     */
    renderPage(name, header) {
      let values = {};
      for (let property in header) {
        if (header.hasOwnProperty(property)) {
          values[property.toString()] = header[property];
        }
      }

      return render(`${this.options.theme}.${name}`, values);
    }
  }