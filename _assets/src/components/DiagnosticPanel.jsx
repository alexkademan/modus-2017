import React from 'react';
import PropTypes from 'prop-types';
import DocumentStore from '../flux/documentStore';

class DiagnosticPanel extends React.Component {
  constructor() {
    super();

    this.state = {
      window: DocumentStore.getWindowSize(),
      showPanel: false,
      modal: DocumentStore.getModalState(),
      modalName: DocumentStore.getModalInfo(),
    };

    DocumentStore.addListener('change', () => {
      this.setState({ window: DocumentStore.getWindowSize() });
    });

    DocumentStore.addListener('toggleModal', () => {
      this.setState({
        modal: DocumentStore.getModalState(),
        modalName: DocumentStore.getModalInfo(),
      });
    });

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyboard = this.handleKeyboard.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick);
    document.addEventListener('keyup', this.handleKeyboard);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
    document.removeEventListener('keyup', this.handleKeyboard);
  }

  handleClick(e) {
    if (this.node && this.node.contains(e.target)) {
      switch (e.target.className) {
      case 'fa fa-window-close':
        this.setState({ showPanel: false });
        break;
      case 'fa fa-chevron-right':
        this.setState({ showPanel: true });
        break;
      case 'react-diagnostic-off':
        this.setState({ showPanel: true });
        break;
      case 'modal':
        DocumentStore.toggleModal();
        break;
      default:
        console.log(e.target.className);
      }
    }
  }

  handleKeyboard(e) {
    if (e.code === 'KeyD') {
      this.togglePanel();
    }
  }

  togglePanel() {
    if (this.state.showPanel) {
      this.setState({ showPanel: false });
    } else {
      this.setState({ showPanel: true });
    }
  }

  renderPanel() {
    return (
      <div className="react-diagnostic" ref={(node) => { this.node = node; }}>
        <header>
          <i className="fa fa-window-close" aria-hidden="true" />
        </header>
        <p>
          window:&nbsp;
          {this.state.window.width} x {this.state.window.height}
        </p>
        <p>
          page:&nbsp;
          {this.state.window.layoutWidth} x {this.state.window.layoutHeight}
        </p>
        <p>scroll: {this.state.window.scrollY}</p>
        <p>direction: {this.state.window.scrollDirection}</p>
        <p className="modal">modal: {this.state.modal ? 'on' : 'off'}</p>
        <p>modalName: {this.state.modalName ? this.state.modalName : 'none'}</p>
      </div>
    );
  }

  renderPanelOff() {
    return (
      <div className="react-diagnostic-off" ref={(node) => { this.node = node; }}>
        <i className="fa fa-chevron-right" aria-hidden="true" />
      </div>
    );
  }

  render() {
    if (this.state.showPanel) {
      return this.renderPanel();
    }
    return this.renderPanelOff();
  }
}

DiagnosticPanel.propTypes = {
  showPanel: PropTypes.bool,
  modal: PropTypes.bool,
};

DiagnosticPanel.defaultProps = {
  showPanel: true,
  modal: false,
};

export default DiagnosticPanel;
