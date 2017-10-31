import React from 'react';
import DocumentStore from '../flux/documentStore';

class MainNav extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modal: DocumentStore.getModalState(),
      toggleButton: DocumentStore.getModalState(),
    };
  }

  render() {
    return (
      <nav className="site-nav">
        <a>About</a>
        <a>Work</a>
        <a>Ideas</a>
        <a>Contact</a>
      </nav>
    );
  }
}

export default MainNav;
