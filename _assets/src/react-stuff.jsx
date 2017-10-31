import React from 'react';
import PropTypes from 'prop-types';

import Diagnostic from './Diagnostic';
import Modal from './components/Modal';
import MainNavButton from './components/MainNavButton';

class ReactStuff extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isAdmin: props.user,
      wholeLayout: props.wholeLayout, // DOM element for size of page.
    };
  }

  render() {
    return (
      <div className="reactStuff">
        <MainNavButton />
        <Modal />
        <Diagnostic user={this.state.isAdmin} wholeLayout={this.state.wholeLayout} />
      </div>
    );
  }
}

ReactStuff.propTypes = {
  user: PropTypes.bool,
  wholeLayout: PropTypes.shape({}),
};

ReactStuff.defaultProps = {
  user: false,
  wholeLayout: '',
};

export default ReactStuff;
