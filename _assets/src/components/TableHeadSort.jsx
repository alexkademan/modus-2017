import React from 'react';

type Data = Array<Object>;
type Props = {
  item: Data,
  sortTable: Function,
  title: String,
};

class TableHeadSort extends React.Component {
  // state: State;
  sortOut = () => {
    this.props.sortTable(this.props.item.id);
  }
  props: Props;
  render() {
    return (
      <button
        onClick={this.sortOut}
        className="button"
      >
        {this.props.title}
      </button>
    );
  }
}

export default TableHeadSort;
