import React from 'react';
// import PropTypes from 'prop-types';
import DocumentStore from '../flux/documentStore';

class MainNavButton extends React.Component {

  constructor() {
    super();
    this.state = {
      window: DocumentStore.getWindowSize(),
      modal: DocumentStore.getModalState(),
      toggleButton: DocumentStore.getModalState(),
      pagesArray: DocumentStore.getPageNavigation(),
      navVisible: true,
      modalFadeOut: 'off',
    };
    DocumentStore.addListener('toggleModal', () => { this.configureState(); });
    DocumentStore.addListener('change', () => { this.configureState(); });
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  }

  configureState() {
    this.setState({
      window: DocumentStore.getWindowSize(),
      modal: DocumentStore.getModalState(),
      toggleButton: DocumentStore.getModalState(),
      modalName: DocumentStore.getModalInfo(),
    });
    if (
      !this.state.modal &&
      !DocumentStore.getModalFader()
    ) {
      // modal isn't open, nor was it JUST closed:
      if (
        this.state.window.scrollY > 85 &&
        this.state.window.scrollDirection === 'down'
      ) {
        this.setState({ navVisible: false });
      } else {
        this.setState({ navVisible: true });
      }
    } else if (this.state.modalName === 'main-nav') {
      this.setState({ navVisible: true });
    }
  }

  handleClick(e) {
    if (this.node && this.node.contains(e.target)) {
      DocumentStore.toggleModal('main-nav');
    }
  }

  renderNavButton() {
    let nodeClass = 'main-nav-button';
    if (DocumentStore.getModalInfo() === 'main-nav') {
      nodeClass += ' open';
    } else if (this.state.modal) {
      // modal is open and not to main navigation...
      nodeClass += ' blur';
    }

    let nodeContainerClass = 'main-nav-button-div';
    if (!this.state.navVisible) {
      nodeContainerClass += ' hide-button';
    }

    return (
      <div className={nodeContainerClass}>
        <div className={nodeClass} ref={(node) => { this.node = node; }}>
          <div className="hamburger">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.pagesArray) {
      // there IS a main navigation, so lets show the toggle button on screen
      return this.renderNavButton();
    }
    return false;
  }
}

export default MainNavButton;
