import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Message } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';

class LoginForm extends Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    loading: false,
    errors: {}
  };

  // universal onChange for all text fields
  // so you don't need to keep making onChangeEmail, onChange Password, etc.
  onChange = (e) => this.setState({
    data: { ...this.state.data, [e.target.name]: e.target.value }
  });

  onSubmit = () => {
    // errors object will have text if validation catches errors
    const errors = this.validate(this.state.data);
    this.setState({ errors });

    // if there are no errors
    // returns promise from LoginPage and catch any server response errors
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err => this.setState({
          errors: err.response.data.errors,
          loading: false // loading boolean shows loading icon when true
        }));
    }
  }

  validate = (data) => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = 'Invalid email';
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  }

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        { errors.global && <Message negative>
          <Message.Header>Something went wrong</Message.Header>
          <p>{errors.global}</p>
        </Message> }
        <Form.Field error={!!errors.email}>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='example@example.com'
            value={data.email}
            onChange={this.onChange}
          />
            {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Make it secure'
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Button primary>Login</Button>
      </Form>
    );
  }
}
// this means that the parent of this component (LoginPage) MUST pass
// a function to the child called 'submit'
LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm;
