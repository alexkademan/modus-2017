import React from 'react';
import DocumentStore from '../flux/documentStore';

class DogModal extends React.Component {

  constructor() {
    super();

    this.state = {
      pagesArray: DocumentStore.getPageNavigation(),
    };
  }

  render() {
    return (
      <div className="dog">
        <img
          src="http://stories.barkpost.com/wp-content/uploads/2013/02/tumblr_mg6b5xgrQb1rls0kbo1_500.gif"
          alt="cute cat and doggo"
        />
        <p>This is where the cute dog pics go.</p>
      </div>
    );
  }
}

export default DogModal;
