
import React from 'react';
import PropTypes from 'prop-types';

import Rating from './Rating';
import Suggest from './Suggest';

type FormInputFieldType = 'year' | 'suggest' | 'rating' | 'text' | 'input';

export type FormInputFieldValue = string | number;

export type FormInputField = {
  type: FormInputFieldType,
  defaultValue?: FormInputFieldValue,
  id?: string,
  options?: Array<string>,
  label?: string,
};

class FormInput extends React.Component {

  static defaultProps = {
    type: 'input',
  };

  getValue() {
    return 'value' in this.refs.input
      ? this.refs.input.value
      : this.refs.input.getValue();
  }

  props: FormInputField;

  render() {
    const common = { // properties applicable to all
      id: this.props.id,
      ref: 'input',
      defaultValue: this.props.defaultValue,
    };
    switch (this.props.type) {
    case 'year':
      return (
        <input
          {...common}
          type="number"
          defaultValue={this.props.defaultValue || new Date().getFullYear()}
        />
      );
    case 'suggest':
      return <Suggest {...common} options={this.props.options} />;
    case 'rating':
      return (
        <Rating
          {...common}
          defaultValue={parseInt(this.props.defaultValue, 10)}
        />
      );
    case 'text':
      return <textarea {...common} />;
    default:
      return <input {...common} type="text" />;
    }
  }
}

FormInput.defaultProps = {
  type: 'input',
};

// FormInput.propTypes = {
//   type: PropTypes.oneOf(['year', 'suggest', 'rating', 'text', 'input']).isRequired,
//   id: PropTypes.string.isRequired,
//   // options: PropTypes.array.isRequired, // as un auto-complete <options>
//   defaultValue: PropTypes.any.isRequired,
// };

export default FormInput;
