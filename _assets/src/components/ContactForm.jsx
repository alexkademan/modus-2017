import React from 'react';
import PropTypes from 'prop-types';
// import DocumentStore from '../flux/documentStore';
import axios from 'axios';
import querystring from 'querystring';

class ContactForm extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.validateFields = this.validateFields.bind(this);

    this.state = {
      input: ({
        first: '', last: '', email: '', message: '',
      }),
      error: ({
        first: false, last: false, email: false, message: false,
      }),
      submitted: false, // submit button has been clicked
      formReady: false, // form has passed validation
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  }

  handleClick(e) {
    if (this.submit.contains(e.target)) {
      // clicked on the send button:
      e.preventDefault();
      // this.validateFields();
      this.submitForm();
    }
  }

  validateFields() {
    let first = false;
    let email = false;
    let message = false;
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.first.value === '') {
      first = ' please enter your first name';
    }
    if (this.email.value === '') {
      email = ' please enter your email address';
    } else if (!emailRegEx.test(this.email.value)) {
      email = ' please enter a valid email address';
    }
    if (this.message.value === '') {
      message = ' please write us a message';
    }

    if (first === false && email === false && message === false) {
      this.setState({ formReady: true });
    } else if (this.state.formReady) {
      this.setState({ formReady: false });
    }

    this.setState({
      error: ({
        first,
        email,
        message,
      }),
    });
  }

  submitForm() {
    this.validateFields();
    this.setState({ submitted: true });
    if (
      this.state.error.first === false &&
      this.state.error.email === false &&
      this.state.error.message === false
    ) {
      this.sendMessage();
    } else {
      console.log('fix your message.');
    }
  }

  sendMessage() {
    axios.post(
      'https://formspree.io/alex@designbymodus.com',
      querystring.stringify(this.state.input),
      // ({ json: true }),
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log('error');
        console.log(error.response);
      });
  }

  updateInputValue() {
    this.setState({
      input: ({
        first: this.first.value,
        last: this.last.value,
        email: this.email.value,
        message: this.message.value,
      }),
    });
    this.validateFields();
  }

  renderButton() {
    if (this.state.formReady) {
      return (
        <input
          ref={(submit) => { this.submit = submit; }}
          type="submit"
          value="Send"
        />
      );
    }
    return (
      <div ref={(submit) => { this.submit = submit; }}>derp</div>
    );
  }

  render() {
    // console.log(this.state.error.last);
    // console.log(this.state.submitted);
    return (
      <form
        className="contact-form"
        action="https://formspree.io/alex@designbymodus.com"
        method="POST"
      >
        <label htmlFor="form-first">
          First
          <strong>
            {
              this.state.error.first && this.state.submitted ?
              this.state.error.first : ''
            }
          </strong>
        </label>
        <input
          id="form-first"
          type="text"
          name="First-Name"
          ref={(first) => { this.first = first; }}
          onChange={() => this.updateInputValue()}
          onBlur={() => this.updateInputValue()}
        />

        <label htmlFor="form-last">
          Last
        </label>
        <input
          id="form-last"
          className="last"
          type="text"
          name="Last-Name"
          ref={(last) => { this.last = last; }}
          onChange={() => this.updateInputValue()}
          onBlur={() => this.updateInputValue()}
        />

        <label htmlFor="form-email">
          Email
          <strong>
            {
              this.state.error.email && this.state.submitted ?
              this.state.error.email : ''
            }
          </strong>
        </label>
        <input
          id="form-email"
          type="email"
          name="Email"
          ref={(email) => { this.email = email; }}
          onChange={() => this.updateInputValue()}
          onBlur={() => this.updateInputValue()}
        />

        <label htmlFor="form-message">
          Message
          <strong>
            {
              this.state.error.message && this.state.submitted ?
              this.state.error.message : ''
            }
          </strong>
        </label>
        <textarea
          id="form-message"
          cols="40"
          rows="10"
          name="Message"
          aria-invalid="false"
          ref={(message) => { this.message = message; }}
          onChange={() => this.updateInputValue()}
          onBlur={() => this.updateInputValue()}
        />
        {this.renderButton()}
      </form>
    );
  }
}

ContactForm.propTypes = {
  input: PropTypes.shape({
    first: PropTypes.string,
    last: PropTypes.string,
    email: PropTypes.string,
    message: PropTypes.string,
  }),
  error: PropTypes.shape({
    first: PropTypes.string,
    last: PropTypes.string,
    email: PropTypes.string,
    message: PropTypes.string,
  }),
};

ContactForm.defaultProps = {
  input: ({}),
  error: ({}),
};

export default ContactForm;
