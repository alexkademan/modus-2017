import React from 'react';
import DocumentStore from '../flux/documentStore';

class MainNavButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      window: DocumentStore.getWindowSize(),
      modal: DocumentStore.getModalState(),
      toggleButton: DocumentStore.getModalState(),

    };

    DocumentStore.addListener('toggleModal', () => {
      if (DocumentStore.getModalInfo() === 'main-nav') {
        this.setState({
          modal: DocumentStore.getModalState(),
          toggleButton: DocumentStore.getModalState(),
        });
      }
    });

    DocumentStore.addListener('change', () => {
      this.setState({ window: DocumentStore.getWindowSize() });
    });

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  }

  handleClick(e) {
    if (this.node && this.node.contains(e.target)) {
      DocumentStore.toggleModal('main-nav');
    }
  }

  render() {
    let nodeClass = 'main-nav-button';
    if (this.state.toggleButton) {
      nodeClass += ' open';
    }

    if (
      !this.state.toggleButton &&
      this.state.window.scrollY > 85 &&
      this.state.window.scrollDirection === 'down'
    ) {
      nodeClass += ' hide-button';
    }

    return (
      <div className={nodeClass} ref={(node) => { this.node = node; }}>
        <div className="hamburger">
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }
}

export default MainNavButton;
