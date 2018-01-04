// filter: https://codepen.io/andrewgibson/pen/oevQXm?editors=1100

import React from 'react';
import PropTypes from 'prop-types';
import DocumentStore from '../flux/documentStore';

class HeaderImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: props.imgInfo.ID,
      imgURL: props.imgInfo.url,
      imgWidthOrig: props.imgInfo.width,
      imgHeightOrig: props.imgInfo.height,
      dotsWide: props.imgInfo.dots_wide,
      headerColor: props.imgInfo.header_color,
      masthead: document.getElementById('masthead'),
    };
  }

  componentWillMount() {
    this.checkDimensions();
  }

  componentDidMount() {
    this.state.emitter = DocumentStore.addListener('change', () => {
      this.checkDimensions();
    });
    this.checkDimensions();
  }

  componentWillUnmount() {
    this.state.emitter.remove();
  }

  checkDimensions() {
    const newSize = DocumentStore.getWindowSize();
    const newWidth = newSize.layoutWidth;
    const newHeight = newSize.height;
    if (
      newWidth !== this.state.pageWidth ||
      newHeight !== this.state.pageHeight
    ) {
      // page is either rendering, or been resized:
      this.updateDimensions(newWidth, newHeight);
    }
  }

  updateDimensions(newWidth, newHeight) {
    // find the image's full height, and width of the circle pattern:
    let frameWidth = newWidth;
    const smallestScale = 1000;
    if (frameWidth < smallestScale) {
      frameWidth = smallestScale;
    }

    // this has to be a round number, because some browsers are refusing
    // anything after the decimal point:
    // I'm adding one to make it add up to be larger than it's canvas.
    // then I will have to mask the edges to clean that up. w00t!
    let patternWidth = Math.round(frameWidth / this.state.dotsWide) + 1;
    let ratio = (patternWidth * this.state.dotsWide) / this.state.imgWidthOrig;
    let imgWidth = ratio * this.state.imgWidthOrig;
    let imgHeight = ratio * this.state.imgHeightOrig;

    if (imgHeight < newHeight) {
      // DO OVER!!! because the window is taller than this component:
      ratio = newHeight / this.state.imgHeightOrig;
      imgWidth = ratio * this.state.imgWidthOrig;

      // work around to keep pattern from using any decimal numbers (Safari)
      patternWidth = Math.round(imgWidth / this.state.dotsWide) + 1;
      ratio = (patternWidth * this.state.dotsWide) / this.state.imgWidthOrig;
      imgWidth = ratio * this.state.imgWidthOrig;
      imgHeight = ratio * this.state.imgHeightOrig;
    }
    const bgLeftMargin = (newWidth - imgWidth) / 2;
    const bgTopMargin = (newHeight - imgHeight) / 2;

    this.setState({
      pageWidth: newWidth,
      pageHeight: newHeight,
      frameWidth,
      patternWidth,
      imgWidth,
      imgHeight,
      bgLeftMargin,
      bgTopMargin,
    });
  }

  render() {
    const circleCenter = this.state.patternWidth / 2;
    const bgStyle = {
      backgroundColor: this.state.headerColor,
      width: this.state.pageWidth,
      height: this.state.pageHeight,
    };
    const bgStyle2 = {
      width: this.state.imgWidth,
      height: this.state.imgHeight,
      left: this.state.bgLeftMargin,
      top: this.state.bgTopMargin,
    };

    this.state.masthead.style.height = `${this.state.pageHeight}px`;

    return (
      <div
        className="header-image"
        ref={(node) => { this.node = node; }}
        style={bgStyle}
      >
        <span style={bgStyle2}>
          <svg
            width={this.state.imgWidth}
            height={this.state.imgHeight}
          >
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
              <mask id="mask-pattern">
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
              xlinkHref={this.state.imgURL}
              width={this.state.imgWidth}
              height={this.state.imgHeight}
              mask="url(#mask-pattern)"
              // x={this.state.bgLeftMargin}
            />
          </svg>
        </span>
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
