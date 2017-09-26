import React, { Component } from 'react';
import axios from 'axios';

import NFLActions from '../flux/NFLActions';
import NFLStore from '../flux/NFLStore';

import NFLGames from './NFLGames';

type State = {
  addnew: boolean,
  count: number,
};

class NFLpicks extends Component {
  constructor() {
    super();
    this.state = {
      weeksGames: NFLStore.getWeeksGames(),
      sortby: null,
    };
  }

  state: State;

  componentDidMount() {
    axios.get('http://www.nfl.com/liveupdate/scores/scores.json')
      .then((response) => {
        NFLActions.configureWeekInfo(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="nfl-scores">
        <NFLGames />
      </div>
    );
  }
}

export default NFLpicks;
