import React from 'react';
import PropTypes from 'prop-types';
import DocumentStore from '../flux/documentStore';
import HomeBlurb from './HomeBlurb';

class HomeBlurbs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copy: props.info,
    };
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
    const position = this.node.getBoundingClientRect();
    if (
      position.top <= (window.innerHeight / 2) &&
      !this.state.showing
    ) {
      DocumentStore.setHomeDotsIntro(0);
    }
  }

  render() {
    const blurbs = this.state.copy.blurbs;
    return (
      <article
        ref={(node) => { this.node = node; }}
        className="centered-section"
      >
        <header className="entry-header">
          <h1>
            {this.state.copy.title}
          </h1>
        </header>
        <div className="entry-content">
          <ul className="blurbs">
            {blurbs.map((blurb) => {
              return (
                <span key={blurb.key}>
                  <HomeBlurb blurb={blurb} />
                </span>
              );
            }, this)}
          </ul>
        </div>
      </article>
    );
  }
}

HomeBlurbs.propTypes = {
  info: PropTypes.shape({}),
};

HomeBlurbs.defaultProps = {
  info: '',
};

export default HomeBlurbs;
