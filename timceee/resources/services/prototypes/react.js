import { Component, PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import { Modal } from 'antd';
/* eslint-disable no-invalid-this */

const componentWillMount = function() {
  this.mounted = true;

  // eslint-disable-next-line
  this._domNode = findDOMNode(this);

  document.addEventListener('click', (event) => {
    if (this._domNode && !this._domNode.contains(event.target)) {
      this.handleOutsideClick(event);
    }
  }, false);
};

const componentWillUnmount = function() {
  this.mounted = false;
};

// const componentDidCatch = function(error, info) {
//   // eslint-disable-next-line
//   console.log(`componentDidCatch at ${this.constructor.name}`, '\n Error: \n', error, '\n Info: \n', info);
//
//   Modal.confirm({
//     title: app.translate('main.Something went wrong'),
//     content: app.translate('main.Do you want to report this problem'),
//     onOk() {
//       // eslint-disable-next-line
//       console.log('report error');
//     },
//     onCancel() {
//       // eslint-disable-next-line
//       console.log('don\'t report error');
//     },
//   });
// };

const setState = function(setState) {
  return function(...args) {
    if (this.mounted) {
      setState.call(this, ...args);
    }
  };
};

const forceUpdate = function(forceUpdate) {
  return function(...args) {
    if (this.mounted) {
      forceUpdate.call(this, ...args);
    }
  };
};

const handleOutsideClick = function(event) {};

// -------------------------------------------------------------------- Component --------------------------------------------------------------------
Component.prototype.componentWillMount = componentWillMount;
Component.prototype.componentWillUnmount = componentWillUnmount;
// Component.prototype.componentDidCatch = componentDidCatch;
Component.prototype.handleOutsideClick = handleOutsideClick;
// Component.prototype.setState = (setState(Component.prototype.setState)); // TODO didn't work

// ------------------------------------------------------------------ PureComponent ------------------------------------------------------------------
PureComponent.prototype.setState = (setState(PureComponent.prototype.setState));
PureComponent.prototype.forceUpdate = (forceUpdate(PureComponent.prototype.forceUpdate));
