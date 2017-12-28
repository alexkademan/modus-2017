// filter: https://codepen.io/andrewgibson/pen/oevQXm?editors=1100

import React from 'react';
import PropTypes from 'prop-types';
import DocumentStore from '../flux/documentStore';

class HeaderImg extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.imgInfo);
    this.state = {
      ID: props.imgInfo.ID,
      imgURL: props.imgInfo.url,
      imgWidthOrig: props.imgInfo.width,
      imgHeightOrig: props.imgInfo.height,
      dotsWide: props.imgInfo.dots_wide,
      headerColor: props.imgInfo.header_color,
    };
  }

  componentWillMount() {
    this.checkDimensions();
  }

  componentDidMount() {
    this.state.emitter = DocumentStore.addListener('change', () => {
      this.checkDimensions();
    });
  }

  componentWillUnmount() {
    this.state.emitter.remove();
  }

  checkDimensions() {
    const newWidth = DocumentStore.getLayoutWidth();
    if (newWidth !== this.state.pageWidth) {
      // page is either rendering, or been resized:
      this.updateDimensions(newWidth);
    }
  }

  updateDimensions(newWidth) {
    // find the image's full height:
    const ratio = newWidth / this.state.imgWidthOrig;

    this.setState({
      pageWidth: newWidth,
      patternWidth: newWidth / this.state.dotsWide,
      imgWidth: (ratio * this.state.imgWidthOrig),
      imgHeight: (ratio * this.state.imgHeightOrig),
    });
  }

  render() {
    const circleCenter = this.state.patternWidth / 2;
    const bgStyle = { backgroundColor: this.state.headerColor };
    return (
      <div
        className="header-image"
        ref={(node) => { this.node = node; }}
        style={bgStyle}
      >
        <img
          src={this.state.imgURL}
          alt="Modus Design, Inc."
          className="placeholder"
        />
        <svg width={this.state.imgWidth} height={this.state.imgHeight}>
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
                width={this.state.imgWidth}
                height={this.state.imgHeight}
                x="0"
                y="0"
                fill="url(#spots)"
              />
            </mask>
          </defs>
          <image
            href={this.state.imgURL}
            width={this.state.imgWidth}
            height={this.state.imgHeight}
            mask="url(#mask)"
          />
        </svg>
      </div>
    );
  }
}

HeaderImg.propTypes = {
  imgInfo: PropTypes.shape({
    ID: PropTypes.string,
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    dots_wide: PropTypes.string,
    header_color: PropTypes.string,
  }),
};

HeaderImg.defaultProps = {
  imgInfo: '',
};

export default HeaderImg;
