import React from 'react';
import NFLStore from '../flux/NFLStore';
// import PropTypes from 'prop-types';

const pathToLogos = require.context('../NFLLogos', true);

type Props = {
  gameID: ?string,
};

function NFLGame(props: Props) {
  // props.game = NFLStore.getWeeksGames();
  if (props.gameID) {
    const game = NFLStore.getSingleGame(props.gameID);
    const awayLogo = `./${game.away.abbr}.png`;
    const homeLogo = `./${game.home.abbr}.png`;

    switch (game.qtr) {
    case null:
      game.currentStatus = 'vs';
      break;
    case 'Pregame':
      game.currentStatus = game.qtr;
      break;
    case 'Final':
      game.currentStatus = 'Final';
      break;
    case 'final overtime':
      game.currentStatus = 'Final (OT)';
      break;
    default:
      game.currentStatus = `${game.qtr},  ${game.clock}`;
    }

    // if (game.qtr === 'Final' || game.qtr === 'final overtime') {
    //   if (game.away.score.T === game.home.score.T) {
    //     game.winner = NFLStore.getGameWinner(props.gameID);
    //   }
    // }
    // console.log(game.awayTeam.location);
    // console.log(game.homeTeam.location);
    return (
      <span>
        <div className="away">
          <span className="teamName">
            {game.awayTeam.location}<br />
            <h3>{game.awayTeam.name}</h3>
          </span>
          <img src={pathToLogos(awayLogo, true)} alt="away-logo" />
          <span className="score">
            <h3>{game.qtr === 'Pregame' ? '' : game.away.score.T}</h3>
          </span>
        </div>
        <div className="clock">
          {game.currentStatus}
        </div>
        <div className="home">
          <span className="score">
            <h3>{game.qtr === 'Pregame' ? '' : game.home.score.T}</h3>
          </span>
          <img src={pathToLogos(homeLogo, true)} alt="home-logo" />
          <span className="teamName">
            {game.homeTeam.location}<br />
            <h3>{game.homeTeam.name}</h3>
          </span>
        </div>
        <div className="points">
          *
        </div>
      </span>
    );
  }
}

export default NFLGame;
