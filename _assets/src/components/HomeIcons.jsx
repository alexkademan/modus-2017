import React from 'react';
import PropTypes from 'prop-types';
import DocumentStore from '../flux/documentStore';
import HomeIcon from './HomeIcon';

class HomeIcons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: props.info,
      pageInfo: DocumentStore.getPHPvars('pageInfo'),
      pageHeight: 0,
      listHeight: 0,
      init: false,
      animation: 0,
    };
    this.state.categories.work.sort((a, b) => {
      return a.menu_order - b.menu_order;
    });
  }

  componentDidMount() {
    this.state.emitterPageSize = DocumentStore.addListener('change', () => {
      this.checkDimensions();
    });
    this.checkDimensions();
  }

  componentWillUnmount() {
    this.state.emitterPageSize.remove();
  }

  checkDimensions() {
    const windowSize = DocumentStore.getWindowSize();
    const pageHeight = windowSize.height;
    const listHeight = this.node.offsetHeight;

    if (
      this.state.pageHeight !== pageHeight ||
      this.state.listHeight !== listHeight
    ) {
      this.setState({
        pageHeight,
        listHeight,
      });
    }


    if (this.state.init === false) {
      if (this.node.getBoundingClientRect().top < (pageHeight * 0.5)) {
        this.setState({ init: true });
        setTimeout(() => {
          this.runAnimation(0);
        }, 500);
      }
    }
  }

  runAnimation(theCount) {
    const fullCount = (this.state.categories.work.length - 1);
    DocumentStore.setHomeIconCount(theCount);

    if (fullCount > theCount) {
      setTimeout(() => {
        this.runAnimation(theCount + 1);
      }, 90);
    }
  }

  isLink() {
    if (this.state.pageInfo.site_url) {
      return this.state.pageInfo.site_url + /work/;
    }
    return false;
  }

  topMargin() {
    if (this.state.listHeight < this.state.pageHeight) {
      const topPx = (this.state.pageHeight - this.state.listHeight) * 0.5;
      return {
        paddingTop: `${topPx}px`,
      };
    }
    return {};
  }

  render() {
    const link = this.isLink();
    const topMargin = this.topMargin();
    let i = -1;

    return (
      <ul
        className="icons"
        ref={(node) => { this.node = node; }}
        style={topMargin}
      >
        {this.state.categories.work.map((category) => {
          i += 1;
          return (
            <HomeIcon
              key={category.ID}
              category={category}
              link={link}
              listCount={i}
            />
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
