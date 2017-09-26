import NFLStore from './NFLStore';

let weeksGames;
let game;

const NFLActions = {
  configureWeekInfo(ajaxInfo) {
    weeksGames = [];
    Object.keys(ajaxInfo.data).forEach((key) => {
      game = ajaxInfo.data[key];
      game.gameID = key;
      weeksGames[weeksGames.length] = game;
      // weeksGames[weeksGames.length].gameID = key;
    });
    NFLStore.setWeeksGames(weeksGames);
  },
};

export default NFLActions;
