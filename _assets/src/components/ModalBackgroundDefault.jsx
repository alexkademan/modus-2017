import React from 'react';
// import PropTypes from 'prop-types';
import DocumentStore from '../flux/documentStore';

class ModalBackgroundDefault extends React.Component {
  constructor() {
    super();
    this.state = {
      fadeInTime: 3,
      fadeOutTime: 300,
    };
  }

  componentDidMount() {
    console.log('ModalBackgroundDefault');
    this.state.emitter = DocumentStore.addListener('modalFadeState', () => {
      this.listener();
    });

    setTimeout(() => {
      DocumentStore.setModalFadeState(2);
    }, this.state.fadeInTime);
  }

  componentWillUnmount() {
    this.state.emitter.remove();
  }

  listener() {
    if (DocumentStore.getModalFadeState() === 3) {
      setTimeout(() => {
        DocumentStore.setModalFadeState(0);
      }, this.state.fadeOutTime);
    }
  }

  render() {
    return false;
  }
}

export default ModalBackgroundDefault;
