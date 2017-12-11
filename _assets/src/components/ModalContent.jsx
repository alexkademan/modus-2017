import React from 'react';
import DocumentStore from '../flux/documentStore';
import DocumentActions from '../flux/documentActions';
import MainNav from './MainNav';
import DogModal from './DogModal';

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
        // const dogs = DocumentStore.getDogsArray();
        return (
          <DogModal
            allPosts={DocumentStore.getDogsArray()}
            currentPost={DocumentActions.randomNumber(DocumentStore.getDogsArray().length)}
          />
        );
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
