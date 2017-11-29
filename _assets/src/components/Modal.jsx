import React from 'react';
// import ReactDOM from 'react-dom';
import DocumentStore from '../flux/documentStore';
import ModalContent from './ModalContent';

class Modal extends React.Component {
  constructor() {
    super();
    this.state = {
      window: DocumentStore.getWindowSize(),
      modal: DocumentStore.getModalState(),
      modalFader: 'off',
      modalVisible: false,
      modalInfo: DocumentStore.getModalInfo(),
    };

    DocumentStore.addListener('toggleModal', () => {
      this.setState({
        modal: DocumentStore.getModalState(),
        modalInfo: DocumentStore.getModalInfo(),
        modalParentName: DocumentStore.getmodalParentName(),
      });
      this.bgFade();
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

  bgFade() {
    if (this.state.modal === true) {
      this.setState({ modalFader: 'fade-in' });
      setTimeout(() => { this.setState({ modalFader: 'off' }); }, 1);
    } else {
      this.setState({ modalFader: 'fade-out-start' });

      // IMMEDIATELY change class to begin CSS transition.
      setTimeout(() => { this.setState({ modalFader: 'fade-out' }); }, 1);
      setTimeout(() => { this.setState({ modalFader: 'off' }); }, 250);
    }
  }

  handleClick(e) {
    if (
      (this.modalNode && e.target.classList.contains('site-modal')) ||
      (this.modalNode && e.target.classList.contains('site-nav')) ||
      (this.modalNode && e.target.classList.contains('close-modal'))
    ) {
      console.log('toggle-toggle');
      DocumentStore.toggleModal();
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

  render() {
    const modalName = `site-modal-container ${this.state.modalParentName}`;
    let modalInlineStyle;

    // set up the sate for the fade in/out:
    let modalStyle = 'site-modal';
    if (this.state.modalFader === 'fade-in') {
      modalStyle = 'site-modal site-modal-transparent-in';
    } else if (this.state.modalFader === 'fade-out-start') {
      modalStyle = 'site-modal-out site-modal-transparent-out';
    } else if (this.state.modalFader === 'fade-out') {
      modalStyle = 'site-modal-out';
    }

    if (
      this.state.modalFader === 'fade-out-start' ||
      this.state.modalFader === 'fade-out'
    ) {
      const topDistance = DocumentStore.getPageScrollStatus();
      modalInlineStyle = { top: `${topDistance}px` };
    }

    if (
      this.state.modal ||
      this.state.modalFader === 'fade-out-start' ||
      this.state.modalFader === 'fade-out'
    ) {
      return (
        <div className={modalName} style={modalInlineStyle}>
          <span
            className={modalStyle}
            ref={(modalNode) => { this.modalNode = modalNode; }}
          >
            <ModalContent />
          </span>
        </div>
      );
    }
    return false;
  }
}

export default Modal;
