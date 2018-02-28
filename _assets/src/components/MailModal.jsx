import React from 'react';
import DocumentStore from '../flux/documentStore';
// import DocumentActions from '../flux/documentActions';

class DogModal extends React.Component {

  constructor() {
    super();
    // const dogsArray = DocumentStore.getDogsArray();
    // this.state = {
    //   window: DocumentStore.getWindowSize(),
    //   allPosts: dogsArray,
    //   currentPost: DocumentActions.randomNumber(dogsArray.length),
    // };

    this.onResize = this.onResize.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    document.removeEventListener('click', this.handleClick);
  }

  onResize() {
    this.setState({ window: DocumentStore.getWindowSize() });
  }

  handleClick(e) {
    if (this.node && this.node.contains(e.target)) {
      if (e.target.classList.contains('close-modal')) {
        console.log(e.target.classList);
        DocumentStore.toggleModal();
      }
    }
  }

  render() {
    // const thisDog = this.state.allPosts[this.state.currentPost];
    return (
      <div className="mail-sent" ref={(node) => { this.node = node; }}>
        <button type="button" className="close-modal" />
      </div>
    );
  }
}

export default DogModal;
