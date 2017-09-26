import React from 'react';
import shortid from 'shortid';
// import PropTypes from 'prop-types';
// import ReactDOM from 'react-dom';

import logo from './logo.svg';
import logo2 from './logo2.svg';

import CRUDStore from './flux/CRUDStore';
import Whinepad from './components/Winepad';

import NFLStore from './flux/NFLStore';
import NFLpicks from './components/NFLpicks';

import './App.css';

import './css/winepad.scss';
import schema from './schema';
import samples from './samples';

CRUDStore.init(schema);
NFLStore.init();

const App = function App() {
  let data: Array<Object>;
  // let otherData: Array<Object>;
  // const storage: ?string = localStorage.getItem('data');

  // if (!storage) {
  // console.log(samples);
  samples.forEach(
    (item) => {
      if (typeof data === 'undefined') {
        data = [];
      }
      const newItem = item;
      newItem.id = shortid.generate();
      data[data.length] = newItem;
    },
  );
  // console.log(data);
  // } else {
  //   data = JSON.parse(storage);
  // }

  return (
    <div>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={logo2} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
      <Whinepad schema={schema} />
      <div className="nfl">
        <NFLpicks />
      </div>
    </div>
  );
};

export default App;
