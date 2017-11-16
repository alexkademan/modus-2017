import React from 'react';
import ReactDOM from 'react-dom';
import ReactStuff from './react-stuff';
import Dogs from './components/Dogs';

import DocumentStatus from './documentStats';
import DocumentStore from './flux/documentStore';

import './sass/style.scss';

DocumentStore.init(DocumentStatus);

const reactDiv = document.getElementById('react-div');
const wholeLayout = document.getElementById('page');
const doggos = document.getElementById('doggos');

let phpVars = false;

if (window.reactData) {
  // collect the variables that I've sent over from PHP.
  phpVars = window.reactData;
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

if (doggos) {
  ReactDOM.render(<Dogs />, doggos);
}
