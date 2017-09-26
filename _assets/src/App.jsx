import React from 'react';
import NFLStore from './flux/NFLStore';
import NFLpicks from './components/NFLpicks';

import './sass/style.scss';

NFLStore.init();

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
