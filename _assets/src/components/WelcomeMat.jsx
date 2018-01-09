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
  }

  handleClick(e) {
    if (this.node.contains(e.target)) {
      if (e.target.classList.contains('fa')) {
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
      <span
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
              'fade' : 'fade invisible'
          }
        >
          <i
            className="fa fa-chevron-circle-down"
            aria-hidden="true"
          />
        </span>
      </span>
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
