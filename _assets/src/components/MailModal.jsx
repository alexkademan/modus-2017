import React from 'react';
import DocumentStore from '../flux/documentStore';
// import DocumentActions from '../flux/documentActions';

class MailModal extends React.Component {

  constructor() {
    super();

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
      <div className="mail-sent-thanks" ref={(node) => { this.node = node; }}>
        <button type="button" className="close-modal" />
        <div className="message">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.44 7.4"><path d="M2.33 6H1a.94.94 0 0 1-1-1V1a1 1 0 0 1 1-1h5.41a.94.94 0 0 1 1 1v4a.93.93 0 0 1-1 1H4.68a1.09 1.09 0 0 0-.49.16c-.51.36-1 .75-1.52 1.12-.07 0-.2.1-.24.07a.32.32 0 0 1-.09-.24c-.01-.33-.01-.69-.01-1.11zm1-2.86c-.11-.13-.19-.24-.29-.34-.43-.44-.42-.43-.85 0-.16.16-.14.29 0 .44.31.3.62.6.92.91s.29.19.47 0c.5-.52 1-1 1.54-1.53s.39-.39 0-.78c-.23-.22-.28-.23-.51 0-.39.45-.8.87-1.27 1.33z" /></svg>

          <p>thanks for your submission.</p>
        </div>
      </div>
    );
  }
}

export default MailModal;
