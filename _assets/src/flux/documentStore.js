import { EventEmitter } from 'fbemitter';

import DocumentActions from './documentActions';

let windowStats;
let toggleModal = false; // show or hide modal
let pageScrollPosition = 0;
let modalScrollPosition = 0;
let modalTitle = false; // name of modal parent.
let modalFadeState = 0;
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
    if (modalName === 'dog-modal') { randomDog = this.randomizedDog(); }
    if (modalFadeState !== 1 && modalFadeState !== 3) {
      if (toggleModal) {
        // turn OFF
        toggleModal = false;
        this.setModalFadeState(3);
      } else {
        // turn ON
        toggleModal = true;
        modalTitle = modalName;
        this.setModalFadeState(1);
      }
      emitter.emit('toggleModal');
    }
  },

  toggleModalListen() {
    const token = emitter.emit('toggleModal');
    return token;
  },

  getModalState() {
    return toggleModal;
  },

  setModalFadeState(value) {
    modalFadeState = value;
    if (value === 0) {
      modalTitle = false;
    }
    emitter.emit('modalFadeState');
  },

  getModalFadeState() {
    return modalFadeState;
  },

  getModalTitle() {
    return modalTitle;
  },

  randomizedDog() {
    reactDogs = window.reactData.dogs;
    if (reactDogs && !toggleModal) {
      return DocumentActions.randomNumber(reactDogs.length);
    }
    return false;
  },

  getDogsArray() {
    return reactDogs;
  },

  getRandomDog() {
    // returns number value to use within array.
    return randomDog;
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

    if (toggleModal) {
      modalScrollPosition = newWindowInfo.scrollY;
    } else {
      pageScrollPosition = newWindowInfo.scrollY;
    }

    newWindowInfo.scrollModal = modalScrollPosition;
    newWindowInfo.scrollPage = pageScrollPosition;

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

  setPageScrollPosition(position) {
    if (position === undefined) {
      pageScrollPosition = 0;
    }
    pageScrollPosition = position;
  },

  getPageScrollPosition() {
    return pageScrollPosition;
  },

  setModalScrollPosition(position) { modalScrollPosition = position; },
  getModalScrollPosition() { return modalScrollPosition; },

  addListener(eventType: string, fn: Function) {
    return emitter.addListener(eventType, fn);
  },
};

export default DocumentStore;
