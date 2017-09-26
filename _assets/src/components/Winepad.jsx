import React, { Component } from 'react';
import Excel from './Excel';
import CRUDStore from '../flux/CRUDStore';
import Button from './Button';
import Dialog from './Dialog';

// type Data = Array<Object>;

type State = {
  addnew: boolean,
  count: number,
};

class Whinepad extends Component {

  constructor() {
    super();
    this.state = {
      addnew: false,
      count: CRUDStore.getCount(),
    };

    CRUDStore.addListener('change', () => {
      this.setState({
        count: CRUDStore.getCount(),
      });
    });
    this.addNewDialog = this.addNewDialog.bind(this);
    this.addNew = this.addNew.bind(this);
  }

  state: State;

  shouldComponentUpdate(newProps: Object, newState: State): boolean {
    return newState.addnew !== this.state.addnew || newState.count !== this.state.count;
  }

  addNewDialog() {
    this.setState({ addnew: true });
  }

  addNew(action: string) {
    if (action === 'confirm') {
      console.log('confirm...');
    } else if (action === 'dismiss') {
      this.setState({ addnew: false });
    } else {
      const data = Array.from(this.state.data);
      data.unshift(this.form.getData());
      this.setState({
        addnew: false,
        data,
      });
      this._commitToStorage(data);
    }
  }

  render() {
    return (
      <div className="Whinepad">
        <div className="WhinepadToolbar">
          <div className="WhinepadToolbarAdd">
            <Button
              onClick={this.addNewDialog}
              className="WhinepadToolbarAddButton"
            >
              + add
            </Button>
          </div>
          <div className="WhinepadToolbarSearch">
            {/* <input
              placeholder="Search..."
              onChange={this._search.bind(this)}
              onFocus={this._startSearching.bind(this)}
              onBlur={this._doneSearching.bind(this)} /> */}
          </div>
        </div>
        <div className="WhinepadDatagrid">
          <Excel />
        </div>
        {this.state.addnew
          ? <Dialog
            modal
            header="Add new item"
            confirmLabel="Add"
            onAction={this.addNew}
          >
            {/* <Form
              ref="form"
              fields={this.schema}
            /> */}
          </Dialog>
          : null}
      </div>
    );
  }
}

export default Whinepad;
