import React from 'react';
import ReactDOM from 'react-dom';
import ReactStuff from './react-stuff';
import Dogs from './components/Dogs';
import Gooey from './components/Gooey';

import DocumentStatus from './documentStats';
import DocumentStore from './flux/documentStore';

import './sass/style.scss';

DocumentStore.init(DocumentStatus);

const reactDiv = document.getElementById('react-div');
const wholeLayout = document.getElementById('page');
const doggos = document.getElementById('doggos');
const gooey = document.getElementById('gooey');

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

if (doggos && phpVars.dogs) {
  ReactDOM.render(<Dogs phpVars={phpVars.dogs} />, doggos);
}

if (gooey && phpVars.dogs) {
  ReactDOM.render(<Gooey phpVars={phpVars.dogs} />, gooey);
}
