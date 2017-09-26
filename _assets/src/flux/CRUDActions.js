import CRUDStore from './CRUDStore';

const CRUDActions = {
  create(newRecord: Object) {
    console.log('create new record');
    console.log(newRecord);
    // const data = CRUDStore.getData();
    // data.unshift(newRecord);
    // CRUDStore.setData(data);
  },

  delete(recordId: number) {
    const data = CRUDStore.getData();
    data.splice(recordId, 1);
    CRUDStore.setData(data);
  },

  sortCallback(a: (string|number), b: (string|number), descending: boolean): number {
    let res: number = 0;
    if (typeof a === 'number' && typeof b === 'number') {
      res = a - b;
    } else {
      res = String(a).localeCompare(String(b));
    }
    return descending ? -1 * res : res;
  },

  sort(key: string, descending: boolean) {
    CRUDStore.setData(CRUDStore.getData().sort(
      (a, b) => this.sortCallback(a[key], b[key], descending),
    ));
  },
};

export default CRUDActions;
