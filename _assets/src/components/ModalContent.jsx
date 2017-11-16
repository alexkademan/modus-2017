import React from 'react';
import DocumentStore from '../flux/documentStore';
import MainNav from './MainNav';
import DogModal from './DogModal';

class ModalController extends React.Component {
  constructor() {
    super();
    this.state = {
      window: DocumentStore.getWindowSize(),
      modal: DocumentStore.getModalState(),
      modalInfo: DocumentStore.getModalInfo(),
    };

    this.updateWindow = this.updateWindow.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindow);
    window.addEventListener('scroll', this.updateWindow);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindow);
    window.removeEventListener('scroll', this.updateWindow);
  }

  updateWindow() {
    this.setState({ window: DocumentStore.getWindowSize() });
  }

  render() {
    if (this.state.modal) {
      switch (this.state.modalInfo) {
      case 'main-nav':
        return <MainNav />;
      case 'dog-modal':
        return <DogModal />;
      default:
        return (<div className="default-modal">Default Modal.</div>);
      }
    }
    return false;
  }
}

export default ModalController;
