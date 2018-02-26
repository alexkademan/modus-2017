import React from 'react';
import PropTypes from 'prop-types';
import DocumentStore from '../flux/documentStore';

class WelcomeMat extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      sectionCount: DocumentStore.getSectionCount(),
      headline1: props.phpVars.headline1,
      headline2: props.phpVars.headline2,
      headlineVisibility: 0,
      subhead1: props.phpVars.subhead1,
      subheadVisibility: 0,
      nextButtonVisibility: 0,
      parent: props.parent,
    };
  }

  componentDidMount() {
    this.state.emitter = DocumentStore.addListener('sectionLoaded', () => {
      this.checkUserStatus();
    });
    this.checkUserStatus();

    this.state.emitterPageSize = DocumentStore.addListener('change', () => {
      this.checkDimensions();
    });
    this.checkDimensions();

    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    this.state.emitter.remove();
    this.state.emitterPageSize.remove();
    document.removeEventListener('click', this.handleClick);
  }

  handleClick(e) {
    if (this.node.contains(e.target)) {
      if (e.target.classList.contains('down-arrow')) {
        this.setState({
          lastScrollPosition: DocumentStore.getWindowSize().scrollY,
        });
        this.scrollDown();
      }
    }
  }

  scrollDown() {
    const currentPosition = window.scrollY;

    if (
      currentPosition < this.state.componentHeight &&
      this.state.lastScrollPosition === currentPosition
    ) {
      setTimeout(() => {
        const remainingDistance = this.state.componentHeight -
            currentPosition;
        let interval = Math.round(remainingDistance * 0.2);
        if (interval === 0) {
          interval = 1;
        }
        let nextPos = currentPosition + interval;
        if (nextPos > this.state.componentHeight) {
          nextPos = this.state.componentHeight;
        }

        this.setState({ lastScrollPosition: nextPos });
        window.scroll(DocumentStore.getWindowSize().scrollX, nextPos);
        this.scrollDown();
      }, 20);
    }
  }

  checkUserStatus() {
    if (DocumentStore.getSectionCount() > 0) {
      // begin the fade in intro thing.
      if (this.state.nextButtonVisibility === 0) {
        // this hasn't run yet.
        this.runIntro();
      }
    }
  }

  checkDimensions() {
    this.setState({
      componentHeight: DocumentStore.getWindowSize().height,
    });
  }

  runIntro() {
    // set visibility to true, one at a time.
    if (this.state.headlineVisibility === 0) {
      setTimeout(() => {
        this.setState({ headlineVisibility: 1 });
        this.runIntro();
      }, 900);
    } else if (this.state.subheadVisibility === 0) {
      setTimeout(() => {
        this.setState({ subheadVisibility: 1 });
        this.runIntro();
      }, 300);
    } else if (this.state.nextButtonVisibility === 0) {
      setTimeout(() => {
        this.setState({ nextButtonVisibility: 1 });
      }, 900);
    }
  }

  render() {
    this.state.parent.style.height = `${this.state.componentHeight}px`;
    return (
      <div
        ref={(node) => { this.node = node; }}
        className="subhead"
      >
        <h1
          className={
            this.state.headlineVisibility ?
              'fade' : 'fade invisible'
          }
        >
          {this.state.headline1}<br />
          {this.state.headline2}
        </h1>
        <p
          className={
            this.state.subheadVisibility ?
              'fade' : 'fade invisible'
          }
        >
          {this.state.subhead1}
        </p>
        <span
          className={
            this.state.nextButtonVisibility ?
              'fade bottom' : 'fade bottom invisible'
          }
        >
          <span className="circle">
            <svg className="down-arrow" viewBox="0 0 150 150">
              <path className="a" d="M106.48 75.74L77.92 104.3V35.65a2.92 2.92 0 1 0-5.84 0v68.65L43.53 75.74a2.93 2.93 0 0 0-4.14 4.14l33.54 33.54 2.07 2.06 2.07-2.06 33.54-33.54a2.92 2.92 0 0 0-4.13-4.14z" />
              <path className="a" d="M75 0a75 75 0 1 0 75 75A75.09 75.09 0 0 0 75 0zm0 144.15A69.16 69.16 0 1 1 144.16 75 69.24 69.24 0 0 1 75 144.15z" />
            </svg>
          </span>
        </span>
      </div>
    );
  }
}

WelcomeMat.propTypes = {
  phpVars: PropTypes.shape({
    headline1: PropTypes.string,
    headline2: PropTypes.string,
    subhead1: PropTypes.string,
  }),
  parent: PropTypes.shape({}),
};

WelcomeMat.defaultProps = {
  phpVars: '',
  parent: '',
};

export default WelcomeMat;
