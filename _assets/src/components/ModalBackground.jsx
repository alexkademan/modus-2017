import React from 'react';
// import PropTypes from 'prop-types';
import DocumentStore from '../flux/documentStore';

class ModalBackground extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      window: DocumentStore.getWindowSize(),
      modal: DocumentStore.getModalState(),
      modalTitle: DocumentStore.getModalTitle(),
      modalFadeState: DocumentStore.getModalFadeState(),
      circleSize: 0,
      circleMaxSize: 5,
    };
  }

  componentDidMount() {
    this.calcValues();
    this.fadeIn();
    this.state.emitter = DocumentStore.addListener('toggleModal', () => {
      this.runAnimation();
    });
  }

  componentWillUnmount() {
    this.state.emitter.remove();
  }

  calcValues() {
    let patternSize = 60;
    if (this.state.window.width < 701) {
      patternSize = 20;
    } else if (this.state.window.width < 1100) {
      patternSize = 40;
    } else {
      patternSize = 60;
    }
    const circleMaxSize = patternSize * 0.75;
    this.setState({
      patternSize,
      circleMaxSize,
      circleCenter: (patternSize * 0.5),
      increment: (circleMaxSize / 40),
    });
  }

  runAnimation() {
    if (DocumentStore.getModalFadeState() === 3) {
      this.fadeOut();
    }
  }

  fadeIn() {
    if (this.state.circleSize < this.state.circleMaxSize) {
      setTimeout(() => {
        if (
          this.state.circleMaxSize >
          (this.state.circleSize + this.state.increment)
        ) {
          this.setState({
            circleSize: this.state.circleSize + this.state.increment,
          });
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
        if ((this.state.circleSize - this.state.increment) > 0) {
          this.setState({
            circleSize: this.state.circleSize - this.state.increment,
          });
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
        height="100%"
        className="svg-background"
      >
        <pattern
          id="pattern-circles"
          x="0"
          y="0"
          width={this.state.patternSize}
          height={this.state.patternSize}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
        >
          <circle
            id="pattern-circle"
            className="pattern-circle"
            cx={this.state.circleCenter}
            cy={this.state.circleCenter}
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
    // this.calcValues(50);
    // if (this.state.modalTitle === 'main-nav') {
    return this.mainNavPolkaDots();
    // }
    // return false;
  }
}

export default ModalBackground;
