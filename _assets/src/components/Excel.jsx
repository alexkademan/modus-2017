import * as Immutable from 'immutable';
import React from 'react';
import classNames from 'classnames';
// import axios from 'axios';

import TableHeadSort from './TableHeadSort';
import Actions from './Actions';

import CRUDActions from '../flux/CRUDActions';
import CRUDStore from '../flux/CRUDStore';
// import Dialog from './Dialog';

type EditState = {
  row: number,
  key: string,
};
type DialogState = {
  idx: number,
  type: string,
};
type State = {
  data: Immutable.List<Object>,
  sortby: ?string,
  descending: boolean,
  edit: ?EditState,
  dialog: ?DialogState,
};

class Excel extends React.Component {
  constructor() {
    super();
    this.state = {
      data: CRUDStore.getData(),
      sortby: null, // schema.id
      descending: false,
      edit: null, // {row index, schema.id},
      dialog: null, // {type, idx}
    };
    this.schema = CRUDStore.getSchema();
    this.sortTable = this.sortTable.bind(this);
    this.actionClick = this.actionClick.bind(this);
    // this.getJSONdata();

    CRUDStore.addListener('change', () => {
      this.setState({
        data: CRUDStore.getData(),
      });
    });
  }
  state: State;

  schema: Array<Object>;

  gotClientInfo(response) {
    console.log(this);
    console.log(response);
  }
  actionClick(rowidx: number, action: string) {
    this.setState({ dialog: { type: action, idx: rowidx } });
  }

  sortTable(key: string) {
    // const data = this.state.data.slice();
    const descending = this.state.sortby === key && !this.state.descending;
    CRUDActions.sort(key, descending);
    this.setState({
      sortby: key,
      descending,
    });
  }

  _renderTable() {
    return (
      <table>
        <thead>
          <tr>{
            this.schema.map((item) => {
              if (!item.show) {
                return null;
              }
              let title = item.label;
              if (this.state.sortby === item.id) {
                title += this.state.descending ? ' \u2191' : ' \u2193';
              }
              return (
                <th
                  className={`schema-${item.id}`}
                  key={item.id}
                >
                  <TableHeadSort
                    item={item}
                    title={title}
                    sortTable={this.sortTable}
                  />
                </th>
              );
            }, this)
          }
            <th className="ExcelNotSortable">Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map((row, rowidx) => {
            return (
              <tr key={row.id}>{
                Object.keys(row).map((cell, idx) => {
                  const schema = this.schema[idx];
                  if (!schema || !schema.show) {
                    return null;
                  }
                  const isRating = schema.type === 'rating';
                  const content = row[cell];
                  return (
                    <td
                      className={classNames({
                        [`schema-${schema.id}`]: true,
                        ExcelEditable: !isRating,
                        ExcelDataLeft: schema.align === 'left',
                        ExcelDataRight: schema.align === 'right',
                        ExcelDataCenter: schema.align !== 'left' && schema.align !== 'right',
                      })}
                      key={schema.id}
                      data-row={rowidx}
                      data-key={schema.id}
                    >
                      {content}
                    </td>
                  );
                }, this)}
                <td className="ExcelDataCenter">
                  {/* <Actions onAction={this.actionClick(this, rowidx)} /> */}
                  <Actions rowidx={rowidx} onAction={this.actionClick} />
                </td>
              </tr>
            );
          }, this)}
        </tbody>
      </table>
    );
  }
  _renderDialog() {
    if (!this.state.dialog) {
      return null;
    }
    const type = this.state.dialog.type;
    switch (type) {
    case 'delete':
      return this._renderDeleteDialog();
    case 'info':
      return this._renderFormDialog(true);
    case 'edit':
      return this._renderFormDialog();
    default:
      throw Error(`Unexpected dialog type ${type}`);
    }
  }
  render() {
    return (
      <div className="Excel">
        {this._renderTable()}
        {this._renderDialog()}
      </div>
    );
  }
}

export default Excel;
