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
        <div className="nfl-games">
          no games.
        </div>
      );
    }
    return (
      <div>
        {/* <table className="nfl-games">
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
                <tr className="nfl-game" key={game.gameID}>
                  <NFLGameOLD gameID={game.gameID} />
                </tr>
              );
            }, this)}
          </tbody>
        </table> */}


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

      </div>
    );
  }
}

export default NFLGames;
