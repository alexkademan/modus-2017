import React from 'react';
import PropTypes from 'prop-types';
import DiagnosticPanel from './components/DiagnosticPanel';
import DocumentStore from './flux/documentStore';
import './sass/diagnostic.scss';

class Diagnostic extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      window: DocumentStore.getWindowSize(),
      isAdmin: props.user,
      wholeLayout: props.wholeLayout, // DOM element for size of page.
    };

    DocumentStore.addListener('change', () => {
      this.setState({
        weeksGames: DocumentStore.getWindowSize(),
      });
    });

    this.updateDimensions = this.updateDimensions.bind(this);
    window.addEventListener('resize', this.updateDimensions);
    window.addEventListener('scroll', this.updateDimensions);
  }

  componentDidMount() {
    this.updateDimensions();
  }

  updateDimensions() {
    const newWindowInfo = {
      width: window.innerWidth,
      height: window.innerHeight,
      scrollX: window.scrollX,
      scrollY: window.scrollY,
      layoutHeight: this.state.wholeLayout.clientHeight,
      layoutWidth: this.state.wholeLayout.clientWidth,
    };
    this.setState({ window: newWindowInfo });
    DocumentStore.setDocInfo(newWindowInfo);
  }

  render() {
    if (this.state.isAdmin) {
      return <DiagnosticPanel />;
    }
    return false;
  }
}

Diagnostic.propTypes = {
  user: PropTypes.bool,
  wholeLayout: PropTypes.shape({}),
};

Diagnostic.defaultProps = {
  user: false,
  wholeLayout: '',
};

export default Diagnostic;
