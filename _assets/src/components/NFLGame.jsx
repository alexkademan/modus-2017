import React from 'react';
import NFLStore from '../flux/NFLStore';
// import PropTypes from 'prop-types';
import NFLpicksPoints from './NFLpicksPoints';

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
    // console.log(game.gameID);
    // console.log(game.homeTeam.location);

    if (game.awayTeam.location === 'Rams') {
      console.log(game);
    }

    return (
      <span>
        <input type="radio" name={`game-${game.gameID}`} id={`${game.gameID}-away`} value="visitor" />
        <label htmlFor={`${game.gameID}-away`}>
          <div className="team away right">
            <span className="lrg">
              {game.awayTeam.location}<br />
              <h3>{game.awayTeam.name}</h3>
            </span>
            <span className="small">
              {game.awayTeam.code}
            </span>
          </div>
          <div className="logo">
            <img src={pathToLogos(awayLogo, true)} alt="away-logo" />
          </div>

        </label>


        <div className="score">
          <h3>{game.qtr === 'Pregame' ? '' : game.away.score.T}</h3>
        </div>

        <div className="clock">
          {game.currentStatus}
        </div>

        <div className="score">
          <h3>{game.qtr === 'Pregame' ? '' : game.home.score.T}</h3>
        </div>

        <input type="radio" name={`game-${game.gameID}`} id={`${game.gameID}-home`} value="visitor" />
        <label htmlFor={`${game.gameID}-home`}>
          <div className="logo">
            <img src={pathToLogos(homeLogo, true)} alt="home-logo" />
          </div>
          <div className="team home">
            <span className="lrg">
              {game.homeTeam.location}<br />
              <h3>{game.homeTeam.name}</h3>
            </span>
            <span className="small">
              {game.homeTeam.code}
            </span>
          </div>
        </label>

        <div className="points">
          <NFLpicksPoints />
        </div>

      </span>
    );
  }
}

export default NFLGame;
