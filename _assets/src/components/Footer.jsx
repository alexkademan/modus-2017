import React from 'react';
import PropTypes from 'prop-types';

import Gooey from './Gooey';
import ContactForm from './ContactForm';
import DocumentStore from '../flux/documentStore';

class Footer extends React.Component {

  constructor() {
    super();
    this.state = {
      footerHeight: 0,
      phpVars: DocumentStore.getPHPvars('pageInfo'),
    };
    this.checkFooterHeight = this.checkFooterHeight.bind(this);
    DocumentStore.addListener('change', () => {
      this.checkFooterHeight();
    });
  }

  componentDidMount() {
    this.checkFooterHeight();
  }

  checkFooterHeight() {
    const footerHeight = this.footer.clientHeight;
    if (this.state.footerHeight !== footerHeight) {
      this.setState({ footerHeight });
    }
  }

  renderContactForm() {
    if (this.state.phpVars.currentPageID !== 7) {
      return (
        <div className="contact-form">
          <h1>What can we do for you?</h1>
          <ContactForm />
        </div>
      );
    }
    return false;
  }

  render() {
    const style = {
      width: 1,
      height: this.state.footerHeight,
      display: 'block',
      float: 'left',
    };
    return (
      <span>
        <div style={style} />
        <div className="footer-bg">

          <footer
            id="colophon"
            className="site-footer"
            ref={(footer) => { this.footer = footer; }}
          >
            {this.renderContactForm()}
            <div className="left-col">
              <Gooey />
            </div>

            <div className="copyright">
              <p>{'\u00A9'} {this.state.phpVars.copyright}</p>
            </div>
          </footer>
        </div>
      </span>
    );
  }
}

Footer.propTypes = {
  footerHeight: PropTypes.number,
};

Footer.defaultProps = {
  footerHeight: 0,
};

export default Footer;
