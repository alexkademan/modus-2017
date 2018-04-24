import React from 'react';
import PropTypes from 'prop-types';

import CartIcon from '../icons/cart.svg';
import HandsIcon from '../icons/hands.svg';
import HeartIcon from '../icons/heart.svg';
import NetworkIcon from '../icons/network.svg';
import SphereIcon from '../icons/sphere.svg';
import ThumbIcon from '../icons/thumbprint.svg';

class WorkCategoryIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: props.icon,
    };
  }

  render() {
    switch (this.state.icon) {
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
}

WorkCategoryIcon.propTypes = {
  icon: PropTypes.string,
};

WorkCategoryIcon.defaultProps = {
  icon: '',
};

export default WorkCategoryIcon;
