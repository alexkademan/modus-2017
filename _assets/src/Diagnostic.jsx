import React from 'react';
import PropTypes from 'prop-types';
import DiagnosticPanel from './components/DiagnosticPanel';
import DocumentStore from './flux/documentStore';
// import './sass/diagnostic.scss';

class Diagnostic extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      window: DocumentStore.getWindowSize(),
      isAdmin: props.user,
      wholeLayout: props.wholeLayout, // DOM element for size of page.
      modal: DocumentStore.getModalState(),
      layoutScrollY: 0,
    };

    DocumentStore.addListener('toggleModal', () => {
      this.setState({
        modal: DocumentStore.getModalState(),
      });
      this.toggleModal();
    });

    this.updateDimensions = this.updateDimensions.bind(this);
    this.handleKeyboard = this.handleKeyboard.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
    window.addEventListener('scroll', this.updateDimensions);
    document.addEventListener('keyup', this.handleKeyboard);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
    window.removeEventListener('scroll', this.updateDimensions);
    document.removeEventListener('keyup', this.handleKeyboard);
  }

  updateDimensions() {
    DocumentStore.configureDocInfo(
      this.state.wholeLayout.clientWidth,
      this.state.wholeLayout.clientHeight,
    );
    this.setState({ window: DocumentStore.getWindowSize() });
    if (this.state.modal) { this.modalBackgroundOn(); }

    // if (this.state.window.scrollY) {
    //   DocumentStore.set
    // }
    if (this.state.modal) {
      DocumentStore.setModalScrollPosition(this.state.window.scrollY);
    } else {
      DocumentStore.setPageScrollPosition(this.state.window.scrollY);
    }
  }

  toggleModal() {
    const el = this.state.wholeLayout;
    const className = 'modal-background';

    if (this.state.modal) {
      if (!el.classList.contains(className)) {
        DocumentStore.setPageScrollStatus(this.state.window.scrollY);
        this.setState({
          layoutScrollY: DocumentStore.getPageScrollStatus(),
        });
        this.modalBackgroundOn();
        window.scrollTo(0, 0);
        // add blur effect to page:
        // https://jaketrent.com/post/addremove-classes-raw-javascript/
        el.classList.add(className);
      }
    } else if (el.classList.contains(className)) {
      this.modalBackgroundOff();
      // remove blur effect from page:
      el.classList.remove(className);
    }
  }

  handleKeyboard(e) {
    if (e.code === 'KeyM') {
      DocumentStore.toggleModal('main-nav');
    }
    if (e.code === 'KeyP') {
      DocumentStore.toggleModal('dog-modal');
    }
    if (e.code === 'KeyN') {
      DocumentStore.toggleModal();
    }
    if (this.state.modal && e.code === 'Escape') {
      DocumentStore.toggleModal();
    }
  }

  modalBackgroundOn() {
    const modalHeight = this.state.window.height + this.state.layoutScrollY;
    let bgStyle = 'position: fixed; left: 0; top: 0; overflow: hidden;';
    bgStyle += ` margin-top: -${this.state.layoutScrollY}px;`;
    bgStyle += ` width: ${this.state.window.width}px;`;
    bgStyle += ` height: ${modalHeight}px;`;
    this.state.wholeLayout.setAttribute('style', bgStyle);
  }

  modalBackgroundOff() {
    this.state.wholeLayout.setAttribute('style', '');
    window.scrollTo(this.state.window.scrollX, this.state.layoutScrollY);
  }

  render() {
    if (this.state.isAdmin) {
      return <DiagnosticPanel />;
    }
    return false;
  }
}

Diagnostic.propTypes = {
  user: PropTypes.bool,
  wholeLayout: PropTypes.shape({}),
};

Diagnostic.defaultProps = {
  user: false,
  wholeLayout: '',
};

export default Diagnostic;
