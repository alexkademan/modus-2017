import React from 'react';
// import PropTypes from 'prop-types';
import DocumentStore from '../flux/documentStore';
// import DocumentActions from '../flux/documentActions';
import WorkSlideShow from './WorkSlideShow';

class WorkModal extends React.Component {

  constructor() {
    super();
    this.state = {
      allWork: DocumentStore.getWorkVars(),
      currentPost: DocumentStore.getWorkModalCount(),
      selectedImage: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyboard = this.handleKeyboard.bind(this);
  }

  componentDidMount() {
    this.state.emitter = DocumentStore.addListener('workModal', () => {
      this.setState({ currentPost: DocumentStore.getWorkModalCount() });
    });
    document.addEventListener('click', this.handleClick);
    document.addEventListener('keyup', this.handleKeyboard);
  }

  componentWillUnmount() {
    this.state.emitter.remove();
    document.removeEventListener('click', this.handleClick);
    document.removeEventListener('keyup', this.handleKeyboard);
  }

  handleClick(e) {
    if (this.node && this.node.contains(e.target)) {
      if (e.target.classList.contains('next')) {
        this.nextOne();
      } else if (e.target.classList.contains('prev')) {
        this.prevOne();
      } else if (e.target.classList.contains('close-modal')) {
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
    if (this.state.currentPost === this.state.allWork.length - 1) {
      DocumentStore.setWorkModal(0);
    } else {
      DocumentStore.setWorkModal(this.state.currentPost + 1);
    }
  }

  prevOne() {
    if (this.state.currentPost === 0) {
      DocumentStore.setWorkModal(this.state.allWork.length - 1);
    } else {
      DocumentStore.setWorkModal(this.state.currentPost - 1);
    }
  }

  findCorrectSlide() {
    for (let i = 0; i < this.state.allWork.length; i += 1) {
      if (this.state.allWork[i].ID === this.state.currentPostID) {
        this.setState({ currentPost: i });
      }
    }
    console.log(this.state.currentPost);
  }

  render() {
    const post = this.state.allWork[this.state.currentPost];
    return (
      <div>
        <div className="work-modal" ref={(node) => { this.node = node; }}>
          <div className="modal-main">
            <span className="modal-content">
              <h1>
                {post.post_title}
              </h1>
              {
                post.images ?
                  <WorkSlideShow post={post} count={this.state.currentPost} /> :
                  ''
              }
              <p>
                {post.post_content}
              </p>
            </span>
          </div>
        </div>
        <button type="button" className="close-modal" />
        <i className="fa fa-chevron-left prev" />
        <i className="fa fa-chevron-right next" />
      </div>
    );
  }
}

export default WorkModal;
