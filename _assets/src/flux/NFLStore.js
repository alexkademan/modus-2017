
import { EventEmitter } from 'fbemitter';

let data;
let weeksGames;
// let schema;
const emitter = new EventEmitter();

const NFLStore = {
  init() {
    // console.log(teams);

    // const storage = 'localStorage' in window
    //   ? localStorage.getItem('nfl')
    //   : null;

    // if (!storage) {
    //   console.log('we need the nfl thing thing. to go into local storage');
    // }
  },

  getData(): Array<Object> {
    return data;
  },

  getWeeksGames(): Array<Object> {
    return weeksGames;
  },

  getSingleGame(gameID) {
    let thisGame = '';
    for (let i = 0; weeksGames.length > i; i += 1) {
      if (weeksGames[i].gameID === gameID) {
        thisGame = weeksGames[i];
      }
    }
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
