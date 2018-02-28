import React from 'react';
import DocumentStore from '../flux/documentStore';
// import DocumentActions from '../flux/documentActions';
import MainNav from './MainNav';
import WorkModal from './WorkModal';
import DogModal from './DogModal';
import MailModal from './MailModal';

class ModalController extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: DocumentStore.getModalState(),
      modalTitle: DocumentStore.getModalTitle(),
    };
  }

  render() {
    if (this.state.modal) {
      switch (this.state.modalTitle) {
      case 'main-nav':
        return <MainNav />;
      case 'dog-modal':
        return <DogModal />;
      case 'work-modal':
        return <WorkModal />;
      case 'mail-sent':
        return <MailModal />;
      default:
        return (
          <div className="default-modal">
            Default Modal.
          </div>
        );
      }
    }
    return false;
  }
}

export default ModalController;
