import React from 'react';
import PropTypes from 'prop-types';
import DocumentStore from '../flux/documentStore';
import WorkSlide from './WorkSlide';

class WorkSlideShow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      post: props.post,
      count: props.count,
      selectedImage: 0,
    };
    this.changeWholeSlideShow = this.changeWholeSlideShow.bind(this);
  }

  componentDidMount() {
    this.state.emitter = DocumentStore.addListener('workModal', () => {
      this.changeWholeSlideShow();
    });
    this.state.slideEmitter = DocumentStore.addListener('workSlide', () => {
      this.changeSelectedSlide();
    });
    DocumentStore.setWorkSlide(0);
  }

  componentWillUnmount() {
    this.state.emitter.remove();
    this.state.slideEmitter.remove();
  }

  changeWholeSlideShow() {
    const newCount = DocumentStore.getWorkModalCount();
    this.setState({
      post: DocumentStore.getWorkVars()[newCount],
      count: newCount,
      selectedImage: 0,
    });
  }

  changeSelectedSlide() {
    this.setState({
      selectedImage: DocumentStore.getWorkSlide(),
    });
  }

  renderThumbs() {
    let i = -1;
    // console.log(this.state.post.images);
    return (
      <ul ref={(node) => { this.node = node; }}>
        {this.state.post.images.map((entry) => {
          i += 1;
          // console.log(entry);
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
