import React from 'react';
import ReactDOM from 'react-dom';
import Diagnostic from './Diagnostic';
import DocumentStatus from './documentStats';

import DocumentStore from './flux/documentStore';
// import DocumentActions from './flux/documentActions';

import './sass/style.scss';
// import './fonts/fontawesome-webfont.woff2?v=4.7.0';


DocumentStore.init(DocumentStatus);

const diagnostic = document.getElementById('react-diagnostic');
const wholeLayout = document.getElementById('page');

if (diagnostic && wholeLayout) {
  let admin = false;
  if (diagnostic.className === 'is_admin') {
    admin = true;
  }
  ReactDOM.render(<Diagnostic user={admin} wholeLayout={wholeLayout} />, diagnostic);
}
