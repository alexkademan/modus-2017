import * as Immutable from 'immutable';
import React, { Component } from 'react';
import NFLStore from '../flux/NFLStore';
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
        <div className="nfl-games">
          no games.
        </div>
      );
    }
    return (
      <table className="nfl-games">
        <thead>
          <tr>
            <td>
              Week of NFL:
            </td>
          </tr>
        </thead>
        <tbody>
          {this.state.weeksGames.map((game) => {
            // console.log(game.gameID);
            return (
              <NFLGame gameID={game.gameID} />
            );
          }, this)}
        </tbody>
      </table>
    );
  }
}

export default NFLGames;
