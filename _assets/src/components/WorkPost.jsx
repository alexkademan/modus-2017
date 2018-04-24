import React from 'react';
import PropTypes from 'prop-types';
import DocumentStore from '../flux/documentStore';

import CartIcon from '../icons/cart.svg';
import HandsIcon from '../icons/hands.svg';
import HeartIcon from '../icons/heart.svg';
import NetworkIcon from '../icons/network.svg';
import SphereIcon from '../icons/sphere.svg';
import ThumbIcon from '../icons/thumbprint.svg';

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

  renderSVG() {
    console.log(this.state.entry.svg_icon);
    switch (this.state.entry.svg_icon) {
    case 'cart.svg':
      return <CartIcon className="icon" />;
    case 'hands.svg':
      return <HandsIcon className="icon" />;
    case 'heart.svg':
      return <HeartIcon className="icon" />;
    case 'network.svg':
      return <NetworkIcon className="icon" />;
    case 'sphere.svg':
      return <SphereIcon className="icon" />;
    case 'thumbprint.svg':
      return <ThumbIcon className="icon" />;
    default:
      return false;
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
            {this.renderSVG()}
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
