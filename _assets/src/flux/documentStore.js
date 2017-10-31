
import { EventEmitter } from 'fbemitter';

let windowStats;
let toggleModal = false; // show or hide modal
let modalInfo = false; // name of modal in question.
const emitter = new EventEmitter();

const DocumentStore = {

  init(stats: Array<Object>) {
    windowStats = stats;
  },

  getWindowSize(): Array<Object> {
    return windowStats;
  },

  toggleModal(modalName = false) {
    if (toggleModal) {
      toggleModal = false;
    } else {
      toggleModal = true;
      modalInfo = modalName;
    }
    emitter.emit('toggleModal');
  },

  getModalState() {
    return toggleModal;
  },

  getModalInfo() {
    return modalInfo;
  },

  setModalInfo(newModal) {
    modalInfo = newModal;
    return newModal;
  },

  setDocInfo(newInfo) {
    windowStats = newInfo;
    emitter.emit('change');
  },

  addListener(eventType: string, fn: Function) {
    emitter.addListener(eventType, fn);
  },
};

export default DocumentStore;
