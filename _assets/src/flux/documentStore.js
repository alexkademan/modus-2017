
import { EventEmitter } from 'fbemitter';

let windowStats;
// let theStats;
const emitter = new EventEmitter();

const DocumentStore = {

  init(stats: Array<Object>) {
    windowStats = stats;
  },

  getWindowSize(): Array<Object> {
    return windowStats;
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
