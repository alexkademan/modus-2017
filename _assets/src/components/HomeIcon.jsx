import React from 'react';
import PropTypes from 'prop-types';
import DocumentStore from '../flux/documentStore';

import WorkCategoryIcon from './WorkCategoryIcon';

class HomeIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      permalink: props.category.permalink,
      title: props.category.post_title,
      svg_icon: props.category.svg_icon,
      link: props.link,
      listCount: props.listCount,
      visible: false,
    };
  }

  componentDidMount() {
    this.state.introStatus = DocumentStore.addListener('homeIcons', () => {
      this.checkVisibility();
    });
    this.checkVisibility();
  }

  checkVisibility() {
    if (!this.state.visible) {
      // this.setState({ animateCount: DocumentStore.getHomeIconCount() });
      // console.log(`${DocumentStore.getHomeIconCount()} - ${this.state.listCount}`);

      const currentCount = DocumentStore.getHomeIconCount();
      if (currentCount === this.state.listCount) {
        // console.log(this.state.title);
        this.setState({ visible: true });
      }
    }
  }

  renderGuts() {
    if (this.state.link) {
      return (
        <a href={this.state.link}>
          {this.renderGuts2()}
        </a>
      );
    }
    return this.renderGuts2();
  }

  renderGuts2() {
    return (
      <span>
        <WorkCategoryIcon icon={this.state.svg_icon} />
        {this.state.title}
        {this.state.visible ? 'VISIBLE' : ''}
      </span>
    );
  }

  render() {
    return (
      <li className={this.state.visible ? 'icon' : 'icon transparent'}>
        {this.renderGuts()}
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
  link: PropTypes.string,
  listCount: PropTypes.number,
};

HomeIcon.defaultProps = {
  category: '',
  link: false,
  listCount: '',
};

export default HomeIcon;
