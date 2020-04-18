import React from 'react';
import PropTypes from 'prop-types';
import 'assets/styles/hamburger.styl';

@autobind
/**
 */
export default class Hamburger extends React.PureComponent {
  static propTypes = {
    onHamburgerToggle: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    color: PropTypes.string,
    width: PropTypes.number,
  };

  static defaultProps = {
    className: '',
    style: {},
    color: '#A06BA5',
    width: 60,
  };

  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      className: 'hamburger ' + props.className,
    };
  }

  /**
   *
   * @param {object} np
   */
  componentWillReceiveProps(np) {
    if (this.props.className !== np.className) {
      if (this.props.className === '') {
        this.setState({
          className: this.state.className
            .replace(this.props.className, np.className),
        });
      } else {
        this.setState({
          className: this.state.className + ' ' + np.className,
        });
      }
    }
  }

  /**
   *
   */
  toggle() {
    let {className} = this.state;
    let {onHamburgerToggle} = this.props;

    let toggled = !(className.indexOf(' cross') > -1);

    if (!toggled) {
      className = className.replace(' cross', '');
    } else {
      className += ' cross';
    }

    this.setState({
      className,
    }, () => onHamburgerToggle(toggled));
  }

  /**
   *
   * @return {XML}
   */
  render() {
    const {className} = this.state;
    const {width, color, style} = this.props;

    return (
      <div
        ref={(ref) => this.hamburger = ref}
        className={className}
        onClick={this.toggle}
        style={style}
      >
        <svg
          viewBox="0 0 800 600"
          style={{
            width,
            height: ((width * 3) / 4),
          }}
        >
          <path
            id="top"
            d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,
            420 C440,340 300,200 300,200"
            style={{
              stroke: color,
            }}
          />
          <path
            id="middle"
            d="M300,320 L540,320"
            style={{
              stroke: color,
            }}
          />
          <path
            id="bottom"
            d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,
            410 C440,330 300,190 300,190"
            transform="translate(480, 320) scale(1, -1) translate(-480, -318) "
            style={{
              stroke: color,
            }}
          />
        </svg>
      </div>
    );
  }
}
