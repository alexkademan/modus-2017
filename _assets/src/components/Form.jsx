
import React from 'react';
import PropTypes from 'prop-types';

import FormInput from './FormInput';
import Rating from './Rating';

import type { FormInputField, FormInputFieldValue } from './FormInput';

class Form extends React.Component {
  getData(): Object {
    const data: Object = {};
    this.props.fields.forEach((field: FormInputField) =>
      data[field.id] = this.refs[field.id].getValue()
    );
    return data;
  }
  render() {
    return (
      <form className="Form">{this.props.fields.map((field: FormInputField) => {
        const prefilled: FormInputFieldValue = (this.props.initialData &&
          this.props.initialData[field.id]) || '';
        if (!this.props.readonly) {
          return (
            <div className="FormRow" key={field.id}>
              <label className="FormLabel" htmlFor={field.id}>
                {field.label}:
                <FormInput {...field} ref={field.id} defaultValue={prefilled} />
              </label>
            </div>
          );
        }
        if (!prefilled) {
          return null;
        }
        return (
          <div className="FormRow" key={field.id}>
            <span className="FormLabel">{field.label}:</span>
            {
              field.type === 'rating'
                ? <Rating readonly defaultValue={parseInt(prefilled, 10)} />
                : <div>{prefilled}</div>
            }
          </div>
        );
      }, this)}</form>
    );
  }
}

Form.defaultProps = {
  readonly: false,
};

Form.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    initialData: PropTypes.array,
  })).isRequired,
  initialData: PropTypes.object,
  readonly: PropTypes.bool,
};

export default Form;
