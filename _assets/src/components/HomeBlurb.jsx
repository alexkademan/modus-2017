import React from 'react';
import PropTypes from 'prop-types';
import DocumentStore from '../flux/documentStore';

class HomeBlurb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: props.blurb.key,
      sort: props.blurb.sort,
      paragraph: props.blurb.paragraph,
      title: props.blurb.title,
      liWidth: 0,
      showing: false,
      circleProgress: 0,
      // increment: 0.05,
    };
  }

  componentDidMount() {
    this.state.emitterPageSize = DocumentStore.addListener('change', () => {
      this.checkDimensions();
    });
    this.checkDimensions();

    this.state.introStatus = DocumentStore.addListener('homeDots', () => {
      this.checkVisibility();
    });
    this.checkVisibility();
  }

  componentWillUnmount() {
    this.state.emitterPageSize.remove();
    this.state.introStatus.remove();
  }

  checkDimensions() {
    if (this.node.offsetWidth !== this.state.liWidth) {
      this.setState({
        liWidth: this.node.offsetWidth,
      });
    }
  }

  checkVisibility() {
    // ask the store if this should run it's intro animation:
    if (
      this.state.sort <= DocumentStore.getHomeDotsIntro() &&
      this.state.showing === false
    ) {
      if (this.state.sort === 0) {
        this.setState({ showing: true });
        this.runIntro();
      } else {
        setTimeout(() => {
          this.setState({ showing: true });
          this.runIntro();
        }, 300);
      }
    }
  }

  runIntro() {
    if (this.state.circleProgress < 1) {
      // let nextIncrement = this.state.circleProgress + this.state.increment;
      const remaining = (1 - this.state.circleProgress);
      let nextIncrement = this.state.circleProgress + (remaining * 0.1);
      if (nextIncrement > 0.99) {
        nextIncrement = 1;
      }
      this.setState({
        circleProgress: nextIncrement,
      });

      setTimeout(() => {
        this.runIntro();
      }, 20);
    }

    const currentState = DocumentStore.getHomeDotsIntro();
    if (
      currentState === this.state.sort &&
      this.state.circleProgress > 0.9
    ) {
      DocumentStore.setHomeDotsIntro(currentState + 1);
    }
  }

  render() {
    const halfWidth = this.state.liWidth / 2;
    const radius = this.state.circleProgress * halfWidth;

    // console.log(radius);

    let bgSVG = 'url("data:image/svg+xml;utf8,<svg ';
    // bgSVG += `viewBox='0 0 ${this.state.liWidth} ${this.state.liWidth}' `;
    bgSVG += "xmlns='http://www.w3.org/2000/svg'>";
    bgSVG += '<circle';
    bgSVG += ` cx='${halfWidth}'`;
    bgSVG += ` cy='${halfWidth}'`;
    bgSVG += ` r='${radius}'`;
    // bgSVG += ` r='${halfWidth}'`;
    // bgSVG += ` fill='rgba(29, 142, 172, ${this.state.circleProgress})' `;
    bgSVG += ' fill=\'rgb(29, 142, 172)\' ';
    bgSVG += ' /></svg>")';

    const inlineStyle = {
      minHeight: this.state.liWidth,
      backgroundImage: bgSVG,
    };

    return (
      <li
        ref={(node) => { this.node = node; }}
        style={inlineStyle}
        className={this.state.showing ? 'showing' : 'hid'}
      >
        <h1>{this.state.title}</h1>
        <span className="highlight">{this.state.paragraph}</span>
      </li>
    );
  }
}

HomeBlurb.propTypes = {
  blurb: PropTypes.shape({
    key: PropTypes.string,
    sort: PropTypes.number,
    paragraph: PropTypes.string,
    title: PropTypes.string,
  }),
};

HomeBlurb.defaultProps = {
  blurb: '',
};

export default HomeBlurb;
