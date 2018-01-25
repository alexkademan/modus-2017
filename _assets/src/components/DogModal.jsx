import React from 'react';
import DocumentStore from '../flux/documentStore';
import DocumentActions from '../flux/documentActions';

class DogModal extends React.Component {

  constructor() {
    super();
    const dogsArray = DocumentStore.getDogsArray();
    this.state = {
      window: DocumentStore.getWindowSize(),
      allPosts: dogsArray,
      currentPost: DocumentActions.randomNumber(dogsArray.length),
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
      if (e.target.classList.contains('next')) {
        this.nextOne();
      } else if (e.target.classList.contains('prev')) {
        this.prevOne();
      } else if (e.target.classList.contains('close-modal')) {
        console.log(e.target.classList);
        DocumentStore.toggleModal();
      }
    }
  }

  handleKeyboard(e) {
    if (e.code === 'ArrowRight') {
      this.nextOne();
    } else if (e.code === 'ArrowLeft') {
      this.prevOne();
    }
  }

  nextOne() {
    if (this.state.currentPost === this.state.allPosts.length - 1) {
      this.setState({ currentPost: 0 });
    } else {
      this.setState({ currentPost: this.state.currentPost + 1 });
    }
  }

  prevOne() {
    if (this.state.currentPost === 0) {
      this.setState({ currentPost: this.state.allPosts.length - 1 });
    } else {
      this.setState({ currentPost: this.state.currentPost - 1 });
    }
  }

  showFeaturedImage(thisDog) {
    if (thisDog.featured_img[0]) {
      const imgWidth = thisDog.featured_img[1];
      const imgHeight = thisDog.featured_img[2];

      const totalWidth = this.state.window.width * 0.8;
      const totalHeight = this.state.window.height * 0.6;

      const size = DocumentActions.findImgSize(
        imgWidth, imgHeight, totalWidth, totalHeight);

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
        <a href={thisDog.permalink} className="pet-page">
          <h1>
            {thisDog.post_title} <i className="fa fa-paw" />
          </h1>
        </a>
        <p>{thisDog.post_content}</p>
        <p>
          <a href={thisDog.allDogsURL} className="allDogs">
            See all the dogs of Modus!
          </a>
        </p>


        <i className="fa fa-chevron-right prev" />
        <i className="fa fa-arrow-right next" />
        <button type="button" className="close-modal" />
      </div>
    );
  }
}

export default DogModal;
