import React from 'react';
import DocumentStore from '../flux/documentStore';
import MainNav from './MainNav';

class ModalController extends React.Component {
  constructor() {
    super();
    this.state = {
      window: DocumentStore.getWindowSize(),
      modal: DocumentStore.getModalState(),
      modalInfo: DocumentStore.getModalInfo(),
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  }

  handleClick(e) {
    if (this.node && e.target.className === 'site-modal') {
      console.log('node exists...');
    }
  }

  renderDefault() {
    console.log(this.state.modalInfo);
    return (
      <div>
        this is the default modal render method.
      </div>
    );
  }

  render() {
    // console.log(this.state.modalInfo);
    if (this.state.modal) {
      if (this.state.modalInfo === 'main-nav') {
        return <MainNav />;
      }
      return this.renderDefault();
    }
    return false;
  }
}

export default ModalController;
