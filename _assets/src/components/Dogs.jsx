import React from 'react';
import DocumentStore from '../flux/documentStore';

class Dogs extends React.Component {
  constructor() {
    super();

    this.state = {
      pawClassName: 'fa fa-paw fa-3x',
    };

    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    document.addEventListener('click', this.handleClick);
  }

  handleClick(e) {
    if (this.node.contains(e.target)) {
      if (e.target.className === this.state.pawClassName) {
        // console.log('gotchuh');
        DocumentStore.toggleModal('dog-modal');
      }
    }
  }

  render() {
    return (
      <span ref={(node) => { this.node = node; }}>
        <i className={this.state.pawClassName} aria-hidden="true" />
      </span>
    );
  }
}

export default Dogs;
