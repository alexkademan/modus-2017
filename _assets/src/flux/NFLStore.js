
import { EventEmitter } from 'fbemitter';

let data;
let weeksGames;
let teams;
const emitter = new EventEmitter();

const NFLStore = {
  init(allTeams: Array<Object>) {
    teams = allTeams;
    // console.log(teams);
  },

  getData(): Array<Object> {
    return data;
  },

  getWeeksGames(): Array<Object> {
    return weeksGames;
  },

  getSingleGame(gameID): Array<Object> {
    let thisGame = '';
    for (let i = 0; weeksGames.length > i; i += 1) {
      if (weeksGames[i].gameID === gameID) {
        thisGame = weeksGames[i];
      }
    }

    teams.forEach((team) => {
      if (
        team.code === thisGame.away.abbr ||
        team.codeAlt === thisGame.away.abbr
      ) {
        thisGame.awayTeam = team;
      } else if (
        team.code === thisGame.home.abbr ||
        team.codeAlt === thisGame.home.abbr
      ) {
        thisGame.homeTeam = team;
      }
    });

    // console.log(thisGame);
    return thisGame;
  },

  setWeeksGames(newData: Array<Object>, commit: boolean = true) {
    weeksGames = newData;
    if (commit && 'localStorage' in window) {
      localStorage.setItem('weeksGames', JSON.stringify(newData));
    }
    emitter.emit('change');
  },

  addListener(eventType: string, fn: Function) {
    emitter.addListener(eventType, fn);
  },
};

export default NFLStore;
