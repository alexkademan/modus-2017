import { EventEmitter } from 'fbemitter';

import DocumentActions from './documentActions';

let windowStats;
let toggleModal = false; // show or hide modal
let modalFader = false;
let modalInfo = false; // name of modal in question.
let modalParentName = false; // name of modal parent.
let pagesArray = false; // array for page navigation.
let pageStatus = false;
let randomDog = 0;
let reactDogs;
const emitter = new EventEmitter();

const DocumentStore = {

  init(stats: Array<Object>) {
    windowStats = stats;
  },

  getWindowSize(): Array<Object> {
    return windowStats;
  },

  toggleModal(modalName = 'default') {
    reactDogs = window.reactData.dogs;
    if (reactDogs && !toggleModal && modalName === 'dog-modal') {
      randomDog = DocumentActions.randomNumber(reactDogs.length);
    }
    if (toggleModal) {
      toggleModal = false;
      modalInfo = false;
      modalFader = true;
    } else {
      toggleModal = true;
      modalInfo = modalName;
      modalParentName = modalName;
    }
    emitter.emit('toggleModal');
  },

  getDogsArray() {
    return reactDogs;
  },

  getRandomDog() {
    // returns number value to use within array.
    return randomDog;
  },

  getModalFader() {
    // copy current value for return:
    const returnVal = modalFader;

    // set to false for next query after a few miliseconds:
    // because the window continues changing.
    if (modalFader) {
      setTimeout(() => {
        modalFader = false;
      }, 100);
    }
    return returnVal;
  },

  getModalFaderStatus() {
    // some other component needs to know if modal is closing:
    return modalFader;
  },

  getModalState() {
    return toggleModal;
  },

  getModalInfo() {
    return modalInfo;
  },

  getmodalParentName() {
    return modalParentName;
  },

  setModalInfo(newModal) {
    modalInfo = newModal;
  },

  setDocInfo(newInfo) {
    windowStats = newInfo;
    emitter.emit('change');
  },

  configureDocInfo(layoutWidth, layoutHeight) {
    let scrollDir = 'none';

    if (windowStats.scrollY < window.scrollY) {
      scrollDir = 'down';
    } else if (windowStats.scrollY > window.scrollY) {
      scrollDir = 'up';
    } else {
      scrollDir = 'none';
    }

    const newWindowInfo = {
      width: window.innerWidth,
      height: window.innerHeight,
      scrollX: window.scrollX,
      scrollY: window.scrollY,
      scrollDirection: scrollDir,
      layoutHeight,
      layoutWidth,
    };

    windowStats = newWindowInfo;
    emitter.emit('change');
  },

  getDocInfo(): Array<Object> {
    return windowStats;
  },

  getPageNavigation(): Array<Object> {
    return pagesArray;
  },

  setPageNavigation(newPagesArray) {
    pagesArray = newPagesArray;
    emitter.emit('nav-change');
  },

  setPageScrollStatus(newStatus) {
    pageStatus = newStatus;
    emitter.emit('pageStatChange');
  },

  getPageScrollStatus() {
    return pageStatus;
  },

  addListener(eventType: string, fn: Function) {
    emitter.addListener(eventType, fn);
  },
};

export default DocumentStore;
