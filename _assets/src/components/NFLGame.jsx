import React from 'react';
import NFLStore from '../flux/NFLStore';
// import PropTypes from 'prop-types';

type Props = {
  gameID: ?string,
};

function NFLGame(props: Props) {
  // props.game = NFLStore.getWeeksGames();
  if (props.gameID) {
    const game = NFLStore.getSingleGame(props.gameID);
    console.log(game);
    return (
      <tr className="nfl-game" key={props.gameID}>
        <td className="away">
          {game.away.abbr}, {game.away.score.T}
        </td>
        <td>
          vs
        </td>
        <td className="home">
          {game.home.abbr}, {game.home.score.T}
        </td>
        <td>
          {game.qtr} {game.clock}
        </td>
      </tr>
    );
  }
}

export default NFLGame;
