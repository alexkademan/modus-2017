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
    if (this.modalNode && e.target.classList.contains('site-modal')) {
      DocumentStore.toggleModal();
    }
  }

  handleKeyboard(e) {
    if (e.code === 'KeyM') {
      // DocumentStore.setModalInfo('main-nav');
      DocumentStore.toggleModal('main-nav');
    }
    if (this.state.modal && e.code === 'Escape') {
      DocumentStore.toggleModal();
    }
  }

  render() {
    let modalName = 'site-modal-container';
    if (this.state.modalInfo) {
      modalName += ` ${this.state.modalInfo}`;
    }

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
      this.state.modal ||
      this.state.modalFader === 'fade-out-start' ||
      this.state.modalFader === 'fade-out'
    ) {
      return (
        <div className={modalName}>
          <span className={modalStyle} ref={(modalNode) => { this.modalNode = modalNode; }}>
            <ModalContent />
          </span>
        </div>
      );
    }
    return false;
  }
}

export default Modal;
