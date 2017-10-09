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
    console.log(game.away.abbr);
    console.log(game.home.abbr);
    // import logoAway from '../NFLLogos/' + game.away.abbr + '.png';

    return (
      <section>
        <div className="away">
          {game.away.abbr}, {game.away.score.T}
        </div>
        <div className="vs">
          vs
        </div>
        <div className="home">
          {game.home.abbr}, {game.home.score.T}
        </div>
        <div className="clock">
          {game.qtr} {game.clock}
        </div>
      </section>
    );
  }
}

export default NFLGame;
