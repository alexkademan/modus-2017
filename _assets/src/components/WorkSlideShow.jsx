import React from 'react';
import PropTypes from 'prop-types';
import DocumentStore from '../flux/documentStore';
import DocumentActions from '../flux/documentActions';
import WorkSlide from './WorkSlide';

class WorkSlideShow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      window: DocumentStore.getWindowSize(),
      post: props.post,
      count: props.count,
      selectedImage: 0,
    };
    this.onResize = this.onResize.bind(this);
    this.changeWholeSlideShow = this.changeWholeSlideShow.bind(this);
    this.handleKeyboard = this.handleKeyboard.bind(this);
  }

  componentDidMount() {
    this.state.emitter = DocumentStore.addListener('workModal', () => {
      this.changeWholeSlideShow();
    });
    this.state.slideEmitter = DocumentStore.addListener('workSlide', () => {
      this.changeSelectedSlide();
    });
    DocumentStore.setWorkSlide(0);
    window.addEventListener('resize', this.onResize);
    document.addEventListener('keyup', this.handleKeyboard);
  }

  componentWillUnmount() {
    this.state.emitter.remove();
    this.state.slideEmitter.remove();
    window.removeEventListener('resize', this.onResize);
    document.removeEventListener('keyup', this.handleKeyboard);
  }

  onResize() {
    this.setState({ window: DocumentStore.getWindowSize() });
  }

  changeWholeSlideShow() {
    const newCount = DocumentStore.getWorkModalCount();
    this.setState({
      post: DocumentStore.getWorkVars()[newCount],
      count: newCount,
      selectedImage: 0,
    });
    DocumentStore.setWorkSlide(0);
  }

  changeSelectedSlide() {
    this.setState({
      selectedImage: DocumentStore.getWorkSlide(),
    });
  }

  handleKeyboard(e) {
    const totalSlides = this.state.post.images.length;

    console.log(e.key);
    if (totalSlides > 1) {
      switch (e.key) {
      case ']':
        this.nextOne();
        break;
      case '[':
        this.prevOne();
        break;
      default:
        // console.log(e.key);
      }
    }
  }

  nextOne() {
    // forward one slide...
    const totalSlides = this.state.post.images.length;
    const currentSlide = DocumentStore.getWorkSlide();
    if (currentSlide + 1 === totalSlides) {
      DocumentStore.setWorkSlide(0);
    } else {
      DocumentStore.setWorkSlide(currentSlide + 1);
    }
  }

  prevOne() {
    // back one slide.
    const totalSlides = this.state.post.images.length;
    const currentSlide = DocumentStore.getWorkSlide();
    if (currentSlide - 1 < 0) {
      DocumentStore.setWorkSlide(totalSlides - 1);
    } else {
      DocumentStore.setWorkSlide(currentSlide - 1);
    }
  }

  renderThumbs() {
    let i = -1;
    return (
      <ul ref={(node) => { this.node = node; }}>
        {this.state.post.images.map((entry) => {
          i += 1;
          return (
            <li key={entry.ID}>
              <WorkSlide thisImageCount={i} />
            </li>
          );
        })}
      </ul>
    );
  }

  renderSlideShow() {
    const post = this.state.post;
    const images = post.images;
    const currentSlide = images[this.state.selectedImage];

    const imgWidth = currentSlide.img[1];
    const imgHeight = currentSlide.img[2];

    let totalWidth = this.state.window.width * 0.9;
    if (totalWidth > 1000) { totalWidth = 1000; }
    const totalHeight = 1000; // the maximum height possible.

    const size = DocumentActions.findImgSize(
      imgWidth, imgHeight, totalWidth, totalHeight,
    );

    let showThumbs = false;
    if (images.length > 1) {
      showThumbs = true;
    }

    return (
      <div>
        <div className="big-image">
          <img
            src={currentSlide.guid}
            alt={currentSlide.post_title}
            title={currentSlide.post_title}
            className="hero"
            style={{
              width: size.width,
              height: size.height,
            }}
          />
        </div>
        <div className="thumbs">
          {showThumbs ? this.renderThumbs() : ''}
        </div>
      </div>
    );
  }

  render() {
    if (this.state.post.images) {
      return this.renderSlideShow();
    }
    return false;
  }
}

WorkSlideShow.propTypes = {
  post: PropTypes.shape({}),
  count: PropTypes.number,
};

WorkSlideShow.defaultProps = {
  post: '',
  count: 0,
};

export default WorkSlideShow;
