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
          src="https://i.imgur.com/caHgBhc.gif"
          alt="cute cat and doggo"
        />
        <p>This is where the cute dog pics go.</p>
        <p>Modus Design, Inc. is a dog friendly environment.</p>
      </div>
    );
  }
}

export default DogModal;
