import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Rating extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rating: props.defaultValue,
      tmpRating: props.defaultValue,
    };
  }

  componentWillReceiveProps(nextProps) { // react to outside changes
    this.setRating(nextProps.defaultValue);
  }

  setTemp(rating) { // on mouse over
    this.setState({ tmpRating: rating });
  }

  getValue() {
    return this.state.rating;
  }

  setRating(rating) {
    this.setState({
      tmpRating: rating,
      rating,
    });
  }

  reset() { // on mouse out go back to real rating
    this.setTemp(this.state.rating);
  }

  render() {
    const stars = [];
    for (let i: number = 1; i <= this.props.max; i += 1) {
      stars.push(
        <span
          className={i <= this.state.tmpRating ? 'RatingOn' : null}
          key={i}
          onClick={!this.props.readonly && this.setRating.bind(this, i)}
          onMouseOver={!this.props.readonly && this.setTemp.bind(this, i)}
          aria-selected={i <= this.state.tmpRating ? 'true' : 'false'}
        >
          &#9734;
        </span>);
    }
    return (
      <div
        className={classNames({
          Rating: true,
          RatingReadonly: this.readonly,
        })}
        onMouseOut={this.reset.bind(this)}
      >
        {stars}
        {this.props.readonly || !this.id
          ? null
          : <input
            type="hidden"
            id={this.id}
            value={this.state.rating}
          />
      }
      </div>
    );
  }
}

Rating.defaultProps = {
  readonly: PropTypes.bool,
};

Rating.propTypes = {
  defaultValue: PropTypes.number,
  readonly: PropTypes.bool,
  max: PropTypes.number,
};

Rating.defaultProps = {
  defaultValue: 0,
  max: 5,
};

export default Rating;
