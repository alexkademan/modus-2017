import React from 'react';

class Test extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    document.addEventListener('click', this.handleClick);
  }

  handleClick(e) {
    if (this.node.contains(e.target)) {
      console.log('You clicked INSIDE the component.');
    } else {
      console.log('You clicked OUTSIDE the component.');
    }
  }

  render() {
    return (
      <span ref={(node) => { this.node = node; }}>
        Level 0<br />
        <span>
          Level 1.<br />
          <span>Level 2.</span>
        </span>
      </span>
    );
  }
}

export default Test;
