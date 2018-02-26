import React from 'react';
import PropTypes from 'prop-types';
import DocumentStore from '../flux/documentStore';

class WorkSlide extends React.Component {
  constructor(props) {
    super(props);
    this.handleClicker = this.handleClicker.bind(this);
    this.state = {
      thisImageCount: props.thisImageCount,
      selectedThumb: 0,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClicker);
    this.state.slideEmitter = DocumentStore.addListener('workSlide', () => {
      this.changeSelectedSlide();
    });
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClicker);
    this.state.slideEmitter.remove();
  }

  changeSelectedSlide() {
    this.setState({
      selectedThumb: DocumentStore.getWorkSlide(),
    });
  }

  handleClicker(e) {
    if (this.node.contains(e.target)) {
      DocumentStore.setWorkSlide(this.state.thisImageCount);
    }
  }

  render() {
    let buttonClass = 'thumb';
    if (this.state.thisImageCount === this.state.selectedThumb) {
      buttonClass = 'thumb selected';
    }
    return (
      <button
        className={buttonClass}
        ref={(node) => { this.node = node; }}
      >
        slide
      </button>
    );
  }
}

WorkSlide.propTypes = {
  thisImageCount: PropTypes.number,
};

WorkSlide.defaultProps = {
  thisImageCount: 0,
};

export default WorkSlide;
