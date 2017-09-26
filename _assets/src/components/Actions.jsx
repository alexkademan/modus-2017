
import React from 'react';
// import PropTypes from 'prop-types';

type Props = {
  rowidx: String,
  onAction: Function,
}

// const Actions = props => (
class Actions extends React.Component {

  onActionClickInfo = () => { this.onActionClick('info'); }
  onActionClickEdit = () => { this.onActionClick('edit'); }
  onActionClickDelete = () => { this.onActionClick('delete'); }

  onActionClick(type) {
    console.log(type);
    this.props.onAction(type, this.props.rowidx);
  }

  props: Props;

  render() {
    return (
      <div className="Actions">
        <button
          tabIndex="0"
          className="ActionsInfo"
          title="More info"
          onClick={this.onActionClickInfo} // info
        >
          &#8505;
        </button>
        <button
          tabIndex="0"
          className="ActionsEdit"
          title="Edit"
          onClick={this.onActionClickEdit} // edit
        >
          &#10000;
        </button>
        <button
          tabIndex="0"
          className="ActionsDelete"
          title="Delete"
          onClick={this.onActionClickDelete} // delete
        >
          x
        </button>
      </div>
    );
  }
}

// Actions.onAction = () {
//   console.log('ActionOnAction');
// }
//
// Actions.propTypes = {
//   onAction: PropTypes.func,
// };
//
// Actions.defaultProps = {
//   onAction: () => {},
// };

export default Actions;
