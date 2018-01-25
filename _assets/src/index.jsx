import React from 'react';
import ReactDOM from 'react-dom';
import ReactStuff from './react-stuff';
import Gooey from './components/Gooey';
import HeaderImg from './components/HeaderImg';
import WelcomeMat from './components/WelcomeMat';
import WorkLayout from './components/WorkLayout';

import DocumentStatus from './documentStats';
import DocumentStore from './flux/documentStore';

import './sass/style.scss';

DocumentStore.init(DocumentStatus);

const reactDiv = document.getElementById('react-div');
const wholeLayout = document.getElementById('page');
const gooey = document.getElementById('gooey-ui');
const headerImg = document.getElementById('page-header-image');
const masthead = document.getElementById('masthead');
const portfolio = document.getElementById('portfolio-section');

let phpVars = false;

if (window.reactData) {
  // collect the variables that I've sent over from PHP.
  phpVars = window.reactData;
  // console.log(phpVars);
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

if (gooey && phpVars.dogs) {
  ReactDOM.render(<Gooey phpVars={phpVars.dogs} />, gooey);
}

if (headerImg && masthead && phpVars.dot_header_image && phpVars.welcome) {
  ReactDOM.render(
    <HeaderImg imgInfo={phpVars.dot_header_image} />,
    headerImg,
  );
  ReactDOM.render(
    <WelcomeMat parent={masthead} phpVars={phpVars.welcome} />,
    masthead,
  );
}

if (portfolio && phpVars.work) {
  ReactDOM.render(<WorkLayout />, portfolio);
}
