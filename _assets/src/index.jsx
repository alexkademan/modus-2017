import React from 'react';
import ReactDOM from 'react-dom';
import ReactStuff from './react-stuff';
// import Gooey from './components/Gooey';
import HeaderImg from './components/HeaderImg';
import WelcomeMat from './components/WelcomeMat';
import WorkLayout from './components/WorkLayout';
// import HomeBlurbs from './components/HomeBlurbs';
import ContactForm from './components/ContactForm';

import Footer from './components/Footer';

import DocumentStatus from './documentStats';
import DocumentStore from './flux/documentStore';

import './sass/style.scss';

DocumentStore.init(DocumentStatus);

const reactDiv = document.getElementById('react-div');
const wholeLayout = document.getElementById('page');
const footer = document.getElementById('site-footer');
// const gooey = document.getElementById('gooey-ui');
const headerImg = document.getElementById('page-header-image');
// const homeBlurb = document.getElementById('home-blurb');
const masthead = document.getElementById('masthead');
const portfolio = document.getElementById('portfolio-section');
const contact = document.getElementById('contact-form');

let phpVars = false;

if (window.reactData) {
  // collect the variables that I've sent over from PHP.
  phpVars = window.reactData;
  DocumentStore.setPHPvars(phpVars);
}

if (reactDiv) {
  let admin = false;
  if (reactDiv.className === 'is-admin') {
    admin = true;
  }
  ReactDOM.render(
    <ReactStuff
      user={admin}
      wholeLayout={wholeLayout}
      phpVars={phpVars}
    />, reactDiv,
  );
}

// if (gooey && phpVars.dogs) {
//   ReactDOM.render(<Gooey />, gooey);
// }

if (headerImg && masthead && phpVars.dot_header_image && phpVars.welcome) {
  ReactDOM.render(
    <HeaderImg imgInfo={phpVars.dot_header_image} />,
    headerImg,
  );
  ReactDOM.render(
    <WelcomeMat parent={masthead} phpVars={phpVars.welcome} />,
    masthead,
  );

  // if (homeBlurb && phpVars.home_content) {
  //   ReactDOM.render(<HomeBlurbs info={phpVars.home_content} />, homeBlurb);
  // }
}

if (portfolio && phpVars.work) {
  ReactDOM.render(<WorkLayout />, portfolio);
}
if (contact) {
  ReactDOM.render(<ContactForm />, contact);
}

if (footer) {
  ReactDOM.render(<Footer />, footer);
}
