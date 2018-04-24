import React from 'react';
import PropTypes from 'prop-types';
// import DocumentStore from '../flux/documentStore';
import HomeIcon from './HomeIcon';

class HomeIcons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: props.info,
    };
  }

  render() {
    return (
      <ul className="icons">
        {this.state.categories.work.map((category) => {
          return (
            <HomeIcon category={category} key={category.ID} />
          );
        }, this)}
      </ul>
    );
  }
}

HomeIcons.propTypes = {
  info: PropTypes.shape({}),
};

HomeIcons.defaultProps = {
  info: '',
};

export default HomeIcons;
