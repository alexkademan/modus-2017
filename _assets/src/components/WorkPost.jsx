import React from 'react';
import PropTypes from 'prop-types';
import DocumentStore from '../flux/documentStore';
import WorkCategoryIcon from './WorkCategoryIcon';

class WorkPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      entry: props.entry,
      count: props.count,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  }

  handleClick(e) {
    if (this.node.contains(e.target)) {
      e.preventDefault();
      // console.log(this.state.count);
      DocumentStore.setWorkModal(this.state.count);
      DocumentStore.toggleModal('work-modal');
    }
  }

  render() {
    return (
      <li className="work-post">
        <a
          href={this.state.entry.permalink}
          className="openModal"
          ref={(node) => { this.node = node; }}
        >
          <span className="image-with-icon">
            <img
              src={this.state.entry.sample_image}
              alt={this.state.entry.post_title}
            />
            <span className="color" />
            <WorkCategoryIcon icon={this.state.entry.svg_icon} />
          </span>
          <h4>
            {this.state.entry.post_title}
          </h4>
        </a>
      </li>
    );
  }
}

WorkPost.propTypes = {
  entry: PropTypes.shape({}),
  count: PropTypes.number,
};

WorkPost.defaultProps = {
  entry: '',
  count: 0,
};

export default WorkPost;
