import React from 'react';
import PropTypes from 'prop-types';
// import DocumentStore from '../flux/documentStore';

import WorkCategoryIcon from './WorkCategoryIcon';

class HomeIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      permalink: props.category.permalink,
      title: props.category.post_title,
      svg_icon: props.category.svg_icon,
    };
  }

  render() {
    return (
      <li>
        <a href={this.state.permalink}>
          <WorkCategoryIcon icon={this.state.svg_icon} />
          {this.state.title}
        </a>
      </li>
    );
  }
}

HomeIcon.propTypes = {
  category: PropTypes.shape({
    permalink: PropTypes.string,
    post_title: PropTypes.string,
    svg_icon: PropTypes.string,
  }),
};

HomeIcon.defaultProps = {
  category: '',
};

export default HomeIcon;
