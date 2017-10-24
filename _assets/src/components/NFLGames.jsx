import * as Immutable from 'immutable';
import React, { Component } from 'react';
import NFLStore from '../flux/NFLStore';
// import NFLGameOLD from './NFLGameOLD';
import NFLGame from './NFLGame';

type State = {
  weeksGames: Immutable.List<Object>,
  addnew: boolean,
  count: number,
};

class NFLGames extends Component {
  constructor() {
    super();
    this.state = {
      weeksGames: NFLStore.getWeeksGames(),
      sortby: null,
    };

    NFLStore.addListener('change', () => {
      this.setState({
        weeksGames: NFLStore.getWeeksGames(),
      });
    });
  }

  state: State;

  render() {
    if (!this.state.weeksGames) {
      return (
        <div className="nfl-week">
          no games.
        </div>
      );
    }
    return (
      <ul className="nfl-week">
        {this.state.weeksGames.map((game) => {
          // console.log(game.gameID);
          return (
            <li className="nfl-game" key={game.gameID}>
              <NFLGame gameID={game.gameID} />
            </li>
          );
        }, this)}
      </ul>
    );
  }
}

export default NFLGames;
