import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import querystring from 'querystring';
import DocumentStore from '../flux/documentStore';

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
      phpVars: DocumentStore.getPHPvars('pageInfo'),
      messageStatus: 'standby',
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick);
    console.log(this.state.phpVars);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  }

  handleClick(e) {
    if (this.submit.contains(e.target)) {
      // clicked on the send button:
      e.preventDefault();

      if (this.state.messageStatus === 'standby') {
        this.submitForm();
      }
    }
  }

  validateFields() {
    let first = false;
    let email = false;
    let message = false;
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.first.value === '') {
      first = ' required';
    }
    if (this.email.value === '') {
      email = ' required';
    } else if (!emailRegEx.test(this.email.value)) {
      email = ' required';
    }
    if (this.message.value === '') {
      message = ' required';
    }

    if (first === false && email === false && message === false) {
      this.setState({ formReady: true });
    } else if (this.state.formReady) {
      this.setState({ formReady: false });
    }

    this.setState({
      error: ({ first, email, message }),
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
    }
  }

  sendMessage() {
    this.setState({ messageStatus: 'submitting' });
    axios.post(
      `${this.state.phpVars.templateURL}/bin/mailer/modus_contact.php`,
      querystring.stringify(this.state.input),
      ({ json: true }),
    )
      .then((response) => {
        console.log(response.data);
        if (response.data === 'success') {
          this.setState({ messageStatus: 'sent' });
          DocumentStore.toggleModal('mail-sent');
        } else {
          this.setState({ messageStatus: 'standby' });
        }
      })
      .catch((error) => {
        console.log('error');
        console.log(error.response);
      });
  }

  updateInputValue() {
    if (this.state.messageStatus === 'sent') {
      this.setState({ messageStatus: 'standby' });
    }

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
    let inputValue = 'Send';
    let className = 'send';

    if (this.state.messageStatus === 'submitting') {
      inputValue = 'Sending';
    } else if (this.state.messageStatus === 'sent') {
      inputValue = 'Thank you!';
    }

    if (
      this.state.formReady &&
      this.state.messageStatus === 'standby'
    ) {
      className = 'send-ready';
    }
    if (this.state.messageStatus === 'sent') {
      className = 'sent';
    }

    return (
      <input
        ref={(submit) => { this.submit = submit; }}
        type="submit"
        value={inputValue}
        className={className}
      />
    );
  }

  render() {
    // const sendURL = `${this.state.phpVars.templateURL}/bin/gmail2.php`;

    return (
      <div className="form-column">
        <form
          className="contact-form"
          method="POST"
        >
          <span className="first">
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
          </span>
          <span className="last">
            <label htmlFor="form-last">
              Last
            </label>
            <input
              id="form-last"
              type="text"
              name="Last-Name"
              ref={(last) => { this.last = last; }}
              onChange={() => this.updateInputValue()}
              onBlur={() => this.updateInputValue()}
            />
          </span>

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
      </div>
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
