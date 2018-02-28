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

            <div className="contact-form">
              <h1>What can we do for you?</h1>
              <ContactForm />
            </div>

            <div className="left-col">
              <Gooey />
            </div>

            <div className="right-col">
              <div className="address">
                <p>Modus Design, Inc.</p>
                <a
                  href="https://www.google.com/maps/place/8759+N+Deerwood+Dr/@43.177204,-87.964268,14z/data=!4m2!3m1!1s0x8804e25d6b238d25:0x5db12dc8b991f9c1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p>8759 N Deerwood Dr<br />Brown Deer, WI 53209</p>
                </a>
                <a href="tel:4147517889">
                  <p>(414) 751-7889</p>
                </a>
              </div>
            </div>
            <div className="copyright">
              <p>© 2018 Modus Design, Inc.</p>
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
