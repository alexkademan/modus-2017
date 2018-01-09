import React from 'react';
import DocumentStore from '../flux/documentStore';

class Gooey extends React.Component {
  constructor() {
    super();

    this.state = {
      fbClassName: 'fa fa-facebook-square',
      linkedinClassName: 'fa fa-linkedin-square',
      instaClassName: 'fa fa-instagram',
      pawClassName: 'fa fa-paw',
      menuVisible: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    document.addEventListener('click', this.handleClick);
  }

  handleClick(e) {
    if (this.node.contains(e.target)) {
      // clicked somewhere on the <nav>
      let button = false;
      if (e.target.className === 'menu-item') {
        button = e.target.firstChild.className;
      } else {
        button = e.target.className;
      }

      if (
        e.target.className === 'toggle-nav' ||
        e.target.className.baseVal === 'toggle-nav-svg' ||
        e.target.className.baseVal === 'st0' // the .svg string
      ) {
        this.toggleNav();
      } else if (button) {
        this.buttonOperator(button);
      }
    } else {
      this.canIClose();
    }
  }

  buttonOperator(button) {
    switch (button) {
    case this.state.fbClassName:
      console.log('facebook');
      break;
    case this.state.linkedinClassName:
      console.log('linkedin.');
      break;
    case this.state.instaClassName:
      console.log('instagram');
      break;
    case this.state.pawClassName:
      DocumentStore.toggleModal('dog-modal');
      break;
    default:

    }
  }

  canIClose() {
    if (
      this.state.menuVisible &&
      DocumentStore.getModalFadeState() === 0
    ) {
      this.setState({ menuVisible: false });
    }
  }

  toggleNav() {
    if (this.state.menuVisible) {
      this.setState({ menuVisible: false });
    } else {
      this.setState({ menuVisible: true });
    }
  }

  render() {
    const linkFB = 'https://www.facebook.com/ModusDesignMKE/';
    const linkLinkedin = 'https://www.linkedin.com/company/modus-design-incorporated/';
    const linkInstaGram = 'https://www.instagram.com/explore/locations/301868796/modus-design-inc/';

    return (
      <nav
        ref={(node) => { this.node = node; }}
        className={this.state.menuVisible ? 'menu visible' : 'menu'}
      >
        <a className="toggle-nav">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 27.2 56.6"
            className="toggle-nav-svg"
          >
            <path
              className="st0"
              d="M12.5.2s-2.7 10 5.5 19.6C28.7 32.2 28.8 41.1 24.7 48c-5.6 9.7-18 13.2-24.1-.8 0 0-3-8.9 4.1-18.3 0 0-3.8 23.1 10 19.9 2.5-.6 10-9.4 2.1-19.9C11.9 22.3 1.4 13.1 12.5.2z"
            />
          </svg>
        </a>

        <a className="menu-item" href={linkFB}>
          <i className={this.state.fbClassName} />
        </a>
        <a className="menu-item" href={linkLinkedin}>
          <i className={this.state.linkedinClassName} />
        </a>
        <a className="menu-item" href={linkInstaGram}>
          <i className={this.state.instaClassName} />
        </a>
        <a className="menu-item">
          <i className={this.state.pawClassName} />
        </a>

        <svg version="1.1" className="gooey-filter">
          <defs>
            <filter id="shadowed-goo">
              <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
              <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
              <feComposite in2="goo" in="SourceGraphic" result="mix" />
            </filter>
          </defs>
        </svg>
      </nav>
    );
  }
}

export default Gooey;
