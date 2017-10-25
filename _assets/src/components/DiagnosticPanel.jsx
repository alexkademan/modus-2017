import React from 'react';
import PropTypes from 'prop-types';
import DocumentStore from '../flux/documentStore';

// import Test from './TEST';

class DiagnosticPanel extends React.Component {
  constructor() {
    super();

    this.state = {
      window: DocumentStore.getWindowSize(),
      // showPanel: props.showPanel,
    };

    DocumentStore.addListener('change', () => {
      this.setState({
        window: DocumentStore.getWindowSize(),
      });
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
    // console.log(this.node);
    if (this.node.contains(e.target)) {
      console.log('You clicked INSIDE the component.');
    } else {
      console.log('You clicked OUTSIDE the component.');
    }
  }

  render() {
    return (
      <div className="react-diagnostic" ref={(node) => { this.node = node; }}>
        <header>
          <i className="fa fa-window-close" aria-hidden="true" />
        </header>
        <p>
          window:&nbsp;
          {this.state.window.width} x {this.state.window.height}
        </p>
        <p>
          page:&nbsp;
          {this.state.window.layoutWidth} x {this.state.window.layoutHeight}
        </p>
        <p>scroll: {this.state.window.scrollY}</p>
      </div>
    );
  }
}

DiagnosticPanel.propTypes = {
  isAdmin: PropTypes.bool,
  // showPanel: PropTypes.bool,
};

DiagnosticPanel.defaultProps = {
  isAdmin: false,
  // showPanel: true,
};

export default DiagnosticPanel;
