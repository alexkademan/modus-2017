// filter: https://codepen.io/andrewgibson/pen/oevQXm?editors=1100

import React from 'react';
import DocumentStore from '../flux/documentStore';

class HeaderImg extends React.Component {
  constructor() {
    super();

    this.state = {
      mainImg: 'http://192.168.1.110/~Alex/new/modus2017/wordpress/wp-content/themes/modus-2017/images/modus-building-169x75.jpg',
      pixelsWide: 169, // how many blocks wide is this?
    };
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    this.updateDimensions();
    this.state.emitter = DocumentStore.addListener('change', () => {
      this.updateDimensions();
    });
  }

  componentWillUnmount() {
    this.state.emitter.remove();
  }

  updateDimensions() {
    const newWidth = DocumentStore.getWindowWidth();

    this.setState({
      pageWidth: newWidth,
      patternWidth: newWidth / this.state.pixelsWide,
    });
  }

  render() {
    const circleCenter = this.state.patternWidth / 2;
    return (
      <div className="header-image" ref={(node) => { this.node = node; }}>
        <img
          src={this.state.mainImg}
          alt="Modus Design, Inc."
          className="placeholder"
        />
        <svg width="100%">
          <defs>
            <clipPath id="clip">
              <circle
                cx={circleCenter}
                cy={circleCenter}
                r={circleCenter}
                fill="white"
              />
            </clipPath>
            <pattern
              id="spots"
              x="0"
              y="0"
              width={this.state.patternWidth}
              height={this.state.patternWidth}
              patternUnits="userSpaceOnUse"
              patternContentUnits="userSpaceOnUse"
            >
              <rect
                width={this.state.patternWidth}
                height={this.state.patternWidth}
                x="0"
                y="0"
                fill="white"
                clipPath="url(#clip)"
              />
            </pattern>
            <mask id="mask">
              <rect
                width="100%"
                height="100%"
                x="0"
                y="0"
                fill="url(#spots)"
              />
            </mask>
          </defs>
          <image
            href={this.state.mainImg}
            width="100%"
            // height="762px"
            mask="url(#mask)"
          />
        </svg>
      </div>
    );
  }
}

export default HeaderImg;
