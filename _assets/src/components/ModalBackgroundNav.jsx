import React from 'react';
// import PropTypes from 'prop-types';
import DocumentStore from '../flux/documentStore';

class ModalBackground extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      window: DocumentStore.getDocInfo(),
      modal: DocumentStore.getModalState(),
      modalTitle: DocumentStore.getModalTitle(),
      modalFadeState: DocumentStore.getModalFadeState(),
      circleSize: 0,
      circleMaxSize: 15,
    };
    console.log(this.state.modalTitle);
  }

  componentDidMount() {
    this.fadeIn();
    this.state.emitter = DocumentStore.addListener('toggleModal', () => {
      this.runAnimation();
    });
  }

  componentWillUnmount() {
    this.state.emitter.remove();
  }

  runAnimation() {
    if (DocumentStore.getModalFadeState() === 3) {
      this.fadeOut();
    }
  }

  fadeIn() {
    if (this.state.circleSize < this.state.circleMaxSize) {
      setTimeout(() => {
        if (this.state.circleMaxSize > this.state.circleSize + 0.4) {
          this.setState({ circleSize: this.state.circleSize + 0.4 });
        } else {
          this.setState({ circleSize: this.state.circleMaxSize });
        }
        this.fadeIn();
      }, 5);
    } else {
      DocumentStore.setModalFadeState(2);
    }
  }

  fadeOut() {
    if (this.state.circleSize > 0) {
      setTimeout(() => {
        if (this.state.circleSize - 0.4 > 0) {
          this.setState({ circleSize: this.state.circleSize - 0.4 });
        } else {
          this.setState({ circleSize: 0 });
        }
        this.fadeOut();
      }, 5);
    } else {
      DocumentStore.setModalFadeState(0);
    }
  }

  mainNavPolkaDots() {
    return (
      <svg
        width="100%"
        height="100px"
        className="svg-background"
      >
        <pattern
          id="pattern-circles"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
        >
          <circle
            id="pattern-circle"
            className="pattern-circle"
            cx="10"
            cy="10"
            r={this.state.circleSize}
          />
        </pattern>
        <rect
          id="rect"
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#pattern-circles)"
          className="svg-bg"
        />
      </svg>
    );
  }

  render() {
    if (this.state.modalTitle === 'main-nav') {
      return this.mainNavPolkaDots();
    }
    return false;
  }
}

export default ModalBackground;
