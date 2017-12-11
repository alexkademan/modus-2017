import React from 'react';
// import ReactDOM from 'react-dom';
import DocumentStore from '../flux/documentStore';
// import ModalBackgroundNav from './ModalBackgroundNav';
import ModalBackground from './ModalBackground';
import ModalBackgroundDefault from './ModalBackgroundDefault';
import ModalContent from './ModalContent';

class Modal extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: DocumentStore.getModalState(),
      modalFader: 'off',
      modalTitle: DocumentStore.getModalTitle(),
      emitToggle: '',
      emitModal: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.state.emitToggle = DocumentStore.addListener('toggleModal', () => {
      this.setState({
        modal: DocumentStore.getModalState(),
        modalTitle: DocumentStore.getModalTitle(),
        modalFadeState: DocumentStore.getModalFadeState(),
      });
    });

    this.state.emitModal = DocumentStore.addListener('modalFadeState', () => {
      this.setState({
        modalFadeState: DocumentStore.getModalFadeState(),
        modalTitle: DocumentStore.getModalTitle(),
      });
    });
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    this.state.emitToggle.remove();
    this.state.emitModal.remove();
    document.removeEventListener('click', this.handleClick);
  }

  handleClick(e) {
    if (
      (this.modalNode && e.target.classList.contains('site-modal')) ||
      (this.modalNode && e.target.classList.contains('site-nav')) ||
      (this.modalNode && e.target.classList.contains('close-modal')) ||
      (this.modalNode && e.target.classList.contains('svg-bg'))
    ) {
      DocumentStore.toggleModal();
    }
  }

  render() {
    const modalName = `site-modal-container ${this.state.modalTitle}`;
    const pageScroll = DocumentStore.getPageScrollPosition();
    const modalScroll = DocumentStore.getModalScrollPosition();
    const modalFadeState = DocumentStore.getModalFadeState();
    const windowHeight = DocumentStore.getWindowSize().height;
    const modalInlineStyle = [];
    const modalFaderStyle = [];

    if (modalFadeState === 1 || modalFadeState === 3) {
      modalFaderStyle.background = 'transparent';
    }

    if (modalFadeState === 3) {
      // we're fading out now...
      let top = 0;
      if (pageScroll) { top = pageScroll; }
      if (modalScroll) { top -= modalScroll; }

      modalInlineStyle.top = `${top}px`;
      modalFaderStyle.height = windowHeight + modalScroll;
    }

    return (
      <div className={modalName} style={modalInlineStyle}>
        <span
          className="site-modal"
          ref={(modalNode) => { this.modalNode = modalNode; }}
          style={modalFaderStyle}
        >
          {
            this.state.modalTitle === 'main-nav' ?
              <ModalBackground /> :
              <ModalBackgroundDefault />
          }
          {this.state.modal ? <ModalContent /> : ''}
        </span>
      </div>
    );
  }
}

export default Modal;
