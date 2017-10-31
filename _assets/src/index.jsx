import React from 'react';
import ReactDOM from 'react-dom';
import ReactStuff from './react-stuff';

import DocumentStatus from './documentStats';
import DocumentStore from './flux/documentStore';

import './sass/style.scss';

DocumentStore.init(DocumentStatus);

const reactDiv = document.getElementById('react-div');
const wholeLayout = document.getElementById('page');

if (reactDiv) {
  let admin = false;
  if (reactDiv.className === 'is-admin') {
    admin = true;
  }
  ReactDOM.render(<ReactStuff user={admin} wholeLayout={wholeLayout} />, reactDiv);
}
