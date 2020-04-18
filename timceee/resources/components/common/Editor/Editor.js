import React from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';
import {Input} from 'antd';
import 'assets/tinymce/tinymce.min';
import 'assets/tinymce/skins/lightgray/skin.min.css';

@autobind
/**
 *
 * @extends React.PureComponent
 */
export default class Editor extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.string,
  };

  static defaultProps = {
    name: 'textarea',
    onChange: () => {
    },
    value: '',
  };

  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      uuidv1: uuidv1(),
    };
  }

  /**
   *
   */
  componentDidMount() {
    this._renderTiny();
  }

  /**
   *
   * @param {Object} nextProps
   * @param {Object} nextContext
   */
  componentWillReceiveProps(nextProps, nextContext) {
  }


  /**
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();
  }

  /**
   *
   * @private
   */
  _renderTiny() {
    const {onChange, name} = this.props;
    const {uuidv1} = this.state;
    tinymce.init({
      mode: 'specific_textareas',
      editor_selector: `${name}${uuidv1}`,
      // selector: `#${name}`,
      height: 250,
      plugins: [
        'advlist autolink autosave link image lists charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
        'table contextmenu directionality emoticons template textcolor paste fullpage textcolor colorpicker textpattern',
      ],
      toolbar: 'bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | ltr rtl | formatselect fontselect fontsizeselect | undo redo | link image table hr | charmap emoticons | print fullscreen ',
      menubar: false,
      font_formats: 'Arial=arial,helvetica,sans-serif;Samim=samim;Tahoma=Tahoma,helvetica,sans-serif',
      toolbar_items_size: 'small',
      directionality: 'rtl',
      content_style: 'html { direction: rtl}',
      setup: function (editor) {
        editor.on('Change', function (e) {
          onChange(e.level.content);
        });
        editor.on('change', function (e) {
          onChange(e.level.content);
        });
      },

      init_instance_callback: function (editor) {
        editor.execCommand('fontName', false, 'Samim');
        // editor.execCommand('mceImage');
      },
      // // without images_upload_url set, Upload tab won't show up
      // images_upload_url: 'postAcceptor.php',
      //
      // // we override default upload handler to simulate successful upload
      // images_upload_handler: function (blobInfo, success, failure) {
      //   setTimeout(function () {
      //     // no matter what you upload, we will turn it into TinyMCE logo :)
      //     success('http://moxiecode.cachefly.net/tinymce/v9/images/logo.png');
      //   }, 2000);
      // },

      // init_instance_callback: function (ed) {
      //  // ed.execCommand('mceImage');
      // },
    });
  }


  /**
   *
   * @return {XML}
   */
  render() {
    const {name, value} = this.props;
    const {uuidv1} = this.state;
    let _name = `${name}${uuidv1}`;
    let html = $(value);
    return (
      <div style={{
        // border: '1px solid #999',
        // padding: '10px',
      }}>
        <Input.TextArea
          id={_name}
          className={_name}
          value={html.html()}
        />
      </div>
    );
  }
}
