import React from 'react';
import './sass/style.scss';

import NFLpicks from './components/NFLpicks';


const App = function App() {
  return (
    <div>
      <div className="nfl">
        <NFLpicks />
      </div>
    </div>
  );
};

export default App;
