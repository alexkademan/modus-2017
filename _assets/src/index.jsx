import React from 'react';
import ReactDOM from 'react-dom';
import ReactStuff from './react-stuff';
import Gooey from './components/Gooey';
import HeaderImg from './components/HeaderImg';

import DocumentStatus from './documentStats';
import DocumentStore from './flux/documentStore';

import './sass/style.scss';

DocumentStore.init(DocumentStatus);

const reactDiv = document.getElementById('react-div');
const wholeLayout = document.getElementById('page');
const gooey = document.getElementById('gooey-ui');
const headerImg = document.getElementById('page-header-image');

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

if (headerImg && phpVars.dot_header_image) {
  ReactDOM.render(<HeaderImg imgInfo={phpVars.dot_header_image} />, headerImg);
}
