import React from 'react';
// import PropTypes from 'prop-types';
import DocumentStore from '../flux/documentStore';
import WorkPost from './WorkPost';

class WorkLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allImages: DocumentStore.getWorkVars(),
    };

    this.state.allImages.sort((a, b) => {
      return a.menu_order - b.menu_order;
    });
  }

  render() {
    let i = -1;
    return (
      <ul className="work-items">
        {this.state.allImages.map((entry) => {
          i += 1;
          return <WorkPost entry={entry} key={entry.ID} count={i} />;
        }, this)}
      </ul>
    );
  }
}

export default WorkLayout;
