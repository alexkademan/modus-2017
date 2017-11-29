// import DocumentStore from './documentStore';

// let weeksGames;
// let game;

const DocumentActions = {
  init(stats: Array<Object>) {
    console.log(stats);
  },

  randomNumber(maxCount) {
    return Math.floor((Math.random() * maxCount));
  },
};

export default DocumentActions;
