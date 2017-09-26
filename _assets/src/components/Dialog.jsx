/* @flow */

import React, { Component } from 'react';
// import Button from './Button';

type Props = {
  header: string,
  // confirmLabel: string,
  modal: boolean,
  onAction: Function,
  hasCancel: ?boolean,
  // children?: Array<any>,
};

class Dialog extends Component {

  static defaultProps = {
    confirmLabel: 'ok',
    modal: false,
    onAction: () => {},
    hasCancel: true,
  };

  constructor() {
    super();
    this.closeDialog = this.closeDialog.bind(this);
  }
  componentDidMount() {
    if (this.props.modal) {
      document.body.classList.add('DialogModalOpen');
    }
  }
  componentWillUnmount() {
    document.body.classList.remove('DialogModalOpen');
  }

  closeDialog() {
    this.props.onAction('dismiss');
  }
  props: Props;

  render() {
    return (
      <div className={this.props.modal ? 'Dialog DialogModal' : 'Dialog'}>
        <div className={this.props.modal ? 'DialogModalWrap' : null}>
          <div className="DialogHeader">{this.props.header}</div>
          {/* <div className="DialogBody">{this.props.children}</div> */}
          <div className="DialogFooter">
            {this.props.hasCancel
              ? <button className="closeBtn" onClick={this.closeDialog} />
              : null
            }
            {/* <Button onClick={this.props.onAction.bind(this,
                this.props.hasCancel ? 'confirm' : 'dismiss')}>
              {this.props.confirmLabel}
            </Button> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Dialog;
