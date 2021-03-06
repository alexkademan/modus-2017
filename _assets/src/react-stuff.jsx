import React from 'react';
import PropTypes from 'prop-types';

import Diagnostic from './Diagnostic';
import Modal from './components/Modal';
import MainNavButton from './components/MainNavButton';
import DocumentStore from './flux/documentStore';

class ReactStuff extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isAdmin: props.user,
      wholeLayout: props.wholeLayout, // DOM element for size of page.
      siteInfo: DocumentStore.getPHPvars(),
      modalFadeState: DocumentStore.getModalFadeState(),
    };
    // pull in the JSON that I sent from WP's PHP templates
    if (
      this.state.siteInfo &&
      this.state.siteInfo.mainnav
    ) {
      DocumentStore.setPageNavigation(this.state.siteInfo.mainnav);
    }

    DocumentStore.addListener('modalFadeState', () => {
      this.setState({
        modalFadeState: DocumentStore.getModalFadeState(),
        modalTitle: DocumentStore.getModalTitle(),
      });
    });
  }

  render() {
    return (
      <div className="reactStuff">
        {this.state.modalFadeState === 0 ? '' : <Modal />}
        <MainNavButton />
        <Diagnostic
          user={this.state.isAdmin}
          wholeLayout={this.state.wholeLayout}
        />
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
