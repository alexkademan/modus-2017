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
      modal: DocumentStore.getModalState(),
    };

    DocumentStore.addListener('toggleModal', () => {
      this.setState({
        modal: DocumentStore.getModalState(),
      });
      this.toggleModal();
    });

    this.updateDimensions = this.updateDimensions.bind(this);
    window.addEventListener('resize', this.updateDimensions);
    window.addEventListener('scroll', this.updateDimensions);
  }

  componentDidMount() {
    this.updateDimensions();
  }

  updateDimensions() {
    let scrollDir = 'none';
    if (this.state.window.scrollY < window.scrollY) {
      scrollDir = 'down';
    } else if (this.state.window.scrollY > window.scrollY) {
      scrollDir = 'up';
    } else {
      scrollDir = 'none';
    }

    const newWindowInfo = {
      width: window.innerWidth,
      height: window.innerHeight,
      scrollX: window.scrollX,
      scrollY: window.scrollY,
      layoutHeight: this.state.wholeLayout.clientHeight,
      layoutWidth: this.state.wholeLayout.clientWidth,
      scrollDirection: scrollDir,
    };
    this.setState({ window: newWindowInfo });
    DocumentStore.setDocInfo(newWindowInfo);
  }

  toggleModal() {
    const el = this.state.wholeLayout;
    const className = 'modal-background';

    if (this.state.modal) {
      // add blur effect to page!!!
      // https://jaketrent.com/post/addremove-classes-raw-javascript/
      if (!el.classList.contains(className)) {
        // add that class...
        el.classList.add(className);
      }
    } else if (el.classList.contains(className)) {
      // remove blur effect from page!!!
      el.classList.remove(className);
    }
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
