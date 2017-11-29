import React from 'react';
import PropTypes from 'prop-types';
import DocumentStore from '../flux/documentStore';

class DogModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      window: DocumentStore.getWindowSize(),
      allPosts: props.allPosts,
      currentPost: props.currentPost,
    };

    this.onResize = this.onResize.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyboard = this.handleKeyboard.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    document.addEventListener('click', this.handleClick);
    document.addEventListener('keyup', this.handleKeyboard);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    document.removeEventListener('click', this.handleClick);
    document.removeEventListener('keyup', this.handleKeyboard);
  }

  onResize() {
    this.setState({ window: DocumentStore.getWindowSize() });
  }

  handleClick(e) {
    if (this.node && this.node.contains(e.target)) {
      // console.log(e.target.className);
      switch (e.target.className) {
      case 'fa fa-arrow-right':
        this.addOne();
        break;
      case 'fa fa-arrow-left':
        this.removeOne();
        break;
      default:
      }
    }
  }

  handleKeyboard(e) {
    if (e.code === 'ArrowRight') {
      this.addOne();
    } else if (e.code === 'ArrowLeft') {
      this.removeOne();
    }
  }

  addOne() {
    if (this.state.currentPost === this.state.allPosts.length - 1) {
      this.setState({ currentPost: 0 });
    } else {
      this.setState({ currentPost: this.state.currentPost + 1 });
    }
  }

  removeOne() {
    if (this.state.currentPost === 0) {
      this.setState({ currentPost: this.state.allPosts.length - 1 });
    } else {
      this.setState({ currentPost: this.state.currentPost - 1 });
    }
  }

  findImgSize(origWidth, origHeight) {
    const window = this.state.window;
    const totalWidth = window.width * 0.8;
    const totalHeight = window.height * 0.6;

    // const imgWidthOriginal = thisImg[1];
    // const imgHeightOriginal = thisImg[2];

    const ratioVertical = totalHeight / origHeight;
    // const ratioHorizontal = totalHeight / imgHeightOriginal;

    const size = [];
    size.width = origWidth * ratioVertical;

    if (size.width > totalWidth) {
      // too wide for the space.
      const ratioHorizontal = totalWidth / origWidth;

      size.width = totalWidth;
      size.height = origHeight * ratioHorizontal;
    } else {
      size.height = origHeight * ratioVertical;
    }

    return size;
  }

  showFeaturedImage(thisDog) {
    if (thisDog.featured_img[0]) {
      const size = this.findImgSize(
        thisDog.featured_img[1],
        thisDog.featured_img[2],
      );
      return (
        <div>
          <img
            src={thisDog.featured_img[0]}
            className="dog-image"
            style={{
              width: size.width,
              height: size.height,
            }}
            alt={thisDog.post_title}
          />
          <p>width: {thisDog.featured_img[1]}</p>
          <p>height: {thisDog.featured_img[2]}</p>
          <p>window width: {this.state.window.width}</p>
          <p>window height: {this.state.window.height}</p>
          <p>final width: {size.width}</p>
          <p>final height: {size.height}</p>
        </div>
      );
    }
    return '';
  }

  render() {
    const thisDog = this.state.allPosts[this.state.currentPost];
    return (
      <div className="dog" ref={(node) => { this.node = node; }}>
        {this.showFeaturedImage(thisDog)}
        <h1>{thisDog.post_title}</h1>
        <p>{thisDog.post_content}</p>
        <a href={thisDog.permalink} className="pet-page">
          <i className="fa fa-paw" />
        </a>

        <i className="fa fa-arrow-left" />
        <i className="fa fa-arrow-right" />
      </div>
    );
  }
}

DogModal.propTypes = {
  allPosts: PropTypes.arrayOf(PropTypes.shape({})),
  currentPost: PropTypes.number,
};

DogModal.defaultProps = {
  allPosts: '',
  currentPost: 0,
};

export default DogModal;
